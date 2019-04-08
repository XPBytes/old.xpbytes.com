import React from 'react'
import { css } from '@emotion/core'

export interface DetailsProps {
  renderSummary: () => JSX.Element
  renderDetails: () => JSX.Element
}

const DetailsCSS = css`
  &:focus, & > summary:focus, & > details-dialog:focus {
    outline-color: #FE3E80;
    outline-style: solid;
    outline-width: 1px;
    outline-offset: 1px;
  }

  & > details-dialog:focus {
    outline-style: auto;
  }

  display: inline-block;

  & > summary {
    list-style: none;
    user-select: none;
    appearance: none;

    &:before {
      display: none;
    }

    &::-webkit-details-marker {
      display: none;
    }
  }

  &:not([open]) {
    cursor: help;
  }

  &:not([open]) > *:not(summary) {
    display: none !important;
  }

  &[open] > summary:before {
    content: " ";
    background: rgba(0, 0, 0, 0.3);
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
  }

  & > details-dialog {
    width: 40rem;

    position: fixed;
    margin: 10vh auto;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    max-height: 80vh;
    max-width: 90vw;
  }
`
export const DetailsDialog: React.SFC<DetailsProps> = ({ renderSummary, renderDetails }): JSX.Element => {
  return (
    <details css={DetailsCSS}>
      <summary>{renderSummary()}</summary>
      <details-dialog>
        {renderDetails()}
      </details-dialog>
    </details>
  )
}
