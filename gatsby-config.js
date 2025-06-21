require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `VLCExtreme | Ordenadores para Gaming, Producción e Inteligencia Artificial de Alta Gama`,
    description: `Descubre VLCExtreme: especialistas en ordenadores de sobremesa gaming, estaciones de trabajo IA y PC personalizados de alta gama. Potencia máxima y rendimiento sin límites.`,
    author: `@vlcextreme`,
    siteUrl: `https://vlcextreme.com`,
    image: `/og-vlcextreme-ordenadores-sobremesa-extremos.jpg`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ["auto", "webp", "png"], 
          placeholder: "dominantColor",
          quality: 90,
          breakpoints: [750, 1080, 1366, 1920],
        },
        failOn: "none",
        base64Width: 20,
        forceBase64Format: "png",
        useMozJpeg: false, 
        stripMetadata: true,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `builds`,
        path: `${__dirname}/src/images/builds`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          require(`autoprefixer`),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `VLCExtreme | Ordenadores Personalizados de Alta Gama`,
        short_name: `VLCExtreme`,
        start_url: `/`,
        lang: `es`,
        background_color: `#0D0D0D`, 
        theme_color: `#00B4D8`, 
        display: `minimal-ui`,
        icon: `src/images/favicon-512x512.png`, 
        include_favicon: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GATSBY_GOOGLE_GTAG_ID,], 
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: [],
          delayOnRouteUpdate: 2000,
        },
      },
    },    
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: "https://vlcextreme.com",
        sitemap: "https://vlcextreme.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          skipWaiting: false,
          clientsClaim: false,
        },
        precachePages: [], 
      },
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: "static",
        openAnalyzer: false,
      },
    },
  ],
}
