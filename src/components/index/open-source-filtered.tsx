import React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import styled from "@emotion/styled"

import { Section, SectionHeading } from './section';
import { RelatedOpenSource, RepositoryNode } from './related-open-source';
import { LanguageIndicator } from '../language-indicator';

interface OpenSourceSectionProps {
  language: string
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
export const FilteredOpenSourceSection: React.SFC<OpenSourceSectionProps> = ({ language }: { language: string }): JSX.Element => {
  return (
    <StaticQuery
      query={graphql`
        query LanguageItemsQuery {
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
      render={({ github: { organization: { pinnedItems: { nodes: pinned }, repositories: { nodes: repositories }}}}): null | JSX.Element => {
        const pinnedNames: string[] = pinned.map((pinn: { name: string }): string => pinn.name)
        const pinnedRepositories = repositories.filter((repo: RepositoryNode): boolean => (pinnedNames.indexOf(repo.name) !== -1 && repo.primaryLanguage && repo.primaryLanguage.name === language) || false)
        const otherRepositories = repositories.filter((repo: RepositoryNode): boolean => (pinnedNames.indexOf(repo.name) === -1 && repo.primaryLanguage && repo.primaryLanguage.name === language) || false).slice(0, 10)

        if (pinnedRepositories.length + otherRepositories.length === 0) {
          return null
        }

        return (
          <Section>
            <SectionHeading>Open Source Projects</SectionHeading>
            <p>Only showing the repositories with {<LanguageIndicator name={language} />} as the primary language.</p>
            <List>
              <RelatedOpenSource pinned={pinnedRepositories} respositories={otherRepositories} />
            </List>
          </Section>
        )
      }}
    />
  )
}

// make gatsby build happy
export default FilteredOpenSourceSection
