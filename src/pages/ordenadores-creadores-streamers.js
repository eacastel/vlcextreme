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
      {/* ✅ Optimized SEO */}
      <Seo
        title="Workstations para Creadores 8K y Streaming Profesional | VLCExtreme"
        description="Workstations para creadores de contenido y streamers en Valencia con GPU RTX 5090. Equipos optimizados para edición 4K/8K, efectos visuales, producción musical y renderizado 3D con máxima estabilidad."
        image="/og-pc-creadores.jpg"
        pathname="/ordenadores-creadores-streamers"
      />

      {/* 🔹 Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-labelledby="workstations-hero-title">
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage
              image={heroImage}
              alt="Ordenador de alta gama para edición de vídeo y renderizado 3D, con monitores 4K y sistema de refrigeración avanzada"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-carbon-black/80" />

        <div className="container mx-auto px-4 relative text-center z-10">
          <h1 id="workstations-hero-title" className="text-4xl md:text-6xl font-bold text-light-gray mb-6">
            Workstations Profesionales para Creadores de Contenido y Streaming 8K
          </h1>
          <p className="text-xl text-medium-gray max-w-2xl mx-auto mb-8">
            Ordenadores de alto rendimiento diseñados para la <span className='font-bold'>edición de vídeo, modelado 3D y efectos visuales</span> con el mejor hardware del mercado.
          </p>
          <Button to="/configuraciones?category=production" color="neoncyan">
            Encuentra tu Ordenador
          </Button>
        </div>
      </section>

      {/* 🔹 Why Custom Workstations? */}
      <section className="py-20 bg-dark-gray" aria-labelledby="why-custom-workstations">
        <div className="container mx-auto px-4">
          <h2 id="why-custom-workstations" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-8">
            Producción Audiovisual sin Límites con Hardware de Alto Rendimiento
          </h2>

          <p className="text-center text-medium-gray text-xl max-w-6xl mx-auto mt-4 mb-10">
            Descubre nuestras estaciones de trabajo configuradas a medida para creadores exigentes, con refrigeración líquida, almacenamiento ultra rápido y GPUs profesionales como la RTX 5090 o la NVIDIA RTX 6000.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <GatsbyImage
                image={comparisonImage}
                alt="Ordenador personalizado para edición de vídeo, producción musical y streaming profesional"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <p className="text-medium-gray text-lg">
                En <strong>VLCExtreme</strong>, entendemos que cada proyecto creativo tiene necesidades únicas. Nuestror Ordenadores están diseñadas y optimizadas para la eficiente <strong>edición de vídeo 4K/8K, efectos visuales y renderizado 3D</strong> con el mejor hardware disponible.
              </p>
              <ul className="list-disc pl-6 text-medium-gray space-y-2">
                <li><strong>Procesadores de última generación</strong> Intel y AMD Threadripper PRO.</li>
                <li><strong>Optimización extrema</strong> para Adobe Premiere, DaVinci Resolve, Blender y más.</li>
                <li><strong>GPUs NVIDIA RTX 6000</strong> para renderizado en tiempo real.</li>
                <li><strong>Refrigeración avanzada</strong> para sesiones de trabajo prolongadas.</li>
                <li><strong>Máxima estabilidad</strong> en cargas de trabajo intensivas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Workstation Builds Showcase */}
      <section className="py-20 bg-carbon-black" aria-labelledby="workstation-builds">
        <div className="container mx-auto px-4">
          <h2 id="workstation-builds" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Elige tu Ordenador: Producción Audiovisual y Renderizado 3D
          </h2>
          </div>
          <div className="w-full">
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
