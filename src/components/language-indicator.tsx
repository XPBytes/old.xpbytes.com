import React, { useMemo } from 'react'
import styled from "@emotion/styled"
import knownLanguages from '../data/languages.json'
import { CSSProperties } from '@emotion/serialize';
import { BackgroundColorProperty } from 'csstype';

const LanguageIndicatorCircle = styled('span')`
  border-radius: 50%;
  display: inline-block;
  height: 0.65rem;
  position: relative;
  top: 1px;
  width: 0.65rem;
  margin-right: 0.3rem;
  border: 1px solid white;
  box-sizing: border-box;
`

const LanguageIndicatorWrapper = styled('span')`
  color: #586069;
  font-size: 12px;
  margin-top: auto;

  body.dark & {
    color: white;
  }
`

function findColor(name: string): BackgroundColorProperty {
  if (name in knownLanguages) {
    const nameKey = name as keyof typeof knownLanguages
    return knownLanguages[nameKey].color || 'transparent'
  }
  return 'transparent'
}

export function LanguageIndicator({ name, color, className }: { name: string, color?: string, className?: string }): JSX.Element {
  const actualColor = useMemo((): ReturnType<typeof findColor> => color || findColor(name), [color, name])
  return (
    <LanguageIndicatorWrapper title={`Primary language: ${name}`} className={className}>
      <LanguageIndicatorCircle
        style={{
          backgroundColor: actualColor
        }} />
      {name}
    </LanguageIndicatorWrapper>
  )
}
