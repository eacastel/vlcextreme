import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Product from '../components/Product'

const PurchasePage = ({ data }) => {
  const backgroundImage = data.configureBg?.childImageSharp?.gatsbyImageData

  return (
    <Layout>
      <Seo 
        title="Elige tu PC a Medida | VLCExtreme"
        description="Configura tu PC personalizado con componentes de última generación para gaming, producción o IA."
      />

      {/* 🔹 Background Image & Overlay */}
      <div className="relative min-h-screen">
        {backgroundImage && (
          <GatsbyImage
            image={backgroundImage}
            alt="Fondo configurador VLCExtreme"
            className="absolute inset-0 w-full h-full"
            style={{
              position: "absolute",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
        <div className="absolute inset-0 bg-carbon-black/80" />
        {/* 🔹 Page Content */}
        <div className="container mx-auto px-4 relative z-10 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-light-gray mb-4">
              Elige tu PC de Alto Rendimiento
            </h1>
            <p className="text-lg text-medium-gray max-w-2xl mx-auto">
              Elige el ordenador perfecto según tu uso o personaliza cada aspecto de tu equipo con nuestra herramienta de configuración inteligente.
            </p>
          </div>
          {/* 🔹 Integrated Multi-Step Form */}
          <Product />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ConfigurePageQuery {
    configureBg: file(relativePath: { eq: "vlcextreme-configure-bg.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1920
          formats: [WEBP]
          placeholder: DOMINANT_COLOR
          quality: 90
        )
      }
    }
  }
`


export default PurchasePage
