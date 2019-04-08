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

const Figcaption = styled('figcaption')`
  color: black;
  text-align: center;
  font-size: 1.5rem;
  margin: 3rem 1rem;
`

const Image = styled('img')`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  display: block;
`

export const Logo = (): JSX.Element => (
  <Figure>
    <h1 aria-label="XP Bytes"><Image src={colouredSvg} alt="XP Bytes logo"/></h1>
    <Figcaption>A dutch software agency specializing in software couture; that is, tailored code.</Figcaption>
  </Figure>
)
