import React from 'react'

const Process = () => {
  return (
    <section className="py-20 bg-dark-gray" aria-labelledby="vlcextreme-process-title">
      <div className="container mx-auto px-4">
        {/* 🔹 Section Title */}
        <h2 id="vlcextreme-process-title" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          ¿Cómo funciona VLCExtreme?
        </h2>

        {/* 🔹 Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12" role="list">
          {[
            {
              step: 'Paso 1',
              title: 'Elige o solicita tu equipo',
              desc: 'Selecciona una de nuestras <strong><a href="/configuraciones" class="text-neon-cyan underline">configuraciones optimizadas</a></strong> o <strong><a href="/contacto" class="text-neon-cyan underline">solicita tu PC</a></strong> completamente personalizado.'
            },
            {
              step: 'Paso 2',
              title: 'Ensamblamos y testeamos',
              desc: 'Cada ordenador pasa por un riguroso control de calidad, optimización del sistema y pruebas de estrés para garantizar un rendimiento extremo.'
            },
            {
              step: 'Paso 3',
              title: 'Entrega rápida y lista para usar',
              desc: 'Recibe tu PC configurado y listo para usar, con optimización térmica, drivers instalados y rendimiento máximo desde el primer encendido.'
            }
          ].map((step, index) => (
            <div key={index} className="p-6 bg-carbon-black rounded-lg text-center shadow-lg" role="listitem">
              <div className="text-neon-cyan text-2xl font-bold mb-4">{step.step}</div>
              <h3 className="text-xl text-light-gray mb-2">{step.title}</h3>
              <p className="text-medium-gray" dangerouslySetInnerHTML={{ __html: step.desc }}></p>
            </div>
          ))}
        </div>

        {/* 🔹 Delivery Times */}
        <div className="text-center">
          <div className="inline-grid gap-4 bg-carbon-black p-6 rounded-lg shadow-lg" aria-labelledby="delivery-times-title">
            <h3 id="delivery-times-title" className="text-xl text-light-gray font-bold">
              Tiempos de entrega estimados:
            </h3>
            <div className="flex flex-wrap justify-center gap-8 text-medium-gray">
              <p>
                <strong className="text-light-gray">Gaming & Streaming:</strong>
                <span className="text-neon-cyan"> 14-21 días</span>
              </p>
              <p>
                <strong className="text-light-gray">Ordenadores para IA:</strong>
                <span className="text-neon-cyan"> 21-30 días</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
