import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const BackLinkCss = css`
  display: block;
  line-height: 24px;
  text-decoration: none;
  margin-top: 2rem;
`

const BackLinkIcon = styled('svg')`
  vertical-align: bottom;
  margin-right: 4px;

  fill: currentColor;
`

export function BackToHome(): JSX.Element {
  return (
    <Link to="/" aria-label="Back to home" css={BackLinkCss}>
      <BackLinkIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </BackLinkIcon>

      Back to home
    </Link>
  )
}
