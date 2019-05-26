import React, { useMemo } from 'react'
import { Layout } from '../components/layout';
import { BackToHome } from '../components/back-to-home';
import SEO from '../components/seo';
import { graphql, Link } from 'gatsby';

import styled from '@emotion/styled'
import { LanguageIndicator } from '../components/language-indicator';
import { LanguageLink } from '../components/language-link';
import { KeywordLink } from '../components/keyword-link';


const List = styled('ol')`
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    margin-bottom: 1.5rem;
  }
`

const Article = styled('article')`
`

const Title = styled('h3')`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 0;
  display: inline-block;
  margin-right: 1rem;
`

const Description = styled('p')`
  font-size: 14px;
  margin-bottom: 0;
`

const Meta = styled('small')`
  time + a {
    margin-left: 1rem;
  }

  span + ol {
    margin-left: .25rem;
  }
`

const Header = styled('header')`
  padding-top: 2.9rem;
  flex: 1 0 100%;
  margin: 0;
  margin-bottom: 4rem;

  & > p {
    font-size: 1.5rem;

    & > span {
      font-size: 1.2rem;
    }
  }
`

const Heading = styled('h1')`
  margin-bottom: .6rem;
  font-size: 3rem;
`
export default function Template({ data: { allMarkdownRemark: { edges }}}: any): JSX.Element {
  const publications = edges.map((edge: any): any => {
    const { title, path, description, modifiedIsoDate, author, languages, keywords } = edge.node.frontmatter
    return { title, path, description, modifiedIsoDate, author, languages, keywords }
  })

  return (
    <Layout>
      <SEO
        title="Archive of Articles">
      </SEO>

      <BackToHome />

      <Header>
        <Heading>Articles</Heading>
        <p>Written by <Link to="/">XP Bytes</Link>, experienced developers who help you realise your idea.</p>
      </Header>

      <ListOfPublications items={publications || []} />
    </Layout>
  )
}

interface ListOfPublicationsProps {
  items: readonly any[]
}

export function ListOfPublications({ items }: ListOfPublicationsProps): JSX.Element | null {
  if (items.length === 0) {
    return null
  }

  return (
    <List>
      {items.map((item): JSX.Element => (
        <li key={item.path}>
          <Publication {...item} />
        </li>
      ))}
    </List>
  )
}

const KeywordList = styled('ol')`
  display: inline-block;
  margin: 0 -0.25rem;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
  line-height: 3rem;

  & > li {
    display: inline-block;
    margin: 0 0.25rem;

    & > a {
      display: inline-block;
    }

    &:after {
      content: ', ';
      display: inline-block;
    }

    &:last-of-type:after {
      display: none;
    }
  }
`

function Publication({ title, path, description, modifiedIsoDate, languages, keywords }: any): JSX.Element {
  const modifiedOnText = useMemo(
    () => new Date(modifiedIsoDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric' }),
    [modifiedIsoDate]
  )

  const sortedKeywords = useMemo(
    () => keywords.slice().sort((a: string, b: string) => a.localeCompare(b)),
    [keywords]
  )

  return (
    <Article>
      <header>
        <Title><Link to={path}>{title}</Link></Title>
        <Meta>
          <span aria-label="Published on:" title="Published">📅</span> <time dateTime={modifiedIsoDate}>{modifiedOnText}</time>
          {languages.map((language: string) => (
            <LanguageLink name={language} key={language}>
              <LanguageIndicator name={language} />
            </LanguageLink>
          ))}
        </Meta>
      </header>
      <Description>{description}</Description>

      {sortedKeywords.length > 0 && (
        <Meta>
          <span aria-label="Keywords:" title="Tagged with">🏷</span>
          <KeywordList>
            {sortedKeywords.map((keyword: string) => (
              <li key={keyword}>
                <KeywordLink keyword={keyword}>
                  {keyword}
                </KeywordLink>
              </li>
            ))}
          </KeywordList>
        </Meta>
      )}
    </Article>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "^\/articles\/" } } }
      sort: { order: DESC, fields: [frontmatter___published_date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            path
            author
            languages
            keywords
            modifiedIsoDate: modified_date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`
