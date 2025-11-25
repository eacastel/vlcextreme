import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SelectConfigure from '../components/SelectConfigure'

const ConfigurePage = ({ data }) => {
  const backgroundImage = data.configureBg?.childImageSharp?.gatsbyImageData

  return (
    <Layout>
      {/* ✅ Optimized SEO */}
      <Seo
        title="Encuentra tu Ordenador de Alto Rendimiento | VLCExtreme"
        description="Explora las configuraciones recomendadas de ordenadores de alto rendimiento para gaming, producción y trabajo con IA. Contáctanos para opciones personalizadas."
        image="/og-configuraciones.jpg"
        pathname="/configuraciones"
      />

      {/* 🔹 Background Image & Overlay */}
      <div className="relative min-h-screen bg-fixed bg-cover bg-center" aria-labelledby="config-page-title">
        {/* 🔹 Background Image */}
        {backgroundImage && (
          <div className="absolute inset-0 w-full h-full">
          <GatsbyImage
            image={backgroundImage}
            alt="Selección de ordenadores recomendados para gaming, IA y producción"
            className="w-full h-full object-cover"
          />
          </div>
        )}
        <div className="absolute inset-0 bg-carbon-black/80" />
        
        <div className="container mx-auto px-4 relative z-10 py-16 text-center">
          <h1 id="config-page-title" className="text-4xl md:text-5xl font-bold text-light-gray mb-4">
            Encuentra tu Ordenador de Alto Rendimiento
          </h1>
          <p className="text-lg text-medium-gray max-w-2xl mx-auto">
            Explora nuestras configuraciones recomendadas o <Link to="/contacto" className="text-neon-cyan underline">contáctanos para personalizar tu ordenador</Link> según tus necesidades.
          </p>

          {/* 🔹 Integrated Multi-Step Form */}
          <SelectConfigure />
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

export default ConfigurePage
