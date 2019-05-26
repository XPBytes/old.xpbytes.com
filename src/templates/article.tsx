import React from "react"
import { graphql, withPrefix } from "gatsby"
import styled from '@emotion/styled'

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { BackToHome } from '../components/back-to-home'

import { Languages } from '../components/case-studies/languages'
import { License } from '../components/articles/license'
import { Author } from '../components/articles/author'
import { ArticleMeta } from '../components/articles/article-meta'
import { Keywords } from "../components/articles/keywords";

const STATIC_LOGO = withPrefix('/images/logo.png')

interface TemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        path: string
        title: string
        author: string
        author_id: string
        modifiedIsoDate: string
        publishedIsoDate: string
        keywords: string[]
        description: string
        languages: string[]
        license: string
        license_url: string
      }
      html: string
      timeToRead: string
    }
  }
}

const Article = styled('article')`
  display: block;
  margin: 0;

  p {
    font-size: 1.075rem;
    line-height: 1.8;
  }

  p + .gatsby-highlight {
    margin-top: -.50325rem;
    margin-bottom: 1.275rem;
  }

  h2, h3 {
    margin-bottom: 0.75rem;
    margin-top: 2.25rem;
  }
`

const Header = styled('header')`
  padding-top: 2.9rem;
  flex: 1 0 100%;
  margin: 0;
  margin-bottom: 2rem;
`

const Heading = styled('h1')`
  margin-bottom: .6rem;
  font-size: 3rem;
`

const Content = styled('div')`
  max-width: 700px;
  margin: 0 auto;
  width: 100%;

  & figcaption {
    font-size: 14px;
    font-style: italic;
    margin-top: .5rem;
  }
`

/*
<header>
  <Collaboration otherLabel={title} otherSrc={logoPublicUrl} />
</header>
*/

const Description = styled('div')`
  margin: 0.5rem 0 2rem 0;
  font-size: 2rem;
`

const Footer = styled('footer')`
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
`

const MetaList = styled('ul')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 -1.5rem 1rem;
  list-style: none;

  background: #f5f5f5;

  body.dark & {
    background: #151515;
  }

  li {
    width: 148px;
  }

  @media (min-width: 800px) {
    justify-content: center;

    li {
      width: auto;
    }
  }
`

const MetaListItem = styled('li')`
  margin: -.5rem 1.5rem 1rem;
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: TemplateProps): JSX.Element {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter: { title, keywords, description, modifiedIsoDate, publishedIsoDate, path, ...aside }, html, timeToRead } = markdownRemark
  const { languages, license, license_url: licenseUrl, author, author_id: authorId } = aside
  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        keywords={keywords}>
      </SEO>

      <BackToHome />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:
        `{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Articles",
              "item": "https://xpbytes.com/articles"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "${title}",
              "item": "https://xpbytes.com${path}"
            }
          ]
        }`}} />

      <Article>
        <Header>
          <Heading>{title}</Heading>
          <Description>{description}</Description>

          <MetaList>
            <MetaListItem><Author author={author} /></MetaListItem>
            <MetaListItem><ArticleMeta publishedOn={publishedIsoDate} lastRevisionOn={modifiedIsoDate} timeToRead={timeToRead} /></MetaListItem>
            <MetaListItem><Languages languages={languages} /></MetaListItem>
            <MetaListItem><License license={license} url={licenseUrl} /></MetaListItem>
          </MetaList>
        </Header>

        <Content
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <Footer>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:
            `{
              "@context": "https://schema.org",
              "@type": "TechArticle",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://xpbytes.com${path}"
              },
              "headline": "${title}",
              "datePublished": "${publishedIsoDate}",
              "dateModified": "${modifiedIsoDate}",
              "author": {
                "@id": "${authorId}",
                "@type": "Person",
                "name": "${author}"
              },
              "publisher": {
                "@id": "https://xpbytes.com/schema/Organisation.jsonld",
                "@type": "Organization",
                "name": "XP Bytes",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://xpbytes.com${STATIC_LOGO}"
                }
              },
              "description": "${description}"
            }`}} />

            <Keywords keywords={keywords} />
        </Footer>
      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        modifiedIsoDate: modified_date(formatString: "YYYY-MM-DD")
        publishedIsoDate: published_date(formatString: "YYYY-MM-DD")
        path
        title
        author
        author_id
        description
        keywords
        languages
        license
        license_url
      }
      timeToRead
    }
  }
`
