import React from 'react'
import { Link } from "gatsby"
import { DetailsDialog } from '../details-popup'
import { Box, BoxBody, BoxFooter, BoxHeader, BoxHeaderHeading } from '../box'
import styled from '@emotion/styled';
import { Button } from '../button';

interface ExcerptProps {
  noop?: never
}

const Abbr = styled('abbr')`
  border-bottom: 1px dotted #FE3E80;
  cursor: help;
  text-decoration: none;

  body.dark & {
    border-bottom-color: #8158f5;
  }
`

interface MakeAbbrSummaryProps { title: string, text: string }

function makeAbbrSummary({ title, text }: MakeAbbrSummaryProps): () => JSX.Element {
  return (): JSX.Element => <Abbr title={title}>{text}</Abbr>
}

const YouSummary = makeAbbrSummary({
  title: 'You can be a startup, a company side-project, an individual, a non-profit organisation or something else',
  text: 'you'
})
const YourSoftwareSummary = makeAbbrSummary({
  title: 'such as web-applications, custom content management systems, specialised APIs, native mobile applications or something else',
  text: 'your software'
})
const YourCurrentStackSummary = makeAbbrSummary({
  title: 'with preference for Ruby/Rails, .NET without ASP.NET, JAM without Angular and Node.JS with TypeScript',
  text: 'current stack'
})
const YourCurrentStatusSummary = makeAbbrSummary({
  title: 'greenfield, tech demo, minimal viable product, currently in production or legacy',
  text: 'current status'
})
const FreelySummary = makeAbbrSummary({
  title: 'MIT-license, unless otherwise specified',
  text: 'freely*'
})

const LinkList = styled('ul')`
  margin-left: 0;
  padding-left: 0;
  list-style-position: inside;
  list-style-type: circle;
`

const YouDetails = (): JSX.Element => (
  <Box role="dialog">
    <BoxHeader>
      <BoxHeaderHeading>Define: you</BoxHeaderHeading>
    </BoxHeader>
    <BoxBody>
      <p>
        You can be a startup, a company side-project, an individual, a
        non-profit organisation or something else.
      </p>

      <h3>Case Studies</h3>
      <p>
        At XPBytes we have (had) all types of clients and partners. Our B2B
        solutions are as scalable as our B2C solutions. It doesn't matter if
        you're an individual or established enterprise, you always get quality
        results.
      </p>
      <LinkList>
        <li><Link to="/case-studies/trailervote/">A startup</Link></li>
        <li><Link to="/case-studies/blackgate/">A company side-project</Link></li>
        <li><Link to="/case-studies/saxomania/">An individual</Link></li>
        <li><Link to="/case-studies/unicef/">A non-profit organisation</Link></li>
        <li><Link to="/case-studies/intreeweek/">A university</Link></li>
      </LinkList>
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const YourSoftwareDetails = (): JSX.Element => (
  <Box role="dialog">
    <BoxHeader>
      <BoxHeaderHeading>Define: your software</BoxHeaderHeading>
    </BoxHeader>
    <BoxBody>
      <p>
        You can be anything, such as web-applications, custom content management
        systems, specialised APIs, native mobile applications or something else.
      </p>

      <h3>Case Studies</h3>
      <p>
        We're not shy about trying something new; we're not limited to a
        specific outcome. We'll help you realise your software, regardless of
        what that may be.
      </p>
      <LinkList>
        <li><Link to="/case-studies/trailervote/">An SDK to recognise Trailers</Link></li>
        <li><Link to="/case-studies/blackgate/">A CMS to control VOIP</Link></li>
        <li><Link to="/case-studies/saxomania/">A game with a musical instrument controller</Link></li>
        <li><Link to="/case-studies/unicef/">A live tournament with ranking &amp; voting</Link></li>
        <li><Link to="/case-studies/intreeweek/">A university introduction compagnion</Link></li>
      </LinkList>
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const YourCurrentStatusDetails = (): JSX.Element => (
  <Box role="dialog">
    <BoxHeader>
      <BoxHeaderHeading>Define: current status</BoxHeaderHeading>
    </BoxHeader>
    <BoxBody>
      <p>
        The software you want use to realise may be a new, greenfield project,
        may exist as a tech demo, may have passed as a minimal viable product,
        may currently be in production or even be a legacy project.
      </p>

      <h3>Case Studies</h3>
      <p>
        At XP Bytes we've encountered clients that had not yet written a single
        line of code, as well as those with software that was already in
        production and used daily.
      </p>
      <LinkList>
        <li><Link to="/case-studies/trailervote/">A project from tech demo to production</Link></li>
        <li><Link to="/case-studies/blackgate/">A legacy system in need of a greenfield layer</Link></li>
        <li><Link to="/case-studies/saxomania/">A project from tech demo to MVP</Link></li>
        <li><Link to="/case-studies/unicef/">A production application in need of scaling</Link></li>
        <li><Link to="/case-studies/intreeweek/">A greenfield application</Link></li>
      </LinkList>
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const YourCurrentStackDetails = (): JSX.Element => (
  <Box role="dialog">
    <BoxHeader>
      <BoxHeaderHeading>Define: current stack</BoxHeaderHeading>
    </BoxHeader>
    <BoxBody>
      <p>
        If your software already exists, or if you have certain requirements
        because the software must be integrated in an existing eco-system, you
        should not be worried. Because of the multi-disciplinary nature of those
        working at XP Bytes, most stacks will not be an issue.
      </p>

      <h3>Preference</h3>
      <p>
        Naturally, many have their favourite languages and technologies to work
        with. At XP Bytes there is a slight preference for the following:
      </p>
      <LinkList>
        <li>Ruby with or without Ruby on Rails</li>
        <li>.NET, but preferably without ASP.NET</li>
        <li>JAM stacks, without Angular</li>
        <li>Node.JS with TypeScript</li>
      </LinkList>
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const FreelyDetails = (): JSX.Element => (
  <Box role="dialog">
    <BoxBody>
      All our packages are freely available under the MIT-license, unless otherwise specified.
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const Paragraph = styled('div')`
  margin-bottom: 1.45rem;
`

const Section = styled('section')`
  margin-bottom: 2.9rem;
`

export const Excerpt: React.SFC<ExcerptProps> = (): JSX.Element => {
  return (
    <Section>
      <Paragraph>
        We help <DetailsDialog renderDetails={YouDetails} renderSummary={YouSummary} /> realise <DetailsDialog renderDetails={YourSoftwareDetails} renderSummary={YourSoftwareSummary} />,
        regardless of the <DetailsDialog renderDetails={YourCurrentStatusDetails} renderSummary={YourCurrentStatusSummary} /> or <DetailsDialog renderDetails={YourCurrentStackDetails} renderSummary={YourCurrentStackSummary} />.
      </Paragraph>
      <Paragraph>
        Additionally, we give back to the community by maintaining several open-source software projects, which you may
        use <DetailsDialog renderDetails={FreelyDetails} renderSummary={FreelySummary} />, and which we also use to shorten your
        development time, whilst using battle-tested, quality components, meaning you'll get more bang for your buck.
      </Paragraph>
    </Section>
  )
}

// make gatsby build happy
export default Excerpt
