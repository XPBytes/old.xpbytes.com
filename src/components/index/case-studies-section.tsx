import React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import { RelatedCaseStudies } from './related-case-studies';


export function CaseStudiesSection({ title }: { title?: string | false }): JSX.Element {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: { frontmatter: { path: { regex: "^\/case-studies\/" }, listed: { eq: true } } }
            sort: { order: ASC, fields: [frontmatter___title] }
            limit: 1000
          ) {
            edges {
              node {
                frontmatter {
                  title
                  description
                  path
                }
              }
            }
          }
        }
      `}
      render={({ allMarkdownRemark: { edges } }): JSX.Element => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const caseStudies = edges.map((edge: any): any => {
          const { title, path, description, modifiedIsoDate } = edge.node.frontmatter
          return { title, path, description, modifiedIsoDate }
        })
        return (<RelatedCaseStudies items={caseStudies} title={title} />)
      }} />
  )
}


// make gatsby build happy
export default CaseStudiesSection
