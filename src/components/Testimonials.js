import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'

const Testimonials = () => {
  const data = useStaticQuery(graphql`
    query {
      googleIcon: file(relativePath: { eq: "google-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 32, layout: FIXED, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  `)

  const googleImg = getImage(data.googleIcon);

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

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length

  // Schema Object
  const schemaData = {
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
  };

  return (
    <section className="py-20 bg-carbon-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          Rendimiento garantizado, clientes satisfechos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-dark-gray rounded-lg border border-dark-gray hover:border-neon-cyan transition-all flex flex-col shadow-lg">
              
              {/* ✅ RESTORED: Icon Header with White Background */}
              {testimonial.icon && (
                <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                    {/* The White Circle Wrapper */}
                    <div className="bg-white p-1.5 rounded-full flex items-center justify-center w-8 h-8 shrink-0">
                        <GatsbyImage 
                            image={testimonial.icon} 
                            alt={testimonial.source || "Review Source"} 
                            className="w-full h-full"
                            imgStyle={{ objectFit: 'contain' }}
                        />
                    </div>
                    {testimonial.source && (
                        <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                            {testimonial.source}
                        </span>
                    )}
                </div>
              )}

              {/* Stars */}
              <div className="flex gap-1 text-neon-cyan mb-4 text-sm">
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

      {/* ✅ SAFE JSON-LD (Prevents Meta Pixel Error) */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </section>
  )
}

export default Testimonials