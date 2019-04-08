import React from 'react'

interface ExcerptProps {
  noop?: never
}

export const Excerpt: React.SFC<ExcerptProps> = (): JSX.Element => {
  return (
    <section>
      <p>
        We help <abbr title="You can be a start-up, a company side-project, an individual, a non-profit organisation or something else">you</abbr> realise <abbr title="such as web-applications, custom content management systems, specialised APIs, native mobile applications or something else">your software</abbr>, regardless of the <abbr title="greenfield, tech demo, minimal viable product, currently in production or legacy">current status</abbr> or <abbr title="with preference for Ruby/Rails, .NET without ASP.NET, JAM without Angular and Node.JS with TypeScript">current stack</abbr>.
      </p>
      <p>
        Additionally, we give back to the community by maintaining several open-source software projects, which you may
        use freely<abbr title="MIT license, unless otherwise specified">*</abbr>, and which we also use to shorten your
        development time, whilst using battle-tested, quality components, meaning you'll get more bang for your buck.
      </p>
    </section>
  )
}

// make gatsby build happy
export default Excerpt
