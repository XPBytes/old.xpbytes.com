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

export function AuthorLink({ name, children }: { name: string, children: React.ReactNode }): JSX.Element {
  return (
    <Link to={`/authors/${slugify(name, slugOptions)}`}>{children}</Link>
  )
}
