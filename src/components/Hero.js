import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from './Button'

const Hero = ({ backgroundImage }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 w-full h-full">
          <GatsbyImage
            image={backgroundImage}
            alt="Setup gaming futurista"
            className="w-full h-full"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-carbon-black/70" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-light-gray mb-6 px-4">
        ¿Hasta qué extremo quieres llegar? 
        </h1>
        <p className="text-xl text-medium-gray max-w-2xl mx-auto mb-8">
          Cada PC es ensamblado bajo pedido con los componentes más recientes. Sin stock, sin producción en masa, solo rendimiento extremo.
        </p>
        
        {/* Buttons Container */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button to="/configuraciones" variant="outline" color="neongreen">
            Ver Configuraciones
          </Button>
         {/*  <Button to="/contact" variant="outline" color="neoncyan">
         Consulta con un experto
          </Button>*/}
        </div>
        
        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 px-4">
          {[
            { icon: '⚡', text: 'Potencia extrema y optimización personalizada' },
            { icon: '🛠', text: 'Componentes más recientes' },
            { icon: '✅', text: 'Testeado para máximo rendimiento' },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-6 border border-white/30 rounded-lg bg-carbon-black/40 backdrop-blur-md"
            >
              <span className="text-4xl text-neon-cyan">{feature.icon}</span>
              <p className="text-lg font-medium text-light-gray">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero