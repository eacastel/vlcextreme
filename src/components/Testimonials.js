import React from 'react'
import { FaQuoteLeft, FaCheckCircle } from 'react-icons/fa' 


const Testimonials = () => {

  const testimonials = [
    {
      id: 1,
      text: 'Desde el primer contacto, el trato fue impecable. Se tomaron el tiempo de entender exactamente qué necesitaba y me recomendaron la configuración perfecta. El rendimiento ha superado todas mis expectativas: es rápido, silencioso, potente y está optimizado al detalle.',
      author: 'Cristian A.',
      role: 'Diseñador 3D',
      rating: 5,
      featured: true
    },
    {
      id: 2,
      text: 'Mi estación VLCExtreme maneja grandes datasets de IA sin problemas. La estabilidad en cargas de 24h es impresionante.',
      author: 'Laura G.',
      role: 'Data Scientist',
      rating: 5,
    },
    {
      id: 3,
      text: '6 meses de uso intensivo y funciona como el primer día. Las temperaturas de la GPU nunca pasan de 65 grados.',
      author: 'David S.',
      role: 'Editor de Video',
      rating: 5,
    }
  ]

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length

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
      "author": { "@type": "Person", "name": t.author },
      "reviewRating": { "@type": "Rating", "ratingValue": t.rating, "bestRating": "5", "worstRating": "1" }
    }))
  };

  return (
    <section className="py-24 bg-carbon-black border-t border-white/5">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
            Rendimiento garantizado, <span className="text-neon-cyan">clientes satisfechos</span>.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`relative p-8 bg-dark-gray rounded-2xl border border-white/5 hover:border-neon-cyan/30 transition-all flex flex-col shadow-2xl group 
              ${testimonial.featured ? 'md:col-span-2 bg-gradient-to-br from-dark-gray to-[#1a1a1a]' : 'md:col-span-1'}`}
            >
              
              {/* Watermark Quote */}
              <FaQuoteLeft className="absolute top-6 right-6 text-6xl text-white/5 group-hover:text-neon-cyan/5 transition-colors duration-500" />

              {/* HEADER: Uniform Verified Badge */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                  {/* Now we always show the strong checkmark badge */}
                  <div className="flex items-center gap-2 opacity-60">
                     <FaCheckCircle className="text-neon-green text-lg"/>
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                         Compra Verificada
                     </span>
                  </div>
              </div>

              {/* Yellow Stars */}
              <div className="flex gap-1 text-neon-yellow mb-6 text-lg relative z-10">
                {'★'.repeat(testimonial.rating)}
              </div>

              {/* Text */}
              <blockquote className="relative z-10 mb-8 flex-grow">
                  <p className={`text-gray-300 leading-relaxed italic font-light ${testimonial.featured ? 'text-lg md:text-xl' : 'text-sm'}`}>
                    "{testimonial.text}"
                  </p>
              </blockquote>

              {/* Footer: Author */}
              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-white font-bold text-base tracking-wide">
                        {testimonial.author}
                    </p>
                    {testimonial.role && (
                        <p className="text-xs text-neon-cyan mt-1 font-mono opacity-80">
                            {testimonial.role}
                        </p>
                    )}
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safe JSON-LD */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </section>
  )
}

export default Testimonials