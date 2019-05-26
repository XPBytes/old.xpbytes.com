import React from 'react'
import { Layout } from '../components/layout';
import { BackToHome } from '../components/back-to-home';
import SEO from '../components/seo';
import { Link } from 'gatsby';

import styled from '@emotion/styled'
import CaseStudiesSection from '../components/index/case-studies-section';

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
export default function Template(): JSX.Element {

  return (
    <Layout>
      <SEO
        title="Case Studies">
      </SEO>

      <BackToHome />

      <Header>
        <Heading>Case Studies</Heading>
        <p>Written by <Link to="/">XP Bytes</Link>, experienced developers who help you realise your idea.</p>
      </Header>

      <CaseStudiesSection title={false} />
    </Layout>
  )
}
