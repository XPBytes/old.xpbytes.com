import styled from "@emotion/styled-base";

export const Button = styled('button')`
  appearance: none;
  background-color: #eff3f6;
  background-image: linear-gradient(-180deg,#fafbfc 0%,#eff3f6 90%);
  background-position: -1px -1px;
  background-repeat: repeat no-repeat;
  background-size: 110% 110%;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: .25em;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  list-style: none;
  padding: 6px 12px;
  position: relative;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  &:hover {
    background-color: #e6ebf1;
    background-image: linear-gradient(-180deg,#f0f3f6 0%,#e6ebf1 90%);
    background-position: -.5em center;
    border-color: rgba(27,31,35,.35);
    text-decoration: none;
  }
`
