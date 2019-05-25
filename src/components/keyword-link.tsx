import React from 'react'
import { Link } from 'gatsby'
import slugify from '@sindresorhus/slugify'

const slugOptions: slugify.Options = {
  customReplacements: [
    ['#', 'sharp'],
    ['.', 'dot'],
    ['+', 'plus']
  ]
}

export function KeywordLink({ keyword, children }: { keyword: string, children: React.ReactNode }): JSX.Element {
  return (
    <Link to={`/keywords/${slugify(keyword, slugOptions)}`}>{children}</Link>
  )
}
