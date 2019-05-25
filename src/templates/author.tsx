import React from "react"
import { withPrefix } from "gatsby"
import styled from '@emotion/styled'

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { BackToHome } from '../components/back-to-home'

import { RelatedPublications } from "../components/index/related-publications";
import { RelatedCaseStudies } from "../components/index/related-case-studies";

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
`

const Heading = styled('h1')`
  margin-bottom: .2rem;
  font-size: 3rem;
`

export default function Template({
  pathContext: { index, key },
}: TemplateProps): JSX.Element {
  const { articles, 'case-studies': caseStudies } = index
  return (
    <Layout>
      <SEO
        title={`Content written by ${key}`}>
      </SEO>

      <BackToHome />

      <Header>
        <Heading>Content by {key}</Heading>
      </Header>

      <RelatedPublications items={articles || []} />
      <RelatedCaseStudies items={caseStudies || []} />
    </Layout>
  )
}
