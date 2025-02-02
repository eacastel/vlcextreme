import React from 'react'
import Button from './Button'

const ContactSection = () => {
  return (
    <section className="py-20 bg-carbon-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            ¿Tienes dudas? Hablemos.
          </h2>
          
          <form className="grid gap-6">
            <input
              type="text"
              placeholder="Nombre"
              className="p-3 bg-dark-gray rounded text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 bg-dark-gray rounded text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
            />
            <select className="p-3 bg-dark-gray rounded text-light-gray focus:ring-2 focus:ring-neon-cyan">
              <option>Tipo de PC que buscas</option>
              <option>Gaming & Streaming</option>
              <option>Workstation IA</option>
              <option>Edición y Producción</option>
            </select>
            <textarea
              placeholder="Mensaje"
              rows="4"
              className="p-3 bg-dark-gray rounded text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
            />
            <Button type="submit" color="neon-cyan" className="w-full">
              Enviar consulta
            </Button>
          </form>

          <div className="mt-12 text-center">
            <h3 className="text-xl text-light-gray mb-4">Preguntas frecuentes</h3>
            <div className="space-y-2 text-medium-gray">
              <p>¿Cuánto tarda en llegar mi PC? <span className="text-neon-cyan">14-30 días</span></p>
              <p>¿Necesito asesoramiento? <span className="text-neon-cyan">Contacta con nuestros expertos</span></p>
            </div>
            <Button to="/faqs" variant="outline" className="mt-6">
              Ver todas las FAQs
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection