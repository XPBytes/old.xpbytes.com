import React from 'react'
import { StaticQuery, graphql } from 'gatsby';
import styled from "@emotion/styled"

interface OpenSourceSectionProps {
  noop?: never
}

interface RepositoryNode {
  name: string
  nameWithOwner: string
  descriptionHTML: string
  primaryLanguage?: {
    name: string
    color: string
  }
  pushedAt: string
  url: string
}

const PinnedCard = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PinnedLink = styled('a')`
  font-weight: 600;
  font-size: 14px;
`

const PinnedDescription = styled('div')`
  font-size: 14px;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`

const RegularDescription = styled('div')`
  font-size: 14px;
`

const RepositoryIconSvg = styled('svg')`
  margin-right: 0.5rem;

  body.dark & {
    fill: white;
  }
`

function RepositoryIcon(): JSX.Element {
  return (
    <RepositoryIconSvg viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
      <path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
      <title>Repository</title>
    </RepositoryIconSvg>
  )
}

function PinnedRepository({ name, nameWithOwner, url, descriptionHTML, primaryLanguage }: RepositoryNode): JSX.Element {
  return (
    <PinnedCard>
      <header>
        <RepositoryIcon />
        <PinnedLink href={url} rel="noopener noreferrer">
          <span title={nameWithOwner}>{name}</span>
        </PinnedLink>
      </header>

      <PinnedDescription dangerouslySetInnerHTML={{ __html: descriptionHTML }} />

      {primaryLanguage && (
        <LanguageIndicator name={primaryLanguage.name} color={primaryLanguage.color} />
      )}
    </PinnedCard>
  )
}

const RepositoryLink = styled('a')`
  margin-right: 0.75rem;
`


function RegularRepository({ name, nameWithOwner, url, descriptionHTML, primaryLanguage }: RepositoryNode): JSX.Element {
  return (
    <div>
      <header>
        <RepositoryLink href={url} rel="noopener noreferrer">
          <span title={nameWithOwner}>{name}</span>
        </RepositoryLink>

        {primaryLanguage && (
          <LanguageIndicator name={primaryLanguage.name} color={primaryLanguage.color} />
        )}
      </header>

      <RegularDescription dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
    </div>
  )
}

const LanguageIndicatorCircle = styled('span')`
  border-radius: 50%;
  display: inline-block;
  height: 0.65rem;
  position: relative;
  top: 1px;
  width: 0.65rem;
  margin-right: 0.3rem;
  border: 1px solid white;
  box-sizing: border-box;
`

const LanguageIndicatorWrapper = styled('span')`
  color: #586069;
  font-size: 12px;
  margin-top: auto;

  body.dark & {
    color: white;
  }
`

function LanguageIndicator({ name, color }: { name: string, color: string }): JSX.Element {
  return (
    <LanguageIndicatorWrapper title={`Primary language: ${name}`}>
      <LanguageIndicatorCircle
        style={{
          backgroundColor: color
        }} />
      {name}
    </LanguageIndicatorWrapper>
  )
}

const Section = styled('section')`
  margin-bottom: 2.9rem;
`

const List = styled('ol')`
  list-style: none;
  margin: -6px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`

const PinnedListItem = styled('li')`
  border: 1px solid #e1e4e8;
  padding: 1rem;
  flex: 1 1 280px;
  width: 319px;
  border-radius: 3px;
  margin: 6px;
  box-sizing: border-box;

  body.dark & {
    border-color: #586069;
  }
`

const RegularListItem = styled('li')`
  flex: 1 0 100%;
  margin: 7px;
`

const Footer = styled('footer')`
  margin-top: 2rem;
  border-top: 1px dashed rgba(0, 0, 0, .17);
  padding-top: 0.5rem;
`
export const OpenSourceSection: React.SFC<OpenSourceSectionProps> = (): JSX.Element => {
  return (
    <Section>
      <h2>Open Source Projects</h2>
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

            return (
              <>
              {
                pinnedRepositories.map((node: RepositoryNode, i: number): JSX.Element => (
                  <PinnedListItem key={node.name}>
                    <PinnedRepository {...node} />
                  </PinnedListItem>
                ))
              }
              {
                otherRepositories.map((node: RepositoryNode, i: number): JSX.Element => (
                  <RegularListItem key={node.name} style={{
                    marginTop: i === 0 ? '2rem' : 7
                  }}>
                    <RegularRepository {...node} />
                  </RegularListItem>
                ))
              }
              </>
            )
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
