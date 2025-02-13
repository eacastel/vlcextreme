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
  const siteUrl = "https://vlcextreme.com"

  return (
    <>
      <Seo
        title="VLCExtreme: Ordenadores de Gama Alta en Valencia | Gaming, Creación y IA"
        description="Descubre ordenadores de alto rendimiento hechos a medida en Valencia. Soluciones premium para Gamers, Creadores de Contenido y Profesionales de IA."
      />
      

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          "name": "VLCExtreme",
          "description": "Ordenadores de alto rendimiento hechos a medida en Valencia. Soluciones premium para Gamers, Creadores de Contenido y Profesionales de IA.",
          "url": siteUrl, 
          "logo": `${siteUrl}/vlc-square-for-manifest-w.png`,  
          "image": `${siteUrl}/hero-bg.jpg`,  
          "priceRange": "€€€",
          "areaServed": "ES",
          "availableDeliveryMethod": "OnlineShipping",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": "3",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "reviewBody": "Mi PC gaming llegó optimizado al 100% y listo para jugar sin hacer nada más",
              "author": { "@type": "Person", "name": "Juan M." },
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            },
            {
              "@type": "Review",
              "reviewBody": "Mi estación VLCExtreme maneja grandes datasets de IA sin problemas",
              "author": { "@type": "Person", "name": "Laura G." },
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            },
            {
              "@type": "Review",
              "reviewBody": "6 meses de uso y funciona como el primer día",
              "author": { "@type": "Person", "name": "David S." },
              "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            }
          ]
        })}
      </script>
    </>
  )
}

export default HomePage
