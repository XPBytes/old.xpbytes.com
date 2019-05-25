import React from 'react'

import { AsideHeading, AsideCaption } from '../aside'
import { Link } from 'gatsby';
import { AuthorLink } from '../author-link';


export function Author({ author }: { author?: string }): JSX.Element | null {
  if (!author || author.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Written by</AsideHeading>
      <AsideCaption>This is the main author for this article.</AsideCaption>
      <AuthorLink name={author}>{author}</AuthorLink>
    </>
  )
}
