import React from 'react'
import styled from '@emotion/styled'

import { AsideHeading, AsideCaption } from '../aside'

const TechnologyList = styled('ul')`
  list-style: inside circle;
  margin: 0 0 1.45rem;
  padding: 0;
  font-size: .9rem;
`

export function Technologies({ technologies }: { technologies: string[] }): JSX.Element | null {
  if (!technologies || technologies.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Technologies</AsideHeading>
      <AsideCaption>We've used these tools and technologies.</AsideCaption>
      <TechnologyList>
        {technologies.map((technology): JSX.Element => (<li key={technology}>{technology}</li>))}
      </TechnologyList>
    </>
  )
}

