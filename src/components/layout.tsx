/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import { Header } from "./header"
import "./layout.css"

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

export const Layout: React.SFC<LayoutProps> = ({ children }): JSX.Element => (
  <StaticQuery
    query={graphql`
      query CompanyDataQuery {
        site {
          siteMetadata {
            company {
              chambersOfCommerceNumber
              vatIdNumber
            }
          }
        }
      }
    `}
    render={({ site: { siteMetadata: { company }} }) => (
      <>
        {/*<Header siteTitle={data.site.siteMetadata.title} /> */}
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 1020,
            padding: `0px 20px 32px`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
        </div>
        <div style={{
          background: '#252A34',
          color: 'white'
        }}>
          <footer
            style={{
              margin: `0 auto`,
              padding: `2rem 20px 32px`,
              maxWidth: 1020,
            }}
            >

            <dl>
              <dt>Address</dt>
              <dd>
                <address>
                  Stationsplein 45 #D2.117 (City Whoop)<br />
                  3013 AK, Rotterdam
                </address>
              </dd>

              <dt>Chambers of Commerce</dt>
              <dd>{company.chambersOfCommerceNumber}</dd>

              <dt>VAT identification number</dt>
              <dd>{company.vatIdNumber}</dd>
            </dl>

            <span>
              XP Bytes operates in collaboration with Delft Solutions and Things Implied.
              © 2002 - {new Date().getFullYear()}
            </span>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

