import React from 'react'

import { Layout } from "../../components/layout";
import SEO from "../../components/seo";

const SaxomaniaPage = (): JSX.Element => (
  <Layout>
    <SEO
      title="Case Study: Saxomania"
      description="Dutch software agency specializing in custom, tailored, software."
      keywords={['custom software', 'maatwerk software', 'software', 'typescript', 'react', 'rails', 'ruby', 'c#', 'dotnet', '.NET', 'UX', 'AWS']} />

    <article>
      <header style={{ paddingTop: '2rem' }}>
        <h2>Case Study: Saxomania</h2>
        <span>Coming soon...</span>
      </header>
    </article>
  </Layout>
)

// Tech Demo

export default SaxomaniaPage
