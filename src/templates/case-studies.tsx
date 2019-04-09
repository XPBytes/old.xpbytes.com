import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import { Layout } from "../components/layout"
import SEO from "../components/seo"

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Logo } from "../components/logo";
import { Collaboration } from "../components/collaboration";

import languages from '../data/languages.json'
import services from '../data/services.json'

interface TemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        isoDate: string
        keywords: string[]
        description: string
        logo?: {
          publicURL: string
          childImageSharp: null | {
            src: string
          }
        }
        languages: string[]
        services: string[]
        technologies: string[]
        components: string[]
      }
      html: string
    }
  }
}

const Article = styled('article')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: -1rem;
`

const Header = styled('header')`
  padding-top: 2.9rem;
  flex: 1 0 100%;
  margin: 1rem;
  margin-bottom: 1.45rem;
`

const Heading = styled('h1')`
  margin-bottom: .2rem;
`

const Meta = styled('small')`
`

const Content = styled('div')`
  max-width: 700px;
  margin: 1rem;
  width: 100%;
`

const Aside = styled('aside')`
  flex: 1 1 200px;
  margin: 1rem;
`

const AsideHeading = styled('h2')`
  font-size: 1.25rem;
  margin-bottom: .675rem;
`

const AsideCaption = styled('caption')`
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
`

/*
<header>
  <Collaboration otherLabel={title} otherSrc={logoPublicUrl} />
</header>
*/

const ServiceList = styled('dl')`
  margin: 0 0 1.45rem;
  padding: 0;
  font-size: .9rem;

  & > dd {
    margin-bottom: .5rem;
  }
`

const TechnologyList = styled('ul')`
  list-style: inside circle;
  margin: 0 0 1.45rem;
  padding: 0;
  font-size: .9rem;
`

const LanguageList = styled('ol')`
  list-style: none;
  margin: 0 0 1.45rem;
`

const LanguageIndicatorCircle = styled('span')`
  border-radius: 50%;
  display: inline-block;
  height: 0.5rem;
  position: relative;
  top: 0px;
  width: 0.5rem;
  margin-right: 0.75rem;
`

const LanguageIndicatorWrapper = styled('span')`
  color: #586069;
  font-size: .75rem;
  margin-top: auto;
`

function LanguageIndicator({ name, color = languages[name].color }: { name: string, color?: string }): JSX.Element {
  return (
    <LanguageIndicatorWrapper title={`Programming language: ${name}`}>
      <LanguageIndicatorCircle
        style={{
          backgroundColor: color
        }} />
      {name}
    </LanguageIndicatorWrapper>
  )
}

function ServiceIndicator({ service, name = services[service].name, href = services[service].url, provides = services[service].provides }: { service: string, name?: string, href?: string, provides?: string }): JSX.Element {
  return (
    <>
      <dt>
        <a rel="noopener noreferer" href={href}>
          {name}
        </a>
      </dt>
      <dd>{provides}</dd>
    </>
  )
}

const BackLinkCss = css`
  display: block;
  line-height: 24px;
  text-decoration: none;
  margin-top: 2rem;
`

const BackLinkIcon = styled('svg')`
  vertical-align: bottom;
  margin-right: 4px;

  fill: currentColor;
`

function Languages({ languages }: { languages: string[] }): JSX.Element | null {
  if (!languages || languages.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Languages</AsideHeading>
      <AsideCaption>We've used these programming languages.</AsideCaption>
      <LanguageList>
        {languages.map((lang): JSX.Element => (<li key={lang}><LanguageIndicator name={lang} /></li>))}
      </LanguageList>
    </>
  )
}

function Technologies({ technologies }: { technologies: string[] }): JSX.Element | null {
  if (!technologies || technologies.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Technologies</AsideHeading>
      <AsideCaption>We've used these tools and technologies.</AsideCaption>
      <TechnologyList>
        {technologies.map((technology): JSX.Element => (<li key={technology}>{technology}</li>))}
      </TechnologyList>
    </>
  )
}

function Services({ services }: { services: string[] }): JSX.Element | null {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Services</AsideHeading>
      <AsideCaption>We've used these used these services.</AsideCaption>
      <ServiceList>
        {services.map((service): JSX.Element => (<ServiceIndicator service={service} key={service} />))}
      </ServiceList>
    </>
  )
}

function Components({ components }: { components: string[] }): JSX.Element | null {
  if (!components || components.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Components</AsideHeading>
      <AsideCaption>We've built and delivered these components.</AsideCaption>
      <TechnologyList>
        {components.map((component): JSX.Element => (<li key={component}>{component}</li>))}
      </TechnologyList>
    </>
  )
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: TemplateProps): JSX.Element {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter: { title, keywords, description, isoDate, logo, ...aside }, html } = markdownRemark
  const { languages, services, technologies, components } = aside
  return (
    <Layout>
      <SEO
        title={`Case Study: ${title}`}
        description={description}
        keywords={keywords} />

      <Link to="/" aria-label="Back to home" css={BackLinkCss}>
        <BackLinkIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </BackLinkIcon>

        Back to home
      </Link>

      <Article>
        <Header>
          <Heading>Case Study: {title}</Heading>
          <Meta>Last update: <time dateTime={isoDate}>{new Date(isoDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric' })}</time></Meta>
        </Header>
        <Content
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <Aside>
          <Languages languages={languages} />
          <Components components={components} />
          <Technologies technologies={technologies} />
          <Services services={services} />
        </Aside>

      </Article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        isoDate: date(formatString: "YYYY-MM-DD")
        path
        title
        description
        keywords
        logo {
          publicURL
          childImageSharp {
            fluid(maxWidth: 300, maxHeight:300) {
              src
            }
          }
        }
        technologies
        services
        languages
        components
      }
      timeToRead
    }
  }
`
