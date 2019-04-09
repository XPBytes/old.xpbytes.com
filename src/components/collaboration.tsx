import React, { CSSProperties } from "react"

import colouredSvg from '../images/logo-vertical.svg'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `StaticQuery`: https://gatsby.dev/staticquery
 */

import styled from "@emotion/styled"

const Figure = styled('figure')`
  background: transparent;
  margin: 0 -1rem;
  padding: 8rem 1rem 4rem;
`

const Heading = styled('h1')`
  display: flex;
  align-items: center;
`

const Image = styled('img')`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  display: block;
`

export const Collaboration = ({ otherSrc, otherLabel }: { otherSrc: string, otherLabel: string }): JSX.Element => (
  <Figure>
    <Heading aria-label={`XP Bytes in collaboration with ${otherLabel}`}>
      <Image src={colouredSvg} alt="XP Bytes logo"/>
      <span artia-label="collaboration">+</span>
      <Image src={otherSrc} alt={`${otherLabel} logo`}/>
    </Heading>
  </Figure>
)
