import React, { CSSProperties } from "react"

import colouredSvg from '../images/logo-vertical.svg'
import lightSvg from  '../images/logo-vertical_light.svg'

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

const styles: CSSProperties = { background: 'transparent', margin: '0 -1rem', padding: '8rem 1rem 4rem' }
const inverseStyles: CSSProperties = { background: '#252a34', margin: '0 -1rem', padding: '8rem 1rem 4rem' }

const imageStyle: CSSProperties = { maxWidth: 300, width: '100%', margin: '0 auto', display: 'block' }
const lightCaptionStyle: CSSProperties = { color: 'white', textAlign: 'center', fontSize: '1.5rem', margin: '3rem 1rem' }
const darkCaptionStyle: CSSProperties = { color: 'black', textAlign: 'center', fontSize: '1.5rem', margin: '3rem 1rem' }

export const Logo = ({ inverse }: { inverse?: boolean }): JSX.Element => (
  <figure style={inverse ? inverseStyles : styles}>
    <h1 aria-label="XP Bytes"><img src={inverse ? lightSvg : colouredSvg} style={imageStyle} alt="XP Bytes logo"/></h1>
    <figcaption style={inverse ? lightCaptionStyle : darkCaptionStyle}>A dutch software agency specializing in software couture; that is, tailored code.</figcaption>
  </figure>
)
