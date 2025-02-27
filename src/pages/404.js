import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const NotFoundPage = ({ data }) => {
  const unpluggedImage = getImage(data.unplugged)

  return (
    <Layout>
      {/* Background Image */}
      <div className="relative w-full h-screen flex items-center justify-center text-center">
        <GatsbyImage
          image={unpluggedImage}
          alt="Ordenador desenchufado"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        {/* Content Box */}
        <div className="relative z-10 bg-carbon-black/80 p-10 rounded-lg shadow-lg max-w-lg">
          <h1 className="text-5xl font-bold text-neon-cyan mb-4">404 No Existe</h1>
          <p className="text-lg text-light-gray mb-6">
            Lo sentimos, en esta clavija no hay corriente...
          </p>
          <Link to="/" className="bg-neon-cyan text-carbon-black px-6 py-3 rounded-md font-bold text-lg shadow-md transition-all hover:bg-[#00A4C4]">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    unplugged: file(relativePath: { eq: "pagina-no-existe.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP])
      }
    }
  }
`

export const Head = () => (
  <Seo title="404 No Existe | VLCExtreme" />
)

export default NotFoundPage
