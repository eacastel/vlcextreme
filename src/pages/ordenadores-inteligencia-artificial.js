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
      {/* ✅ Optimized SEO */}
      <Seo
        title="Ordenadores IA para Machine Learning y Deep Learning | VLCExtreme"
        description="Descubre nuestras Ordenadores pare Inteligencia Artificial con GPUs NVIDIA H100 y AMD Threadripper. Diseñadas para Machine Learning, Data Science y entrenamiento de modelos de IA."
        image="/og-pc-ia.png"
        pathname="/ordenadores-inteligencia-artificial"
      />

      {/* 🔹 Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-labelledby="ai-workstations-hero-title">
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage
              image={heroImage}
              alt="Ordenador IA de alto rendimiento con múltiples GPUs NVIDIA y refrigeración líquida avanzada"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-carbon-black/80" />

        <div className="container mx-auto px-4 relative text-center z-10">
          <h1 id="ai-workstations-hero-title" className="text-4xl md:text-6xl font-bold text-light-gray mb-6">
            Ordenadores IA para Machine Learning y Deep Learning
          </h1>
          <p className="text-xl text-medium-gray max-w-2xl mx-auto mb-8">
            <span className='font-bold'>Ordenadores de alto rendimiento diseñados para IA, Data Science y simulaciones avanzadas</span>.  GPUs de última generación, refrigeración extrema y estabilidad garantizada.
          </p>
          <Button to="/configuraciones?category=ai" color="neoncyan">
            Encuentra tu Ordenador IA
          </Button>
        </div>
      </section>

      {/* 🔹 Why AI Workstations? */}
      <section className="py-20 bg-dark-gray" aria-labelledby="why-ai-workstations">
        <div className="container mx-auto px-4">
          <h2 id="why-ai-workstations" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Máximo Poder para Inteligencia Artificial y Ciencia de Datos
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <GatsbyImage 
                image={comparisonImage} 
                alt="Centro de Investigación y ciencia de modelaje de Inteligencia Artificial" 
                className="rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <p className="text-medium-gray text-lg">
                En <span className='font-bold'>VLCExtreme</span>, fabricamos <span className='font-bold'>ordenadores para IA personalizadas</span> para proyectos de Machine Learning, Data Science y entrenamiento de modelos de inteligencia artificial.
              </p>
              <ul className="list-disc pl-6 text-medium-gray space-y-2">
                <li><span className='font-bold'>GPUs NVIDIA H100 y RTX 6000</span> para entrenamiento acelerado.</li>
                <li><span className='font-bold'>Optimización extrema</span> para TensorFlow, PyTorch y CUDA.</li>
                <li><span className='font-bold'>Refrigeración avanzada</span>: aire de alto flujo o sistemas líquidos custom.</li>
                <li><span className='font-bold'>Máxima estabilidad</span> para cargas de trabajo críticas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 AI Workstation Builds Showcase */}
      <section className="py-20 bg-carbon-black" aria-labelledby="ai-workstation-builds">
        <div className="container mx-auto px-4">
          <h2 id="ai-workstation-builds" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Elige tu Ordenador IA
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
