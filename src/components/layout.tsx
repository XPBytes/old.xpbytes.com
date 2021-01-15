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
  address1: string
  address2: string
  postal: string
  city: string
}

export const Layout: React.SFC<LayoutProps> = ({ children }): JSX.Element => (
  <>
    <Wrapper>
      <main>{children}</main>
    </Wrapper>
    <StaticQuery
      query={graphql`
        query CompanyDataQuery {
          site {
            siteMetadata {
              company {
                chambersOfCommerceNumber
                vatIdNumber
                address1
                address2
                postal
                city
              }
            }
          }
        }
      `}
      render={({ site: { siteMetadata: { company }} }: { site: { siteMetadata: { company: CompanyData }}}): JSX.Element => (
        <Footer {...company} />
      )}
    />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

