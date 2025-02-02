import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import RecommendedBuilds from '../components/RecommendedBuilds'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import Process from '../components/Process'
import ContactSection from '../components/ContactSection'
import Seo from '../components/Seo'

const HomePage = ({ data }) => {
  return (
    <Layout>
      <Hero backgroundImage={data.heroImage.childImageSharp.gatsbyImageData} />
      <RecommendedBuilds />
      <WhyChoose />
      <Testimonials />
      <Process />
      <ContactSection />
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
    title="VLCExtreme | Ordenadores Personalizados de Sobremesa - Hechos a Medida"
    description="Descubre VLCExtreme: ordenadores de sobremesa personalizados y hechos a medida para gaming, streaming e inteligencia artificial. Configura el tuyo hoy."
  />
)

export default HomePage