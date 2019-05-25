import React from 'react'

import { AsideHeading, AsideCaption, AsideUnorderedList } from '../aside'
import { Link } from 'gatsby';
import { KeywordLink } from '../keyword-link';


export function Keywords({ keywords }: { keywords: string[] }): JSX.Element | null {
  if (!keywords || keywords.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Keywords</AsideHeading>
      <AsideCaption>These keywords apply to this article.</AsideCaption>
      <AsideUnorderedList>
        {keywords.map((keyword): JSX.Element => (
          <li key={keyword}>
            <KeywordLink keyword={keyword}>{keyword}</KeywordLink>
          </li>
        ))}
      </AsideUnorderedList>
    </>
  )
}
