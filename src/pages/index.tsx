import React from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { Hero } from "../components/hero"
import { Excerpt } from '../components/index/excerpt'
import { OpenSourceSection } from '../components/index/open-source-section'
import { CaseStudiesSection } from "../components/index/case-studies-section";
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const IndexPage = (): JSX.Element => (
  <ThemeToggler>{({ theme, toggleTheme }) => {
    return (
      <Layout>
        <SEO
          title="eXPerienced Bytes"
          description="Dutch software agency specializing in custom, tailored, software."
          keywords={['custom software', 'maatwerk software', 'software', 'typescript', 'react', 'rails', 'ruby', 'c#', 'dotnet', '.NET', 'UX', 'AWS']} />

        <label>
          <input
            type="checkbox"
            onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
            checked={theme === 'dark'}
          />{' '}
          Dark mode
        </label>

        <Hero theme={theme}/>

        <Excerpt />
        <CaseStudiesSection />
        <OpenSourceSection />
      </Layout>
    )
  }}</ThemeToggler>
)

export default IndexPage
