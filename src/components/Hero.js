import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from './Button' // Importing your custom component

const Hero = ({ backgroundImage }) => {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-carbon-black">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 w-full h-full">
          <GatsbyImage
            image={backgroundImage}
            alt="VLCExtreme Monolith System"
            className="w-full h-full opacity-40"
            style={{ position: "absolute", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-carbon-black via-carbon-black/80 to-transparent" />
      
      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10 pt-10">
        <div className="max-w-4xl">
          <span className="text-neon-cyan tracking-[0.3em] uppercase text-xs font-bold mb-4 block animate-fade-in-up">
             EST. 2025 • INGENIERÍA EN VALENCIA
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Ordenadores para <br/>
            {/* The "Awesome Colors" Gradient */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-cyan">
              visionarios.
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 font-light leading-relaxed max-w-2xl">
            Ingeniería artesanal para quienes exigen rendimiento extremo en <span className="font-semibold">IA, renderizado y gaming</span> de alto nivel.
          </p>
          
          {/* Custom Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
                to="/configuraciones" 
                color="neongreen"
                className="shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
                Explorar Arquitecturas
            </Button>
             
            <Button 
                to="/about" 
                variant="outline" 
                color="neoncyan"
            >
                Nuestra Filosofía
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero