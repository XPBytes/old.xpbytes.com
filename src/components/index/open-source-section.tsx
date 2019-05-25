import React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import styled from "@emotion/styled"

import { LanguageIndicator } from '../language-indicator';
import { Section, SectionHeading } from './section';
import { RelatedOpenSource, RepositoryNode } from './related-open-source';

interface OpenSourceSectionProps {
  noop?: never
}

const List = styled('ol')`
  list-style: none;
  margin: -6px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`

const Footer = styled('footer')`
  margin-top: 2rem;
  border-top: 1px dashed rgba(0, 0, 0, .17);
  padding-top: 0.5rem;

  body.dark & {
    border-top-color: rgba(255,255,255,.53);
  }
`
export const OpenSourceSection: React.SFC<OpenSourceSectionProps> = (): JSX.Element => {
  return (
    <Section>
      <SectionHeading>Open Source Projects</SectionHeading>
      <List>
        <StaticQuery
          query={graphql`
            query PinnedItemsQuery {
              github {
                organization(login: "xpbytes") {
                  pinnedItems(first: 6, types: [REPOSITORY]) {
                    nodes {
                      __typename
                      ... on GitHub_Repository {
                        name
                      }
                    }
                  }
                  repositories(privacy: PUBLIC, first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
                    nodes {
                      name
                      nameWithOwner
                      descriptionHTML
                      primaryLanguage {
                        name
                        color
                      }
                      pushedAt
                      url
                      openIssues: issues(states: OPEN) {
                        totalCount
                      }
                      closedIssues: issues(states: OPEN) {
                        totalCount
                      }
                      openPullRequests: pullRequests(states: OPEN) {
                        totalCount
                      }
                      closedPullRequests: pullRequests(states: CLOSED) {
                        totalCount
                      }
                      stargazers {
                        totalCount
                      }
                    }
                  }
                }
              }
            }
          `}
          render={({ github: { organization: { pinnedItems: { nodes: pinned }, repositories: { nodes: repositories }}}}): JSX.Element => {
            const pinnedNames: string[] = pinned.map((pinn: { name: string }): string => pinn.name)
            const pinnedRepositories = repositories.filter((repo: RepositoryNode): boolean => pinnedNames.indexOf(repo.name) !== -1)
            const otherRepositories = repositories.filter((repo: RepositoryNode): boolean => pinnedNames.indexOf(repo.name) === -1).slice(0, 10)

            return (<RelatedOpenSource pinned={pinnedRepositories} respositories={otherRepositories} />)
          }}
        />
      </List>
      <Footer>
        <p>See more on the company's GitHub profile: <a href="https://github.com/XPBytes/" rel="noopener noreferrer">XPBytes</a></p>
      </Footer>
    </Section>
  )
}

// make gatsby build happy
export default OpenSourceSection
