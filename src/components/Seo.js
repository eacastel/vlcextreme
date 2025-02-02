import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ title, description, image, pathname, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            image
          }
        }
      }
    `
  )

  const metaTitle = title || site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  const metaImage = image ? `${site.siteMetadata.siteUrl}${image}` : `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`
  const url = `${site.siteMetadata.siteUrl}${pathname || "/"}`

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {canonical && <link rel="canonical" href={canonical} />}
      {children}
    </>
  )
}

export default Seo