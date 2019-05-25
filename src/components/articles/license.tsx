import React from 'react'

import { AsideHeading, AsideCaption } from '../aside'
import { ExternalLink } from '../external-link';


export function License({ license, url }: { license?: string, url?: string }): JSX.Element | null {
  if (!license || license.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>License</AsideHeading>
      <AsideCaption>This license applies to the textual content of the article. The images might have their own license.</AsideCaption>
      <ExternalLink href={url || '#'}>{license}</ExternalLink>
    </>
  )
}
