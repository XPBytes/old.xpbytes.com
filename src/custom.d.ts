declare module JSX {
  interface IntrinsicElements {
    "details-dialog": { children: any }
  }
}

declare module 'gatsby-plugin-dark-mode' {
  export const ThemeToggler: React.SFC<{ children: (renderProps: { theme: 'dark' | 'light', toggleTheme: (theme: 'light' | 'dark') => void}) => JSX.Element }>

}
