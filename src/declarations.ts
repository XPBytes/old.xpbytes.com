// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace JSX {
  interface IntrinsicElements {
    "details-dialog": { children: React.ReactNode }
  }
}

declare module 'gatsby-plugin-dark-mode' {
  export const ThemeToggler: React.SFC<{ children: (renderProps: { theme: 'dark' | 'light', toggleTheme: (theme: 'light' | 'dark') => void}) => JSX.Element }>

}
