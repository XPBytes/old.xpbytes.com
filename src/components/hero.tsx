import React from 'react'
import { Logo } from './logo';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeroProps {
  theme: 'light' | 'dark'
}

export const Hero: React.SFC<HeroProps> = ({ theme }): JSX.Element => {
  return (
    <header>
      <Logo theme={theme} />
    </header>
  )
}
