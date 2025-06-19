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
          Explora nuestros ordenadores de alto rendimiento para gaming, creación e IA, ensamblados bajo pedido con los mejores componentes. Sin stock, sin producción en masa, solo rendimiento extremo a tu medida.
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
        
        {/* Feature Grid CTA Section - visible from md up */}
<div className="mt-16 mb-8 px-4">
  <h3 className="text-center text-medium-gray text-md uppercase tracking-wider mb-6">
    La diferencia de un PC VLCExtreme
  </h3>

  <div className="grid md:grid-cols-3 gap-8">
    {[
      { icon: '⚡', text: 'Potencia extrema y optimización personalizada', to: '/configuraciones?focus=cpu-gpu' },
      { icon: '🛠', text: 'Componentes más recientes elegidos a medida', to: '/configuraciones?focus=components' },
      { icon: '✅', text: 'Testeado: máximo rendimiento y estabilidad', to: '/configuraciones?focus=benchmarking' },
    ].map((feature, index) => (
      <a
        key={index}
        href={feature.to}
        aria-label={feature.text} 
        className="block p-6 border border-white/30 rounded-lg bg-carbon-black/40 backdrop-blur-md hover:bg-carbon-black/60 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl text-neon-cyan">{feature.icon}</span>
          <p className="text-lg font-medium text-light-gray">{feature.text}</p>
        </div>
      </a>
    ))}
  </div>
</div>
      </div>
    </section>
  )
}

export default Hero