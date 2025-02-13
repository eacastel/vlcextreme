import React from 'react'
import Button from './Button'

const Testimonials = () => {
  const testimonials = [
    {
      text: 'Mi PC gaming llegó optimizado al 100% y listo para jugar sin hacer nada más',
      author: 'Juan M.',
      rating: 5
    },
    {
      text: 'Mi estación VLCExtreme maneja grandes datasets de IA sin problemas',
      author: 'Laura G.',
      rating: 5
    },
    {
      text: '6 meses de uso y funciona como el primer día',
      author: 'David S.',
      rating: 5
    }
  ]

  // ✅ Calculate average rating for structured data
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length

  return (
    <section className="py-20 bg-carbon-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          Rendimiento garantizado, clientes satisfechos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-dark-gray rounded-lg border border-dark-gray hover:border-neon-cyan transition-all">
              <div className="flex gap-2 text-neon-cyan mb-4">
                {'★'.repeat(testimonial.rating)}
              </div>
              <p className="text-medium-gray mb-4">"{testimonial.text}"</p>
              <p className="text-light-gray font-semibold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button to="/testimonios" variant="outline" color="neoncyan">
            Ver todas las opiniones
          </Button>
        </div>
      </div>

      {/* ✅ JSON-LD Schema Markup for Testimonials */}
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
