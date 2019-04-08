import React from 'react'
import styled from "@emotion/styled"

const Wrapper = styled('div')`
  background: #252A34;
  color: white;
`

const Inner = styled('footer')`
  margin: 0 auto;
  padding: 2rem 20px 32px;
  max-width: 1020px;
`

export interface FooterProps {
  chambersOfCommerceNumber: string
  vatIdNumber: string
}

export function Footer({ chambersOfCommerceNumber, vatIdNumber }: FooterProps) {
  return (
    <Wrapper>
      <Inner>
        <dl>
          <dt>Address</dt>
          <dd>
            <address>
              Stationsplein 45 #D2.117 (City Whoop)<br />
              3013 AK, Rotterdam
            </address>
          </dd>

          <dt>Chambers of Commerce</dt>
          <dd>{chambersOfCommerceNumber}</dd>

          <dt>VAT identification number</dt>
          <dd>{vatIdNumber}</dd>
        </dl>

        <span>
          XP Bytes operates in collaboration with Delft Solutions and Things Implied.
          © 2002 - {new Date().getFullYear()}
        </span>
      </Inner>
    </Wrapper>
  )
}
