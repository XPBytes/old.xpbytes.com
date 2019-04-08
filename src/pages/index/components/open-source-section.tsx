import React from 'react'
/* @  jsx jsx */
// import { css, jsx } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby';

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

function PinnedRepository({ name, nameWithOwner, url, descriptionHTML, primaryLanguage }: RepositoryNode): JSX.Element {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header>
        <svg style={{ marginRight: 8 }} viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true">
          <path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path>
          <title>Repository</title>
        </svg>
        <a href={url} style={{ fontWeight: 600, fontSize: 14 }} rel="noopener noreferrer">
          <span title={nameWithOwner}>{name}</span>
        </a>
      </header>

      <div
        style={{
          fontSize: 14,
          marginBottom: 16,
          marginTop: 8
        }}
        dangerouslySetInnerHTML={{ __html: descriptionHTML }} />

      {primaryLanguage && (
        <LanguageIndicator name={primaryLanguage.name} color={primaryLanguage.color} />
      )}
    </div>
  )
}

function RegularRepository({ name, nameWithOwner, url, descriptionHTML, primaryLanguage }: RepositoryNode): JSX.Element {
  return (
    <div>
      <header>
        <a href={url} style={{ marginRight: 12 }} rel="noopener noreferrer">
          <span className="repo js-pinnable-item" title={nameWithOwner}>{name}</span>
        </a>

        {primaryLanguage && (
          <LanguageIndicator name={primaryLanguage.name} color={primaryLanguage.color} />
        )}
      </header>

      <div style={{
          fontSize: 14
        }} dangerouslySetInnerHTML={
        { __html: descriptionHTML }
      } />
    </div>
  )
}

function LanguageIndicator({ name, color }: { name: string, color: string }): JSX.Element {
  return (
    <span style={{ color: '#586069', fontSize: 14, marginTop: 'auto' }} title={`Primary language: ${name}`}>
      <span
        style={{
          borderRadius: '50%',
          display: 'inline-block',
          height: 12,
          position: 'relative',
          top: 1,
          width: 12,
          marginRight: 8,

          backgroundColor: color
        }}></span>
      {name}
    </span>
  )
}


export const OpenSourceSection: React.SFC<OpenSourceSectionProps> = (): JSX.Element => {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2>Open Source Projects</h2>
      <ul style={{
        listStyle: 'none',
        margin: -6,
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap'
      }}>
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
          render={({ github: { organization: { pinnedItems: { nodes: pinned }, repositories: { nodes: repositories }}}}) => {
            const pinnedNames: string[] = pinned.map((pinn: { name: string }) => pinn.name)
            const pinnedRepositories = repositories.filter((repo: RepositoryNode) => pinnedNames.indexOf(repo.name) !== -1)
            const otherRepositories = repositories.filter((repo: RepositoryNode) => pinnedNames.indexOf(repo.name) === -1).slice(0, 10)

            return (
              <>
              {
                pinnedRepositories.map((node: RepositoryNode, i: number) => (
                  <li key={node.name}
                    style={{
                      border: '1px solid #e1e4e8',
                      padding: 16,
                      flex: '1 1 280px',
                      width: 319,
                      borderRadius: 3,
                      margin: 6,
                      boxSizing: 'border-box'
                    }}>
                    <PinnedRepository {...node} />
                  </li>
                ))
              }
              {
                otherRepositories.map((node: RepositoryNode) => (
                  <li key={node.name} style={{
                    flex: '1 0 100%',
                    margin: 6
                  }}>
                    <RegularRepository {...node} />
                  </li>
                ))
              }
              </>
            )
          }}
        />
      </ul>
      <footer style={{
          marginTop: '2rem',
          borderTop: '1px dashed rgba(0, 0, 0, .17)',
          paddingTop: '0.5rem'
        }}>
        <p>See more on the company's GitHub profile: <a href="https://github.com/XPBytes/" rel="noopener noreferrer">XPBytes</a></p>
      </footer>
    </section>
  )
}

// make gatsby build happy
export default OpenSourceSection
