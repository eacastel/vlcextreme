import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import RecommendedBuilds from '../components/RecommendedBuilds'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import Process from '../components/Process'
import ContactSection from '../components/ContactSection'
import Seo from '../components/Seo'

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <RecommendedBuilds />
      <WhyChoose />
      <Testimonials />
      <Process />
      <ContactSection />
    </Layout>
  )
}

export const Head = () => (
  <Seo 
    title="VLCExtreme | Ordenadores Personalizados de Sobremesa - Hechos a Medida"
    description="Descubre VLCExtreme: ordenadores de sobremesa personalizados y hechos a medida para gaming, streaming e inteligencia artificial. Configura el tuyo hoy."
  />
)

export default HomePage