import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Seo from '../components/Seo'

const WorkstationsPage = ({ data }) => {
  const heroImage = getImage(data.hero)
  const comparisonImage = getImage(data.comparison)
  const aiWorkstation = getImage(data.aiWorkstation)
  const aiUltra = getImage(data.aiUltra)

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
        <GatsbyImage image={heroImage} alt="Workstation IA con múltiples pantallas y renderizado" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-carbon-black/80" />
        
        <div className="container mx-auto px-4 relative text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-light-gray mb-6">
            Workstations IA de Alto Rendimiento
          </h1>
          <p className="text-xl text-medium-gray max-w-2xl mx-auto mb-8">
            Equipos diseñados para <strong>Machine Learning, Renderizado 3D y Simulaciones Avanzadas</strong>.  
            Máxima potencia, optimización total, sin stock antiguo.
          </p>
          <Button to="/configure" color="neoncyan">
            Configura tu Workstation IA
          </Button>
        </div>
      </section>

      {/* 🔹 Why Custom Workstations? */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            ¿Por qué elegir una Workstation Personalizada?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <GatsbyImage image={comparisonImage} alt="Comparación entre workstations personalizadas y preensambladas" className="rounded-lg" />
            </div>
            <div className="space-y-6">
              <p className="text-medium-gray text-lg">
                No todas las Workstations están preparadas para cargas de trabajo exigentes. En <strong>VLCExtreme</strong>, creamos equipos con la mejor refrigeración, estabilidad y capacidad de expansión.
              </p>
              <ul className="list-disc pl-6 text-medium-gray space-y-2">
                <li><strong>Hardware de última generación</strong> (sin stock antiguo)</li>
                <li><strong>Optimización extrema</strong> para IA y renderizado 3D</li>
                <li><strong>Refrigeración avanzada</strong> (aire, líquida o custom)</li>
                <li><strong>Máxima estabilidad</strong> en tareas de alto rendimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 AI Workstation Builds Showcase */}
      <section className="py-20 bg-carbon-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Elige tu Workstation IA Extrema
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'VLCExtreme AI Workstation', specs: 'RTX 4090 / 2x RTX 4080, Threadripper PRO 5975WX, 128GB RAM', price: 'Desde 12.000€', image: aiWorkstation },
              { name: 'VLCExtreme AI Ultra', specs: '2x RTX 4090, Threadripper 5995WX, 256GB RAM', price: 'Desde 20.000€', image: aiUltra },
            ].map((build, index) => (
              <div key={index} className="group relative bg-dark-gray rounded-lg p-6 border border-dark-gray hover:border-neon-cyan transition-all">
                <GatsbyImage image={build.image} alt={build.name} className="rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-light-gray mb-2">{build.name}</h3>
                <p className="text-medium-gray mb-4">{build.specs}</p>
                <div className="flex justify-between items-center">
                  <span className="text-neon-cyan font-bold">{build.price}</span>
                  <Button to="/configure" size="sm" variant="outline">
                    Ver Configuración
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
    comparison: file(relativePath: { eq: "vlcextreme-ai-ultra-dual-rtx-4090-256gb.webp" }) {
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
