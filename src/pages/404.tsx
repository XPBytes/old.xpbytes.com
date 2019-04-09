import React from "react"

import { Link } from 'gatsby'
import { Layout } from "../components/layout"
import { SEO } from '../components/seo'
import { Hero } from '../components/hero'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

const Article = styled('article')`
  max-width: 540px;
  border-left: 3px dotted;
  padding-left: 2rem;
`

const Header = styled('header')`
  margin-bottom: 1.45rem;
`

const MainHeader = styled('header')`
  margin: 2.9rem 0;
`

const Heading = styled('h1')`
  margin-bottom: 0.5rem;
`

const Meta = styled('small')`
`


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


const NotFoundPage = (): JSX.Element => (
  <Layout>
    <SEO title="404: Not found" />

    <Link to="/" aria-label="Back to home" css={BackLinkCss}>
      <BackLinkIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </BackLinkIcon>

      Back to home
    </Link>

    <MainHeader>
      <Heading>Not Found</Heading>
      <p>
        You just hit a route that doesn&#39;t exist... the sadness. Here is a
        poem instead.
      </p>
    </MainHeader>

    <Article>
      <Header>
        <Heading>Bits. And pieces.</Heading>
        <Meta>By <a href="https://derk-jan.com" rel="author">Derk-Jan Karrenbeld</a>, published on <time dateTime="2015-04-09">{new Date("2015-04-09").toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric' })}</time></Meta>
      </Header>

      <p>
        Bits. Bits and pieces. Bits and Bytes. I see the spinner whilst it
        compiles. Waiting. Chunks of code. Bits and pieces. My mind reduced to
        machinery; logic; harsh, rude and singular truth.
      </p>

      <p>
        <em>I <strong>type</strong>. I save. I press the button. I watch the spinner.</em>
      </p>

      <p>
        Code lights up as exceptions are thrown. Thrown exceptions, breaking the
        code in bits and pieces. Like a CPU, my mind goes into overdrive,
        heating up ever so slightly. Where did I go wrong, what did I do wrong.
        I think, I linger.
      </p>

      <p>
        <em>I type. I <strong>save</strong>. I press the button. I watch the spinner.</em>
      </p>

      <p>
        “It works for me”, “Not enough information”, “By Design”. Writing on the
        interwebs can only answer my lingering questions so much. Piece by piece
        I will find the solution and write the code, from mind to machinery.
      </p>

      <p>
        <em>I type. I save. I want to press the button</em>
      </p>

      <p>
        My mind wanders and I am lost.
      </p>
    </Article>
  </Layout>
)

export default NotFoundPage
