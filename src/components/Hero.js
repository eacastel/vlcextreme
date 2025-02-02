import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Button from './Button'

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <StaticImage
        src="../images/hero-bg.webp"
        alt="Setup gaming futurista"
        className="absolute inset-0 w-full h-full object-cover"
        placeholder="blurred"
        layout="fullWidth"
      />
      <div className="absolute inset-0 bg-carbon-black/70" />
      
      <div className="container mx-auto px-4 relative text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-light-gray mb-6">
          VLCExtreme: Potencia a tu medida
        </h1>
        <p className="text-xl text-medium-gray max-w-2xl mx-auto mb-8">
          Cada PC es ensamblado bajo pedido con los componentes más recientes. Sin stock, sin producción en masa, solo rendimiento extremo.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button to="/configure" variant="outline" color="neongreen">
            Configura tu PC ahora
          </Button>
          <Button to="/contact" variant="outline" color="neoncyan">
            Consulta con un experto
          </Button>
        </div>
        
        {/* 🔹 Improved Feature Boxes: White Border + More Contrast */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-light-gray">
          {[
            { icon: '⚡', text: 'Potencia extrema y optimización personalizada' },
            { icon: '🛠', text: 'Componentes más recientes' },
            { icon: '✅', text: 'Testeado para máximo rendimiento' },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 border border-white border-opacity-30 rounded-lg bg-carbon-black/40 backdrop-blur-md shadow-lg"
            >
              <span className="text-4xl text-neon-green">{feature.icon}</span>
              <p className="text-lg font-semibold text-light-gray">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
