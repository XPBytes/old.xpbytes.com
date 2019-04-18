import React from 'react'
import styled from '@emotion/styled'

import { AsideHeading, AsideCaption } from './aside'
import knownLanguages from '../../data/languages.json'

const LanguageList = styled('ol')`
  list-style: none;
  margin: 0 0 1.45rem;
`

const LanguageIndicatorCircle = styled('span')`
  border-radius: 50%;
  display: inline-block;
  height: 0.5rem;
  position: relative;
  top: 0px;
  width: 0.5rem;
  margin-right: 0.75rem;
`

const LanguageIndicatorWrapper = styled('span')`
  color: #586069;
  font-size: .75rem;
  margin-top: auto;

  body.dark & {
    color: white;
  }
`

function LanguageIndicator({ name, color = ((knownLanguages as any)[name] || { color: 'black' }).color }: { name: string, color?: string }): JSX.Element {
  return (
    <LanguageIndicatorWrapper title={`Programming language: ${name}`}>
      <LanguageIndicatorCircle
        style={{
          backgroundColor: color
        }} />
      {name}
    </LanguageIndicatorWrapper>
  )
}


export function Languages({ languages }: { languages: string[] }): JSX.Element | null {
  if (!languages || languages.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Languages</AsideHeading>
      <AsideCaption>We've used these programming languages.</AsideCaption>
      <LanguageList>
        {languages.map((lang): JSX.Element => (<li key={lang}><LanguageIndicator name={lang} /></li>))}
      </LanguageList>
    </>
  )
}
