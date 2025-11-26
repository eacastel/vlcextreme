import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery, Link } from 'gatsby' // Added Link import

const WhyChoose = () => {
  const data = useStaticQuery(graphql`
    query {
      latestHardware: file(relativePath: { eq: "vlcextreme-latest-hardware.webp" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
        }
      }
      optimizedPC: file(relativePath: { eq: "bios-testing.png" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
        }
      }
      stressTesting: file(relativePath: { eq: "vlcextreme-stress-testing.webp" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
        }
      }
      customPC: file(relativePath: { eq: "satisfaccion-cliente-ordenador-personalizado-gaming-2.png" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
        }
      }
    }
  `)

  // Updated Copy with Links
  const points = [
    { 
      title: 'Cero Stock. 100% Fresco.', 
      desc: 'No tenemos estanterías llenas de polvo. Adquirimos el silicio específicamente para tu build, asegurando la última revisión de fábrica.',
      image: getImage(data.latestHardware),
      alt: 'Componentes de hardware frescos',
      link: '/configuraciones' // Context: Product quality
    },
    { 
      title: 'Bios & Thermal Tuning', 
      desc: 'No es solo montar piezas. Ajustamos voltajes, curvas de ventilación y BIOS manualmente para lograr silencio y potencia.',
      image: getImage(data.optimizedPC),
      alt: 'Ajuste de BIOS y optimización térmica',
      link: '/workstations-profesionales-valencia' // Context: Engineering
    },
    { 
      title: 'Validación de 24h', 
      desc: 'Tu equipo se prueba durante 24 horas en nuestro lab antes de enviarlo para garantizar estabilidad del 100%, antes de la entrega.',
      image: getImage(data.stressTesting),
      alt: 'Stress testing en laboratorio',
      link: '/nosotros' // Context: Methodology
    },
    { 
      title: 'Soporte Personalizado', 
      desc: 'Si tienes dudas, hablas con quien montó tu PC, no con un call center. Soporte directo de técnico a usuario.',
      image: getImage(data.customPC),
      alt: 'Soporte técnico directo con cliente',
      link: '/contacto' // Context: Contact
    },
  ]

  return (
    <section className="py-24 bg-dark-gray border-y border-white/5" aria-labelledby="why-vlcextreme-title">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h2 id="why-vlcextreme-title" className="text-3xl md:text-5xl font-bold text-white mb-6">
            De comprar lo que hay <span className="text-neon-cyan">a tener lo que quieres</span>.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Las tiendas convencionales mueven inventario. Nosotros diseñamos instrumentos de precisión.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
          {points.map((point, index) => (
            <Link 
              to={point.link}
              key={index} 
              className="group p-6 bg-carbon-black rounded-xl border border-white/5 hover:border-neon-cyan/50 hover:-translate-y-2 transition-all duration-300 block"
              role="listitem"
            >
              <div className="mb-6 overflow-hidden rounded-lg aspect-square border border-white/10 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-shadow">
                {point.image && (
                    <GatsbyImage 
                        image={point.image} 
                        alt={point.alt} 
                        // CHANGED: grayscale-[0.8] lets 20% color through.
                        className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-500" 
                    />
                )}
              </div>
              {/* Added underline on hover to title to indicate clickability */}
              <h3 className="text-xl text-white font-bold mb-3 group-hover:text-neon-cyan transition-colors group-hover:underline decoration-neon-cyan/50 underline-offset-4">
                {point.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{point.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose