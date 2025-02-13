import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Seo from '../components/Seo'
import SelectConfigureCarouselSections from "../components/SelectConfigureCarouselSections";


const WorkstationsPage = ({ data }) => {
  const heroImage = getImage(data.hero)
  const comparisonImage = getImage(data.comparison)

  return (
    <Layout>
      {/* 🔹 SEO Metadata */}
      <Seo
        title="Workstations IA Personalizadas | Potencia y Rendimiento con VLCExtreme"
        description="Descubre VLCExtreme AI Workstations: ordenadores personalizados para IA, aprendizaje automático y renderizado 3D. Máximo rendimiento, sin stock antiguo."
        image={data.hero.childImageSharp.gatsbyImageData.images.fallback.src}
        pathname="/workstations"
      />

      {/* 🔹 Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage
              image={heroImage}
              alt="Workstation IA con múltiples pantallas y renderizado"
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
          <h1 className="text-4xl md:text-6xl font-bold text-light-gray mb-6">
            Workstations IA de Alto Rendimiento
          </h1>
          <p className="text-xl text-medium-gray max-w-2xl mx-auto mb-8">
            Equipos diseñados para <strong>Machine Learning, Renderizado 3D y Simulaciones Avanzadas</strong>.
            Máxima potencia, optimización total, sin stock antiguo.
          </p>
          <Button to="/configuraciones" color="neoncyan">
            Configura tu Workstation IA
          </Button>
        </div>
      </section>

      {/* 🔹 Why Custom Workstations? */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Máximo Poder para IA: La Tecnología que Impulsa el Futuro
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <GatsbyImage image={comparisonImage} alt="Comparación entre workstations personalizadas y preensambladas" className="rounded-lg" />
            </div>
            <div className="space-y-6">
              <p className="text-medium-gray text-lg">
                No todas las Workstations están diseñadas para soportar cargas de trabajo realmente exigentes. En <strong>VLCExtreme</strong>, no solo ensamblamos equipos, sino que creamos soluciones de alto rendimiento, optimizadas para el futuro de la inteligencia artificial y la producción avanzada.
              </p>
              <ul className="list-disc pl-6 text-medium-gray space-y-2">
                <li><strong>Hardware de última generación</strong>, sin stock obsoleto, para asegurar el máximo rendimiento desde el primer día.</li>
                <li><strong>Optimización extrema</strong> enfocada en inteligencia artificial, machine learning y renderizado 3D, sin cuellos de botella.</li>
                <li><strong>Refrigeración avanzada</strong>: desde sistemas de aire de alto flujo hasta soluciones líquidas y custom para máxima eficiencia térmica.</li>
                <li><strong>Estabilidad absoluta</strong> para cargas de trabajo críticas, garantizando fiabilidad y consistencia en proyectos de alto impacto.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 🔹 AI Workstation Builds Showcase */}
      <section className="py-20 bg-carbon-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Elige tu Workstation IA
          </h2>
          <SelectConfigureCarouselSections category="ai" />
        </div>

      </section>
    </Layout>
  )
}

/* 🔹 GraphQL Query for Workstation Images */
export const query = graphql`
  query WorkstationsPageQuery {
    hero: file(relativePath: { eq: "workstations-hero.png" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    comparison: file(relativePath: { eq: "ai-lab.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    aiWorkstation: file(relativePath: { eq: "vlcextreme-ai-ultra-dual-rtx-4090-256gb.webp" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    aiUltra: file(relativePath: { eq: "vlcextreme-ai-workstation-threadripper-128gb.webp" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
  }
`

export default WorkstationsPage
