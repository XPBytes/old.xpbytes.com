/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sluggify = require('@sindresorhus/slugify')

const slugOptions = {
  customReplacements: [
    ['#', 'sharp'],
    ['.', 'dot'],
    ['+', 'plus']
  ]
}

function ensureIndexer(key, group, initial = []) {
  group[key] = group[key] || initial
  return group[key]
}

exports.onCreatePage = ({ page, actions }) => {
  const { deletePage, createPage } = actions

  return new Promise(resolve => {
    if (/pages\/index\/index.tsx?$/.test(page.componentPath)) {
      deletePage(page)

      // create a new page but with '/' as path
      createPage({
        ...page,
        path: '/',
      })
    }

    resolve()
  })
}


async function fetchMarkdownPages({ createPage, graphql }, { indices, path, template }) {
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { path: { regex: "^\/${path}\/" } } }
        sort: { order: DESC, fields: [frontmatter___published_date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path

              title
              description

              languages
              author
              keywords
              modifiedIsoDate: modified_date(formatString: "YYYY-MM-DD")
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    return result.errors
  }

  result.data.allMarkdownRemark.edges.forEach(({ node: { frontmatter: { path: nodePath, ...nodeIndices }} }) => {
    const index = {
      path: nodePath,
      type: path,
      ...nodeIndices
    }

    createPage({
      path: nodePath,
      component: template,
      context: { }, // additional data can be passed via context
    })

    ensureIndexer(index.author, indices.authors).push(index)

    index.keywords.forEach((keyword) => {
      ensureIndexer(keyword, indices.keywords).push(index)
      ensureIndexer(keyword, indices.counts.keywords, 0)
      indices.counts.keywords[keyword] += 1
    })
    index.languages.forEach((language) => {
      ensureIndexer(language, indices.languages).push(index)
      ensureIndexer(language, indices.counts.languages, 0)
      indices.counts.languages[language] += 1
    })
  })
}

async function fetchIndexPages({ createPage }, { source, path, template, counts }) {
  const resolvedSource = await source
  const resolvedCounts = await counts
  const keys = Object.keys(resolvedSource)

  keys.forEach((key) => {
    const index = resolvedSource[key].reduce((result, { type, ...singleSource }) => {
      ensureIndexer(type, result).push(singleSource)
      return result
    }, {})

    createPage({
      path: path.replace('{key}', sluggify(key, slugOptions)),
      component: template,
      context: { index, key, keys, counts: resolvedCounts }, // additional data can be passed via context
    })
  })
}


exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const caseStudyTemplate = path.resolve(`src/templates/case-study.tsx`)
  const articleTemplate = path.resolve(`src/templates/article.tsx`)

  const authorTemplate = path.resolve(`src/templates/author.tsx`)
  const keywordTemplate = path.resolve(`src/templates/keyword.tsx`)
  const languageTemplate = path.resolve(`src/templates/language.tsx`)

  const indices = {
    authors: {},
    languages: {},
    keywords: {},

    counts: {
      keywords: {},
      languages: {}
    }
  }

  const caseStudies = fetchMarkdownPages(
    { createPage, graphql },
    { indices, path: 'case-studies', template: caseStudyTemplate }
  )
  const articles = fetchMarkdownPages(
    { createPage, graphql },
    { indices, path: 'articles', template: articleTemplate }
  )

  const allIndices = Promise.all([caseStudies, articles])

  const languages = fetchIndexPages({ createPage }, {
    path: '/languages/{key}',
    template: languageTemplate,
    source: allIndices.then(() => indices.languages),
    counts: allIndices.then(() => indices.counts.languages)
  })
  const keywords = fetchIndexPages({ createPage }, {
    path: '/keywords/{key}',
    template: keywordTemplate,
    source: allIndices.then(() => indices.keywords),
    counts: allIndices.then(() => indices.counts.keywords)
  })
  const authors = fetchIndexPages({ createPage }, {
    path: '/authors/{key}',
    template: authorTemplate,
    source: allIndices.then(() => indices.authors),
    counts: {}
  })

  return Promise.all([
    caseStudies,
    articles,
    allIndices,
    languages,
    authors,
    keywords
  ])
}
