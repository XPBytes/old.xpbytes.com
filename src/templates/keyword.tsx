import React, { useMemo } from "react"
import { withPrefix, Link } from "gatsby"
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { BackToHome } from '../components/back-to-home'
import { KeywordLink } from '../components/keyword-link'

import { RelatedPublications } from "../components/index/related-publications";
import { RelatedCaseStudies } from "../components/index/related-case-studies";
const STATIC_LOGO = withPrefix('/images/logo.png')

interface Indice {
  path: string
  title: string
  author: string
  modifiedIsoDate: string
  description: string
}

interface TemplateProps {
  pathContext: {
    key: string
    keys: readonly string[]
    index: {
      articles?: readonly Indice[]
      'case-studies'?: readonly Indice[]
    }
  }
}


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

const LanguageHeader = css`
  font-size: 3rem;
  color: inherit !important;

  & > span {
    width: 1rem;
    height: 1rem;
  }
`

const Footer = styled('footer')`
  margin-top: 2rem;
  border-top: 1px dashed rgba(0, 0, 0, .17);
  padding-top: 0.5rem;

  body.dark & {
    border-top-color: rgba(255,255,255,.53);
  }
`

const LinkList = styled('ol')`
  list-style: none;
  margin: 0 -1rem 2rem;
  padding: 0;

  & > li {
    display: inline-block;

    & > a {
      line-height: 3.2rem;
      padding: 1rem;
    }
  }
`

const Tag = styled('span')`
  font-family: 'Courier New', Courier, monospace;
`

export default function Template({
  pathContext: { index, key, keys },
}: TemplateProps): JSX.Element {
  const { articles, 'case-studies': caseStudies } = index
  const sortedKeys = useMemo((): readonly string[] => keys.slice().sort((a, b): number => a.localeCompare(b)), [keys])

  return (
    <Layout>
      <SEO
        title={`${key}`}
        description={`Listing all content, such as publications, case-studies or open-source repositories related to "${key}". `}>
      </SEO>

      <BackToHome />

      <section>
        <Header>
          <Heading>{key}</Heading>
          <p>
            At XP Bytes we're not limited to a limited set of programming
            languages, services or technologies. On this page you can find
            previous work where tagged with <Tag>{key}</Tag>.
          </p>
        </Header>

        <RelatedPublications items={articles || []} filtered={true} />
        <RelatedCaseStudies items={caseStudies || []} />
      </section>


      <Footer>
        <p>
          Here is a list of all the keywords:
        </p>
        <LinkList>
          {sortedKeys.map((key): JSX.Element => (
            <li key={key}>
              <KeywordLink keyword={key}><Tag>{key}</Tag></KeywordLink>
            </li>
          ))}
        </LinkList>
      </Footer>

    </Layout>
  )
}
