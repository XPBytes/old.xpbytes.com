import React from 'react'
import { Link } from 'gatsby'
import { AsideHeading, AsideCaption, AsideOrderedList } from '../aside'
import { LanguageIndicator } from '../language-indicator'
import { LanguageLink } from '../language-link'


export function Languages({ languages }: { languages: string[] }): JSX.Element | null {
  if (!languages || languages.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Languages</AsideHeading>
      <AsideCaption>We've used these programming languages.</AsideCaption>
      <AsideOrderedList>
        {languages.map((lang): JSX.Element => (
          <li key={lang}>
            <LanguageLink name={lang}>
              <LanguageIndicator name={lang} />
            </LanguageLink>
          </li>
        ))}
      </AsideOrderedList>
    </>
  )
}
