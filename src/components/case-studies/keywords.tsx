import React from 'react'
import styled from '@emotion/styled'

import { AsideHeading, AsideCaption } from '../aside'
import { KeywordLink } from '../keyword-link';

const TechnologyList = styled('ul')`
  list-style: inside circle;
  margin: 0 0 1.45rem;
  padding: 0;
  font-size: .9rem;
`

export function Keywords({ keywords }: { keywords: string[] }): JSX.Element | null {
  if (!keywords || keywords.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Keywords</AsideHeading>
      <AsideCaption>This case study is tagged with these keywords.</AsideCaption>
      <TechnologyList>
        {keywords.map((keyword): JSX.Element => (
          <li key={keyword}>
            <KeywordLink keyword={keyword}>{keyword}</KeywordLink>
          </li>
        ))}
      </TechnologyList>
    </>
  )
}

