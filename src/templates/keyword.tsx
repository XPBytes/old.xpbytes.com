import React, { useMemo } from "react"
import { withPrefix } from "gatsby"
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
    counts: {
      [key: string]: number
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

const TagBase = css`
  font-family: 'Courier New', Courier, monospace;

  &.tag-0 { font-size: 0.9rem; }
  &.tag-1 { font-size: 1rem; }
  &.tag-2 { font-size: 1.2rem; font-weight: 400; }
  &.tag-3 { font-size: 1.5rem; font-weight: 500; }
  &.tag-4 { font-size: 1.8rem; font-weight: 600; }
  &.tag-5 { font-size: 2.1rem; font-weight: 700; }
`

interface TagProps {
  children: React.ReactNode
  count?: number
  range?: CountRange
}

function Tag({ children, count, range }: TagProps): JSX.Element {
  const position = count && range ? range.distinct.indexOf(count) : -1
  const relative = count && range ? Math.floor((position + 1) / range.distinct.length * 5) : 0
  return (<span css={TagBase} className={`tag-${relative}`}>{children}</span>)
}

interface ReducingCount {
  min: number
  max: number
  distinct: { [n: number]: true }
}
interface CountRange {
  min: number
  max: number
  distinct: readonly number[]
}

export default function Template({
  pathContext: { index, key, keys, counts },
}: TemplateProps): JSX.Element {
  const { articles, 'case-studies': caseStudies } = index
  const sortedKeys = useMemo((): readonly string[] => keys.slice().sort((a, b): number => a.localeCompare(b)), [keys])
  const range = useMemo((): CountRange => {
    const initial: ReducingCount = { min: Infinity, max: 0, distinct: {} }
    const reduced = Object.keys(counts).reduce((result, key): ReducingCount => {
      const count = counts[key]
      result.min = Math.min(result.min, count)
      result.max = Math.max(result.max, count)
      result.distinct[count] = true
      return result
    }, initial)
    return { min: reduced.min, max: reduced.max, distinct: Object.keys(reduced.distinct).map(Number).sort() }
  }, [counts])

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
            On this page you can find previous work tagged with <Tag>{key}</Tag>.
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
              <KeywordLink keyword={key}>
                <Tag count={counts[key] || -1} range={range}>{key}</Tag>
              </KeywordLink>
            </li>
          ))}
        </LinkList>
      </Footer>

    </Layout>
  )
}
