import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import SelectConfigureCarousel  from '../components/SelectConfigureCarousel'
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
      <h3 className="text-4xl font-bold text-neon-cyan text-center mb-8">
          Contáctanos
        </h3>

        <p className="text-medium-gray text-center max-w-2xl mx-auto mb-12">
          ¿Tienes dudas sobre nuestros ordenadores personalizados?  
          Envíanos un mensaje y te responderemos lo antes posible.
        </p>
      <ContactForm />
      </div>
    </Layout>
  )
}

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

export const Head = () => (
  <Seo
    title="VLCExtreme: Ordenadores de Gama Alta en Valencia | Gaming, Creación y IA"
    description="Descubre ordenadores de alto rendimiento hechos a medida en Valencia. Soluciones premium para Gamers, Creadores de Contenido y Profesionales de IA."
  />
)

export default HomePage