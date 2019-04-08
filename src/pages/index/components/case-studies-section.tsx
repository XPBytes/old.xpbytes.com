import React from 'react'

interface CaseStudiesSectionProps {
  noop?: never
}

export const CaseStudiesSection: React.SFC<CaseStudiesSectionProps> = (): JSX.Element | null => {
  if (true) {
    return <div></div>
  }
  return (
    <section>
      <h2>Case Studies</h2>
      <ul>

      </ul>
    </section>
  )
}

// make gatsby build happy
export default CaseStudiesSection
