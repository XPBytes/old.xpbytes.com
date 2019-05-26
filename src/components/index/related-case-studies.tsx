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

export function RelatedCaseStudies({ items, title: sectionTitle }: { items: readonly any[], title?: string | false }): JSX.Element | null {
  if (items.length === 0) {
    return null
  }

  return (
    <Section>
      {sectionTitle !== false && (<SectionHeading>{ sectionTitle || 'Case Studies' }</SectionHeading>)}
      <List>
        {items.map(({ path, title, description }): JSX.Element => (
          <li key={path}>
            <Article>
              <header>
                <Title><Link to={path}>{title}</Link></Title>
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
export default RelatedCaseStudies
