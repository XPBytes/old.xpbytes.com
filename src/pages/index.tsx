import React from "react"

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { Hero } from "../components/hero"
import { Excerpt } from '../components/index/excerpt'
import { OpenSourceSection } from '../components/index/open-source-section'
import { CaseStudiesSection } from "../components/index/case-studies-section"
import { PublicationsSection } from '../components/index/publications-section'
import { Moon } from "../components/icons/moon"
import { Sun } from "../components/icons/sun"

import useDarkMode from 'use-dark-mode'

import Toggle from 'react-toggle'
import 'react-toggle/style.css'

function IndexPage(): JSX.Element {
  const { value, toggle: toggleTheme } = useDarkMode(false, { classNameDark: 'dark', classNameLight: 'light', storageKey: 'dark-mode' });
  const theme = value ? 'dark' : 'light'
  return (
    <Layout>
      <SEO
        title="eXPerienced Bytes"
        description="Dutch software agency specializing in custom, tailored, software."
        keywords={['custom software', 'maatwerk software', 'software', 'typescript', 'react', 'rails', 'ruby', 'c#', 'dotnet', '.NET', 'UX', 'AWS']}>

      </SEO>

      <Hero theme={theme}/>

      <label htmlFor="use-dark-mode" id="use-dark-mode-toggle" style={{ margin: '1rem 0', display: 'block' }}>
        <Toggle
          id="use-dark-mode"
          defaultChecked={value}
          onChange={toggleTheme}
          icons={{
            checked: <Moon aria-label="Light mode" />,
            unchecked: <Sun aria-label="Dark mode" />,
          }} />
        {' '}
        Dark mode
      </label>

      <Excerpt />
      <PublicationsSection />
      <CaseStudiesSection />
      <OpenSourceSection />
    </Layout>
  )
}

export default IndexPage
