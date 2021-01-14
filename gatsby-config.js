/* eslint-disable @typescript-eslint/camelcase */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'XP Bytes B.V.',
    description:
      'Dutch software agency specializing in custom -- tailored -- software.',
    author: '@SleeplessByte',
    company: {
      chambersOfCommerceNumber: '80993907',
      chambersOfCommerceNumberUsa: '81039131',
      vatIdNumber: '',
      vatIdNumberUsa: '',
      address1: 'Millennium Tower',
      address2: 'Weena 690 (26.15)',
      address: 'Weena 690 (26.15)',
      postal: '3012 CN',
      city: 'Rotterdam',
    },
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
        plugins: [],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/src/articles`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 700,
              showCaptions: true,
              withWebp: true,
              tracedSVG: true,
              quality: 90,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    // 'gatsby-mdx',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      },
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
        icon: 'static/images/icon.png', // This path is relative to the root of the site.
      },
    },

    'gatsby-plugin-typescript',
    'gatsby-plugin-force-trailing-slashes',

    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        trackingUrl: 'xpbytes.usesfathom.com',
        siteId: process.env.FATHOM_SITE_ID,
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    'gatsby-plugin-offline',
  ],
}
