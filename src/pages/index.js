import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import SelectConfigureCarousel from '../components/SelectConfigureCarousel'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import Process from '../components/Process'
import Seo from '../components/Seo'
import ContactForm from '../components/ContactForm'

const HomePage = ({ data }) => {
  return (
    <Layout>
      <Hero backgroundImage={data.heroImage.childImageSharp.gatsbyImageData} />
      <SelectConfigureCarousel />
      <WhyChoose />
      <Testimonials />
      <Process />

      <div className='p-8'>
      <h2 id="vlcextreme-process-title" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          Contáctanos
        </h2>
        <p className="text-medium-gray text-center max-w-2xl mx-auto mb-12">
          ¿Tienes dudas sobre nuestros ordenadores personalizados?  
          Envíanos un mensaje y te responderemos lo antes posible.
        </p>
        <ContactForm />
      </div>
    </Layout>
  )
}

// ✅ GraphQL Query for Hero Image
export const query = graphql`
  query HomePageQuery {
    heroImage: file(relativePath: { eq: "hero-bg.webp" }) {
      childImageSharp {
        gatsbyImageData(
          layout: FULL_WIDTH
          formats: [WEBP, PNG]
          quality: 90
          placeholder: BLURRED
        )
      }
    }
  }
`

export const Head = () => {
  return (
    <>
      <Seo
        title="VLCExtreme: Ordenadores de Gama Alta en Valencia | Gaming, Creadores y IA"
        description="Ordenadores de alto rendimiento ensamblados por expertos en Valencia. PCs gaming de alta gama, estaciones de trabajo IA y soluciones para creadores de contenido."
        pathname="/"
        image="/og-vlcextreme-ensamblaje-ordenadores-sobremesa.png"
      />
    </>
  )
}

export default HomePage
