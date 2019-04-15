import styled from "@emotion/styled"

export const Box = styled('section')`
  background-color: #fff;
  border: 1px solid #d1d5da;
  border-radius: 3px;

  body.dark & {
    background-color: #04000d;
    border-color: #252a34;
  }
`
export const BoxHeader = styled('header')`
  background-color: #f6f8fa;
  border: 1px solid #d1d5da;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  box-sizing: border-box;
  margin: -1px -1px 0;
  padding: 16px;

  body.dark & {
    background-color: #835af6;
    border-color: #252a34;
  }
`

export const BoxHeaderHeading = styled('h2')`
  margin-bottom: 0;
`
export const BoxBody = styled('div')`
  box-sizing: border-box;
  overflow: auto;
  padding: 16px;
`
export const BoxFooter = styled('footer')`
  border-top: 1px solid #e1e4e8;
  box-sizing: border-box;
  margin-top: -1px;
  padding: 16px;

  body.dark & {
    border-color: #252a34;
  }
`
