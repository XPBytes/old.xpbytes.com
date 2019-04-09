import React from 'react'
import styled from "@emotion/styled"

interface CaseStudiesSectionProps {
  noop?: never
}

const Section = styled('section')`
  margin-bottom: 2.9rem;
`

export const CaseStudiesSection: React.SFC<CaseStudiesSectionProps> = (): JSX.Element | null => {
  if (true) {
    return <div />
  }

  return (
    <Section>
      <h2>Case Studies</h2>
      <ul>

      </ul>
    </Section>
  )
}

// make gatsby build happy
export default CaseStudiesSection
