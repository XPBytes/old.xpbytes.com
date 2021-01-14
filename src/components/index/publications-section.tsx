import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { RelatedPublications } from './related-publications'

export function PublicationsSection(): JSX.Element {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: { frontmatter: { path: { regex: "^/articles/" } } }
            sort: { order: DESC, fields: [frontmatter___published_date] }
            limit: 5
          ) {
            edges {
              node {
                frontmatter {
                  title
                  description
                  path
                  modifiedIsoDate: modified_date(formatString: "YYYY-MM-DD")
                }
              }
            }
          }
        }
      `}
      render={({ allMarkdownRemark: { edges } }): JSX.Element => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const publications = edges.map((edge: any): any => {
          const {
            title,
            path,
            description,
            modifiedIsoDate,
          } = edge.node.frontmatter
          return { title, path, description, modifiedIsoDate }
        })
        return (
          <RelatedPublications
            items={publications}
            title="Latest Publications"
            filtered={true}
          />
        )
      }}
    />
  )
}

// make gatsby build happy
export default PublicationsSection
