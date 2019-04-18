/* eslint-disable @typescript-eslint/camelcase */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'XP Bytes',
    description: 'Dutch software agency specializing in custom -- tailored -- software.',
    author: '@SleeplessByte',
    company: {
      chambersOfCommerceNumber: '57500142',
      vatIdNumber: 'NL206499644B01',
      address: 'Stationsplein 45 #D2.117 (City Whoop)',
      postal: '3013 AK',
      city: 'Rotterdam'
    }
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
        classNameDark: 'dark',
        classNameLight: 'light',
        storageKey: 'dark-mode',
        minify: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'case-studies',
        path: `${__dirname}/src/case-studies`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links'
          }
        ]
      }
    },
    // 'gatsby-mdx',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
        }
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'eXPerienced Bytes',
        short_name: 'XP Bytes',
        start_url: '/',
        background_color: '#F8F7FB',
        theme_color: '#252A34',
        display: 'minimal-ui',
        icon: 'src/images/logo-colour_with_large_margin.png', // This path is relative to the root of the site.
      },
    },

    'gatsby-plugin-typescript',
    'gatsby-plugin-force-trailing-slashes',

    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        trackingUrl: 'xpbytes.usesfathom.com',
        siteId: process.env.FATHOM_SITE_ID
      }
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
}
