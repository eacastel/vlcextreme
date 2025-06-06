import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'

const Why = () => {
  const data = useStaticQuery(graphql`
    query {
      latestHardware: file(relativePath: { eq: "vlcextreme-latest-hardware.webp" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
        }
      }
      optimizedPC: file(relativePath: { eq: "equipos-ordenadores-personalizados-valencia.png" }) {
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

  const points = [
    { 
      title: '1. Sin Stock Antiguo', 
      desc: 'Cada PC incluye procesadores, tarjetas gráficas y memoria RAM de última generación para garantizar el máximo rendimiento.',
      image: getImage(data.latestHardware),
      alt: 'Componentes de hardware más recientes en un taller de ensamblaje VLCExtreme.'
    },
    { 
      title: '2. Optimización Extrema', 
      desc: 'Todos los sistemas se ajustan a nivel de BIOS, overclocking y gestión térmica para estabilidad total.',
      image: getImage(data.optimizedPC),
      alt: 'Técnico ajustando un PC para optimización extrema con flujo de aire mejorado.'
    },
    { 
      title: '3. Testeado a Fondo', 
      desc: 'Nuestros equipos pasan pruebas de estrés intensivas para garantizar estabilidad y durabilidad en tareas exigentes.',
      image: getImage(data.stressTesting),
      alt: 'Bancos de pruebas en el laboratorio VLCExtreme verificando la estabilidad de ordenadores personalizados.'
    },
    { 
      title: '4. Personalización Total', 
      desc: 'Desde el chasis hasta el sistema de refrigeración, creamos ordenadores adaptados a cada usuario.',
      image: getImage(data.customPC),
      alt: 'Cliente satisfecho con su PC gaming personalizado VLCExtreme, con RGB y componentes de alta gama.'
    },
  ]

  return (
    <section className="py-16 bg-dark-gray" aria-labelledby="why-vlcextreme-title">
      <div className="container mx-auto px-4">
        <h2 id="why-vlcextreme-title" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          No fabricamos en serie. Cada PC es único, como tú.
        </h2>

        {/* Full-Width Grid - No Extra Content, Just 4 Equal Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {points.map((point, index) => (
            <div 
              key={index} 
              className="p-8 bg-carbon-black rounded-xl hover:bg-neon-cyan/10 transition-all text-center shadow-lg"
              role="listitem"
            >
              <div className="mb-6 flex justify-center rounded-full overflow-hidden w-40 h-40 mx-auto">
                <GatsbyImage image={point.image} alt={point.alt} className="rounded-full object-cover" />
              </div>
              <h3 className="text-xl text-light-gray font-bold mb-3">{point.title}</h3>
              <p className="text-medium-gray text-lg">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Why
