import React from 'react'
import styled from "@emotion/styled"

import { LanguageIndicator } from '../language-indicator';
import { LanguageLink } from '../language-link';

interface OpenSourceSectionProps {
  language: string
}

export interface RepositoryNode {
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
  margin-bottom: auto;
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
        <LanguageLink name={primaryLanguage.name}>
          <LanguageIndicator name={primaryLanguage.name} color={primaryLanguage.color} />
        </LanguageLink>
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
          <LanguageLink name={primaryLanguage.name}>
            <LanguageIndicator name={primaryLanguage.name} color={primaryLanguage.color} />
          </LanguageLink>
        )}
      </header>

      <RegularDescription dangerouslySetInnerHTML={{ __html: descriptionHTML }} />
    </div>
  )
}

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

export function RelatedOpenSource({ pinned, respositories }: { pinned: readonly RepositoryNode[], respositories: readonly RepositoryNode[] }): JSX.Element {
  return (
    <>
      {
        pinned.map((node: RepositoryNode, i: number): JSX.Element => (
          <PinnedListItem key={node.name}>
            <PinnedRepository {...node} />
          </PinnedListItem>
        ))
      }
      {
        respositories.map((node: RepositoryNode, i: number): JSX.Element => (
          <RegularListItem key={node.name} style={{
            marginTop: i === 0 ? '2rem' : 7
          }}>
            <RegularRepository {...node} />
          </RegularListItem>
        ))
      }
    </>
  )
}

// make gatsby build happy
export default RelatedOpenSource
