import React from 'react'


const Process = () => {
  return (
    <section className="py-20 bg-dark-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          ¿Cómo funciona VLCExtreme?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              step: 'Paso 1',
              title: 'Configura tu equipo',
              desc: 'Elige entre configuraciones optimizadas o dinos lo que quieres'
            },
            {
              step: 'Paso 2',
              title: 'Ensamblamos y testeamos',
              desc: 'Control de calidad y ajustes avanzados de rendimiento'
            },
            {
              step: 'Paso 3',
              title: 'Entrega rápida',
              desc: 'Envío seguro y configuración lista para usar'
            }
          ].map((step, index) => (
            <div key={index} className="p-6 bg-carbon-black rounded-lg text-center">
              <div className="text-neon-cyan text-2xl font-bold mb-4">{step.step}</div>
              <h3 className="text-xl text-light-gray mb-2">{step.title}</h3>
              <p className="text-medium-gray">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-grid gap-4 bg-carbon-black p-6 rounded-lg">
            <h3 className="text-xl text-light-gray">Tiempos de entrega estimados:</h3>
            <div className="flex flex-wrap justify-center gap-8 text-medium-gray">
              <p>Gaming & Streaming: <span className="text-neon-cyan">14-21 días</span></p>
              <p>Workstations IA: <span className="text-neon-cyan">21-30 días</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process