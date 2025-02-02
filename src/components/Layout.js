import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useStaticQuery, graphql } from 'gatsby'

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "vlcextreme-logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 200
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90 
          )
        }
      }
    }
  `)

  return (
    <div className="min-h-screen flex flex-col bg-carbon-black">
      <Header logo={data.logo.childImageSharp.gatsbyImageData} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}