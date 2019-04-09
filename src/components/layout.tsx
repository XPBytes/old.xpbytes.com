/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Footer } from './footer'
// import "./layout.css"

import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"

const Wrapper = styled('div')`
  margin: 0 auto;
  max-width: 1020px;
  padding: 0 20px 32px;
  min-height: calc(100vh - 366px);
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`

const globalCss = css`
  body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    font-size: 16px;
    line-height: 1.6;
    color: #24292e;

    font-feature-settings: "kern", "liga", "clig", "calt";

    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    background-color: transparent;
    color: #8158f5; /* #835AF6; */
    -webkit-text-decoration-skip: objects;

    &:active,
    &:hover {
      outline-width: 0;
      color: #835AF6;
    }

    &:focus {
      outline-color: #835AF6;
      outline-style: solid;
      outline-width: 1px;
      outline-offset: 1px;
    }
  }

  h1 {
    margin: 0;
    margin-bottom: 1.45rem;
    padding: 0;
    color: inherit;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: bold;
    text-rendering: optimizeLegibility;
    font-size: 2.25rem;
    line-height: 1.1;
  }
  h2 {
    margin: 0;
    margin-bottom: 1.45rem;
    padding: 0;
    color: inherit;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: bold;
    text-rendering: optimizeLegibility;
    font-size: 1.62671rem;
    line-height: 1.1;
  }
  h3 {
    margin: 0;
    margin-bottom: 1.45rem;
    padding: 0;
    color: inherit;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: bold;
    text-rendering: optimizeLegibility;
    font-size: 1.38316rem;
    line-height: 1.1;
  }

  ol {
    margin: 0;
    margin-left: 1.45rem;
    margin-bottom: 1.45rem;
    padding: 0;
    list-style-position: outside;
    list-style-image: none;
  }

  dl {
    margin: 0;
    margin-bottom: 1.45rem;
    padding: 0;
  }

  dd {
    margin: 0;
    margin-bottom: 1.45rem;
    padding: 0;
  }

  dt {
    font-weight: bold;
  }

  p {
    margin: 0;
    margin-bottom: 1.45rem;
    padding: 0;

    font-size: 1rem;
  }

  figure {
    margin: 0;
    margin-bottom: 1.45rem;
    padding: 0;
  }
`

export interface LayoutProps {
  children: React.ReactNode
}
/*
queries: [
  `{
    organization(login: "xpbytes") {
      membersWithRole(last: 20) {
        edges {
          node {
            status {
              emoji
              message
              updatedAt
            }
            url
            avatarUrl
            name
            bioHTML
          }
        }
      }
    }
  }`,
],
}
*/

interface CompanyData {
  chambersOfCommerceNumber: string
  vatIdNumber: string
  address: string
  postal: string
  city: string
}

export const Layout: React.SFC<LayoutProps> = ({ children }): JSX.Element => (
  <StaticQuery
    query={graphql`
      query CompanyDataQuery {
        site {
          siteMetadata {
            company {
              chambersOfCommerceNumber
              vatIdNumber
              address
              postal
              city
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: { company }} }: { site: { siteMetadata: { company: CompanyData }}}): JSX.Element => (
      <>
        <Global styles={globalCss} />
        <Wrapper>
          <main>{children}</main>
        </Wrapper>
        <Footer {...company} />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

