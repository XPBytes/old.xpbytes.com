import React from "react"
import { graphql, withPrefix } from "gatsby"
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { BackToHome } from '../components/back-to-home'

import { Components } from '../components/case-studies/components'
import { Languages } from '../components/case-studies/languages'
import { Services } from '../components/case-studies/services'
import { Technologies } from '../components/case-studies/technologies'

const STATIC_LOGO = withPrefix('/images/logo.png')

interface TemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        path: string
        title: string
        modifiedIsoDate: string
        publishedIsoDate: string
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
  font-size: 2rem;
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

/*
<header>
  <Collaboration otherLabel={title} otherSrc={logoPublicUrl} />
</header>
*/

const Description = styled('blockquote')`
  border-left: 2px dashed #8158f5;
  margin: 1rem;
  padding-left: 1rem;
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: TemplateProps): JSX.Element {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter: { title, keywords, description, modifiedIsoDate, publishedIsoDate, path, ...aside }, html } = markdownRemark
  const { languages, services, technologies, components } = aside
  return (
    <Layout>
      <SEO
        title={`Case Study: ${title}`}
        description={description}
        keywords={keywords}>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://xpbytes.com/case-studies/${path.split('/').slice(-1)[0]}"
            },
            "headline": "Case Study: ${title}",
            "datePublished": "${publishedIsoDate}",
            "dateModified": "${modifiedIsoDate}",
            "author": {
              "@type": "Person",
              "name": "Derk-Jan Karrenbeld"
            },
            "publisher": {
              "@type": "Organization",
              "name": "XP Bytes",
              "logo": {
                "@type": "ImageObject",
                "url": "https://xpbytes.com/${STATIC_LOGO}"
              }
            },
            "description": "${description}"
          }`}
        </script>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Case Studies",
                "item": "https://xpbytes.com/case-studies"
              },{
                "@type": "ListItem",
                "position": 2,
                "name": "${title}",
                "item": "https://xpbytes.com${path}"
              }
            ]
          }`}
        </script>
      </SEO>

      <BackToHome />

      <Article>
        <Header>
          <Heading>Case Study: {title}</Heading>
          <Meta>Last update: <time dateTime={modifiedIsoDate}>{
            new Date(modifiedIsoDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric', day: 'numeric' })
          }</time></Meta>
        </Header>

        <Description>{description}</Description>

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
        modifiedIsoDate: modified_date(formatString: "YYYY-MM-DD")
        publishedIsoDate: published_date(formatString: "YYYY-MM-DD")
        path
        title
        description
        keywords
        technologies
        services
        languages
        components
      }
      timeToRead
    }
  }
`
