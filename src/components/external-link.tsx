import React from 'react'

export function ExternalLink({ href, children }: { href: string, children: React.ReactNode }): JSX.Element {
  return (
    <a href={href} rel="noopener noreferer">{children}</a>
  )
}
