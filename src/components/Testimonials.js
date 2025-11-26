import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'

const Testimonials = () => {
  // 1. Fetch the icon
  const data = useStaticQuery(graphql`
    query {
      googleIcon: file(relativePath: { eq: "google-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 24, layout: FIXED, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  `)

  const googleImg = getImage(data.googleIcon);

  // 2. Add an 'icon' and 'source' property to your data structure
  const testimonials = [
    {
      text: 'Desde el primer contacto, el trato fue impecable. Se tomaron el tiempo de entender exactamente qué necesitaba y me recomendaron la configuración perfecta. El rendimiento ha superado todas mis expectativas: es rápido, silencioso, potente y está optimizado al detalle. Además, el servicio postventa demuestra un compromiso real con el cliente.',
      author: 'Cristian A.',
      rating: 5,
      icon: googleImg,       
      source: "Google Reviews" 
    },
    {
      text: 'Mi estación VLCExtreme maneja grandes datasets de IA sin problemas',
      author: 'Laura G.',
      rating: 5,
    },
    {
      text: '6 meses de uso y funciona como el primer día',
      author: 'David S.',
      rating: 5,
    }
  ]

  // Calculate average rating for structured data
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length

  return (
    <section className="py-20 bg-carbon-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          Rendimiento garantizado, clientes satisfechos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-dark-gray rounded-lg border border-dark-gray hover:border-neon-cyan transition-all flex flex-col">
              
              {/* ✅ OPTIONAL HEADER: If icon exists, show it */}
              {testimonial.icon && (
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-3">
                    <GatsbyImage image={testimonial.icon} alt={testimonial.source || "Review Source"} />
                    {testimonial.source && (
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                            {testimonial.source}
                        </span>
                    )}
                </div>
              )}

              {/* Stars */}
              <div className="flex gap-1 text-neon-yellow mb-4 text-sm">
                {'★'.repeat(testimonial.rating)}
              </div>

              {/* Text */}
              <p className="text-medium-gray mb-6 text-sm leading-relaxed italic flex-grow">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <p className="text-light-gray font-bold text-sm">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* JSON-LD Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "VLCExtreme Ordenadores Personalizados",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating.toFixed(1),
            "reviewCount": testimonials.length,
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": testimonials.map(t => ({
            "@type": "Review",
            "reviewBody": t.text,
            "author": {
              "@type": "Person",
              "name": t.author
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": t.rating,
              "bestRating": "5",
              "worstRating": "1"
            }
          }))
        })}
      </script>
    </section>
  )
}

export default Testimonials