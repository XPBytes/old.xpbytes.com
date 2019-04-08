import React from 'react'
import { Logo } from './logo';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeroProps {
}

export const Hero: React.SFC<HeroProps> = (): JSX.Element => {
  return (
    <header>
      <Logo />
    </header>
  )
}
