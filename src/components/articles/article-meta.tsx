import React, { useMemo } from 'react'

import { AsideHeading, AsideCaption } from '../aside'
import { ExternalLink } from '../external-link';
import { Link } from 'gatsby';

export interface ArticleMetaProps {
  publishedOn: string
  lastRevisionOn: string
  timeToRead: any
}


export function ArticleMeta({ publishedOn, lastRevisionOn, timeToRead }: ArticleMetaProps): JSX.Element | null {
  const publishedOnText = useMemo((): string => new Date(publishedOn).toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric' }), [publishedOn])
  const lastRevisionOnText = useMemo((): string => new Date(lastRevisionOn).toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric' }), [lastRevisionOn])

  return (
    <>
      <AsideHeading>Published on</AsideHeading>
      <span aria-label="published on">📅</span> <time dateTime={publishedOn}>{publishedOnText}</time>
      {(publishedOn !== lastRevisionOn) && (
        <>
          <br />
          <small>updated: <time dateTime={lastRevisionOn}>{lastRevisionOnText}</time></small>
        </>
      )}
    </>
  )
}
