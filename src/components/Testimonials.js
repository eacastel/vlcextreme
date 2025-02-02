import React from 'react'
import Button from './Button'

const Testimonials = () => {
  return (
    <section className="py-20 bg-carbon-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          Rendimiento garantizado, clientes satisfechos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              text: 'Mi PC gaming llegó optimizado al 100% y listo para jugar sin hacer nada más',
              author: 'Juan M.'
            },
            {
              text: 'Mi estación VLCExtreme maneja grandes datasets de IA sin problemas',
              author: 'Laura G.'
            },
            {
              text: '6 meses de uso y funciona como el primer día',
              author: 'David S.'
            }
          ].map((testimonial, index) => (
            <div key={index} className="p-6 bg-dark-gray rounded-lg border border-dark-gray hover:border-neon-cyan transition-all">
              <div className="flex gap-2 text-neon-cyan mb-4">
                {'★'.repeat(5)}
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
    </section>
  )
}

export default Testimonials