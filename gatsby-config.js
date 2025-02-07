require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `VLCExtreme | Ordenadores Personalizados de Sobremesa - Hechos a Medida`,
    description: `Descubre VLCExtreme: ordenadores de sobremesa personalizados y hechos a medida para gaming, streaming e inteligencia artificial. Configura el tuyo hoy.`,
    author: `@vlcextreme`,
    siteUrl: `https://vlcextreme.com`,
    image: `/og-vlcextreme-ensamblaje-ordenadores-sobremesa.png`
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
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`),
          require(`autoprefixer`),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {},
        mergeSecurityHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `VLCExtreme | Ordenadores Personalizados`,
        short_name: `VLCExtreme`,
        start_url: `/`,
        background_color: `#0D0D0D`, 
        theme_color: `#00B4D8`, 
        display: `minimal-ui`,
        icon: `src/images/vlc-square-for-manifest.png`, 
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GATSBY_GOOGLE_GTAG_ID], 
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true, 
          respectDNT: true,
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },    
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    `gatsby-plugin-offline`,
  ],
}
