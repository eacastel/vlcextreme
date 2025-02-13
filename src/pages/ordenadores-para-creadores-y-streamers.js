import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Seo from '../components/Seo'
import SelectConfigureCarouselSections from "../components/SelectConfigureCarouselSections";


const ProductionWorkstationsPage = ({ data }) => {
  const heroImage = getImage(data.hero)
  const comparisonImage = getImage(data.comparison)

  return (
    <Layout>
      {/* 🔹 SEO Metadata */}
      <Seo 
        title="Workstations para Creadores | Edición de Vídeo y Render 3D con VLCExtreme"
        description="Descubre las Workstations VLCExtreme diseñadas para edición de vídeo, modelado 3D y producción audiovisual. Rendimiento extremo sin limitaciones."
        image={data.hero.childImageSharp.gatsbyImageData.images.fallback.src}
        pathname="/creadores-extremos"
      />

      {/* 🔹 Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage
              image={heroImage}
              alt="Workstation para edición de vídeo y modelado 3D"
              className="w-full h-full"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center"
              }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-carbon-black/80" />
        
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-light-gray mb-6">
            Desata tu Creatividad sin Límites
          </h2>
          <h1 className="text-m md:text-l text-light-gray mb-1">
            Workstations para Creadores y Productores Audiovisuales
          </h1>
          <h3 className="text-xl text-medium-gray max-w-2xl mx-auto mb-8">
            Diseñadas para edición de vídeo, efectos visuales y renderizado 3D. Potencia extrema para los profesionales de la industria.
          </h3>
          <Button to="/configuraciones" color="neoncyan">
            Configura tu Workstation
          </Button>
        </div>
      </section>

      {/* 🔹 Why Custom Workstations? */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          No Hagas Esperar a Tu Creatividad: Máquinas de Producción de Alto Nivel
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <GatsbyImage image={comparisonImage} alt="Comparación entre workstations personalizadas y preensambladas" className="rounded-lg" />
            </div>
            <div className="space-y-6">
              <p className="text-medium-gray text-lg">
                En <strong>VLCExtreme</strong>, entendemos que cada proyecto creativo tiene necesidades únicas. Nuestras Workstations están optimizadas para <strong>edición de vídeo 4K/8K, efectos visuales y renderizado 3D</strong> con el mejor hardware disponible.
              </p>
              <ul className="list-disc pl-6 text-medium-gray space-y-2">
                <li><strong>Hardware de última generación</strong> (sin stock antiguo ni componentes desfasados)</li>
                <li><strong>Optimización extrema</strong> para Adobe Premiere, DaVinci Resolve, Blender y más</li>
                <li><strong>Refrigeración avanzada</strong> para sesiones de trabajo prolongadas</li>
                <li><strong>Máxima estabilidad</strong> en cargas de trabajo intensivas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-carbon-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Elige tu Workstation: Producción Audiovisual y Renderizado 3D
          </h2>
          <SelectConfigureCarouselSections category="production" />
        </div>
      </section>



    </Layout>
  )
}
/* 🔹 GraphQL Query for Workstation Images */
export const query = graphql`
  query WorkstationsPageQuery {
    hero: file(relativePath: { eq: "movie-production.png" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
  comparison: file(relativePath: { eq: "workstation-comparison.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    editingWorkstation: file(relativePath: { eq: "vlcextreme-editing-workstation.png" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    renderingWorkstation: file(relativePath: { eq: "vlcextreme-rendering-workstation.png" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
  }
`

export default ProductionWorkstationsPage
