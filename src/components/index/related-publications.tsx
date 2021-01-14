import React from 'react'
import { Link } from 'gatsby';
import styled from "@emotion/styled"

import { Section, SectionHeading } from './section';

const List = styled('ol')`
list-style: none;
margin: 0;
padding: 0;
`

const Article = styled('article')`
`

const Title = styled('h3')`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 0;
  display: inline-block;
  margin-right: 1rem;
`

const Description = styled('p')`
  font-size: 14px;
  margin-bottom: 1rem;
`

const Meta = styled('small')`
`

function AllLink(): JSX.Element {
  return (<small>(<Link to={"/articles"}>show all</Link>)</small>)
}

interface RelatedPublicationsProps {
  items: readonly any[]
  title?: string
  filtered?: boolean
}

export function RelatedPublications({ items, filtered, title }: RelatedPublicationsProps): JSX.Element | null {
  if (items.length === 0) {
    return null
  }

  return (
    <Section>
      <SectionHeading>{title || 'Publications'} { filtered && <AllLink />}</SectionHeading>
      <List>
        {items.map(({ title, path, description, modifiedIsoDate }): JSX.Element => (
          <li key={path}>
            <Article>
              <header>
                <Title><Link to={path}>{title}</Link></Title>
                <Meta><span hidden aria-label="Published on:" title="Published on:">📅</span> <time dateTime={modifiedIsoDate}>{
                  new Date(modifiedIsoDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric' })
                }</time></Meta>
              </header>
              <Description>{description}</Description>
            </Article>
          </li>
        ))}
      </List>
    </Section>
  )
}

// make gatsby build happy
export default RelatedPublications
