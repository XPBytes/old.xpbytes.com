import React from 'react'
import styled from '@emotion/styled'

import { AsideHeading, AsideCaption } from '../aside'

const ComponentList = styled('ul')`
  list-style: inside circle;
  margin: 0 0 1.45rem;
  padding: 0;
  font-size: .9rem;
`

export function Components({ components }: { components: string[] }): JSX.Element | null {
  if (!components || components.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Components</AsideHeading>
      <AsideCaption>We've built and delivered these components.</AsideCaption>
      <ComponentList>
        {components.map((component): JSX.Element => (<li key={component}>{component}</li>))}
      </ComponentList>
    </>
  )
}
