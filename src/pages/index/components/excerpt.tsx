import React from 'react'
import { Link } from "gatsby"
import { DetailsDialog } from '../../../components/details-popup'
import { Box, BoxBody, BoxFooter, BoxHeader } from '../../../components/box'
import styled from '@emotion/styled';
import { Button } from '../../../components/button';

interface ExcerptProps {
  noop?: never
}

const Abbr = styled('abbr')`
  border-bottom: 1px dotted #FE3E80;
  cursor: help;
  text-decoration: none;
`

const AbbrSummary = ({ title, text }: { title: string, text: string }) => () => (
  <Abbr title={title}>{text}</Abbr>
)

const YouSummary = AbbrSummary({
  title: 'You can be a startup, a company side-project, an individual, a non-profit organisation or something else', text: 'you'
})
const YourSoftwareSummary = AbbrSummary({
  title: 'such as web-applications, custom content management systems, specialised APIs, native mobile applications or something else', text: 'your software'
})
const YourCurrentStackSummary = AbbrSummary({
  title: 'with preference for Ruby/Rails, .NET without ASP.NET, JAM without Angular and Node.JS with TypeScript', text: 'current stack'
})
const YourCurrentStatusSummary = AbbrSummary({
  title: 'greenfield, tech demo, minimal viable product, currently in production or legacy', text: 'current status'
})
const FreelySummary = AbbrSummary({
  title: 'MIT-license, unless otherwise specified', text: 'freely*'
})

const YouDetails = () => (
  <Box role="dialog">
    <BoxBody>
      <h2>Define: you</h2>
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
      <ul>
        <li><Link to="/case-studies/trailervote">A startup</Link></li>
        <li><Link to="/case-studies/blackgate">A company side-project</Link></li>
        <li><Link to="/case-studies/saxomania">An individual</Link></li>
        <li><Link to="/case-studies/unicef">A non-profit organisation</Link></li>
        <li><Link to="/case-studies/intreeweek">A university</Link></li>
      </ul>
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const YourSoftwareDetails = () => (
  <Box role="dialog">
    <BoxBody>
      <h2>Define: your software</h2>
      <p>
        You can be anything, such as web-applications, custom content management
        systems, specialised APIs, native mobile applications or something else.
      </p>

      <h3>Case Studies</h3>
      <p>
        At XPBytes we've build different types of software, each with their own
        required domain knowledge, requiring expertise across the board.
      </p>
      <ul>
        <li><Link to="/case-studies/trailervote">An SDK to recognise Trailers</Link></li>
        <li><Link to="/case-studies/blackgate">A tool to design VOIP recipes</Link></li>
        <li><Link to="/case-studies/saxomania">A platform using musical instruments to control in-game characters</Link></li>
        <li><Link to="/case-studies/unicef">A live tournament including raking and voting</Link></li>
        <li><Link to="/case-studies/intreeweek">A university introductory week app compagnion</Link></li>
      </ul>
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const YourCurrentStatusDetails = () => (
  <Box role="dialog">
    <BoxBody>
      <h2>Define: current status</h2>
      <p>
        The software you want use to realise may be a new, greenfield project,
        may exist as a tech demo, may have passed as a minimal viable product,
        may currently be in production or even be a legacy project.
      </p>

      <h3>Case Studies</h3>
      <p>
        At XP Bytes we've encountered clients that had not written or paid for a
        single line of code, as well as those which had software that was
        already used each and every day.
      </p>
      <ul>
        <li><Link to="/case-studies/trailervote">A complete architecture failing their MVP</Link></li>
        <li><Link to="/case-studies/blackgate">A legacy system in need of a greenfield layer</Link></li>
        <li><Link to="/case-studies/saxomania">A tech demo to MVP project</Link></li>
        <li><Link to="/case-studies/unicef">A production application in need of scaling</Link></li>
        <li><Link to="/case-studies/intreeweek">A greenfield mobile application</Link></li>
      </ul>
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const YourCurrentStackDetails = () => (
  <Box role="dialog">
    <BoxBody>
    <h2>Define: current stack</h2>
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
      <ul>
        <li>Ruby with or without Ruby on Rails</li>
        <li>.NET, but preferably without ASP.NET</li>
        <li>JAM stacks, without Angular</li>
        <li>Node.JS with TypeScript</li>
      </ul>
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const FreelyDetails = () => (
  <Box role="dialog">
    <BoxBody>
      <p>All our packages are freely available under the MIT-license, unless otherwise specified.</p>
    </BoxBody>
    <BoxFooter>
      <Button type="button" data-close-dialog="">Close</Button>
    </BoxFooter>
  </Box>
)

const Paragraph = styled('div')`
  margin-bottom: 1.45rem;
`

export const Excerpt: React.SFC<ExcerptProps> = (): JSX.Element => {
  return (
    <section>
      <Paragraph>
        We help <DetailsDialog renderDetails={YouDetails} renderSummary={YouSummary} /> realise <DetailsDialog renderDetails={YourSoftwareDetails} renderSummary={YourSoftwareSummary} />,
        regardless of the <DetailsDialog renderDetails={YourCurrentStatusDetails} renderSummary={YourCurrentStatusSummary} /> or <DetailsDialog renderDetails={YourCurrentStackDetails} renderSummary={YourCurrentStackSummary} />.
      </Paragraph>
      <Paragraph>
        Additionally, we give back to the community by maintaining several open-source software projects, which you may
        use <DetailsDialog renderDetails={FreelyDetails} renderSummary={FreelySummary} />, and which we also use to shorten your
        development time, whilst using battle-tested, quality components, meaning you'll get more bang for your buck.
      </Paragraph>
    </section>
  )
}

// make gatsby build happy
export default Excerpt
