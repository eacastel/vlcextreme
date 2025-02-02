import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

export default function Why({ images }) {
  const points = [
    { 
      title: '1. Sin Stock Antiguo', 
      desc: 'Usamos los últimos procesadores, tarjetas gráficas y memorias RAM del mercado.',
      image: images.latestHardware,
    },
    { 
      title: '2. Optimización Extrema', 
      desc: 'Cada PC es afinado a nivel de BIOS, overclocking y flujo de aire.',
      image: images.optimizedPC,
    },
    { 
      title: '3. Testeado a Fondo', 
      desc: 'Cada PC se somete a pruebas intensivas de rendimiento y estabilidad antes del envío.',
      image: images.stressTesting,
    },
    { 
      title: '4. Personalización Total', 
      desc: 'Desde el diseño del chasis hasta el sistema de refrigeración, tú decides.',
      image: images.customPC,
    },
  ]

  return (
    <section className="py-16 bg-dark-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          No fabricamos en serie. Cada PC es único, como tú.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {points.map((point, index) => (
              <div key={index} className="p-6 bg-carbon-black rounded-lg hover:bg-neon-cyan/10 transition-colors text-center">
                <div className="mb-4 flex justify-center rounded-full overflow-hidden">
                  <GatsbyImage image={point.image} alt={point.title} className="rounded-full w-24 h-24" />
                </div>
                <h3 className="text-lg text-light-gray font-bold mb-2">{point.title}</h3>
                <p className="text-medium-gray">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
