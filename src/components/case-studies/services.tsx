import React from 'react'
import styled from '@emotion/styled'

import { AsideHeading, AsideCaption } from '../aside'
import knownServices from '../../data/services.json'
import { ExternalLink } from '../external-link';

const ServiceList = styled('dl')`
  margin: 0 0 1.45rem;
  padding: 0;
  font-size: .9rem;

  & > dd {
    margin-bottom: .5rem;
  }
`

export function Services({ services }: { services: string[] }): JSX.Element | null {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <>
      <AsideHeading>Services</AsideHeading>
      <AsideCaption>We've used these used these services.</AsideCaption>
      <ServiceList>
        {services.map((service): JSX.Element | null => {
          if (!(service in knownServices)) {
            return null
          }

          const { name, provides, url: href } = knownServices[service as keyof typeof knownServices]
          return (
            <ServiceIndicator
              service={service}
              key={service}
              name={name}
              provides={provides}
              href={href}
            />
          )
        })}
      </ServiceList>
    </>
  )
}

function ServiceIndicator({
  service,
  name,
  href,
  provides
}: { service: string, name?: string, href?: string, provides?: string }): JSX.Element {
  return (
    <>
      <dt>
        <ExternalLink href={href || '#'}>{name}</ExternalLink>
      </dt>
      <dd>{provides}</dd>
    </>
  )
}
