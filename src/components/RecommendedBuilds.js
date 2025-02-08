import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import Button from './Button'

const RecommendedBuilds = () => {
    const data = useStaticQuery(graphql`
        query {
          kidsStarter: file(relativePath: { eq: "vlcextreme-kids-starter-gaming-pc.webp" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
            }
          }
          pro: file(relativePath: { eq: "vlcextreme-pro-rtx-4070ti-ryzen-7800x3d.webp" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
            }
          }
          ultra: file(relativePath: { eq: "vlcextreme-ultra-rtx-4080-64gb-ram.webp" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
            }
          }
          ultimateX: file(relativePath: { eq: "vlcextreme-ultimate-x-ryzen-9800x3d-rtx-4090.webp" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
            }
          }
          aiWorkstation: file(relativePath: { eq: "vlcextreme-ai-ultra-dual-rtx-4090-256gb.webp" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
            }
          }
          aiUltra: file(relativePath: { eq: "vlcextreme-ai-workstation-threadripper-128gb.webp" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
            }
          }
        }
      `)

  const buildsData = {
    gaming: [
      {
        name: 'VLCExtreme Junior Starter',
        specs: 'RTX 3050 / RTX 4060, Ryzen 5 7600 / Intel i5-14600, 16GB DDR5 RAM (expandable)',
        premium: 'Opciones de SSD NVMe 1TB, Wi-Fi 6E, RGB total, Chasis premium',
        price: 'Desde 1.400€',
        image: getImage(data.kidsStarter),
      },
      {
        name: 'VLCExtreme Pro',
        specs: 'RTX 4070 SUPER / 4080, Ryzen 7 7800X3D / Intel i7-14700KF, 32GB DDR5 RAM',
        premium: 'Opciones de SSD NVMe 2TB, RAM expandible a 64GB, Refrigeración líquida',
        price: 'Desde 3.400€',
        image: getImage(data.pro),
      },
      {
        name: 'VLCExtreme Ultra',
        specs: 'RTX 4080 SUPER / 4090, Ryzen 9 7950X3D / Intel i9-14900KF, 64GB DDR5 RAM',
        premium: 'Opciones de SSD NVMe 4TB, Custom Watercooling, Panel de vidrio templado',
        price: 'Desde 5.200€',
        image: getImage(data.ultra),
      },
      {
        name: 'VLCExtreme Ultimate X',
        specs: 'RTX 4090 / Dual RTX 4090, Ryzen 9 9950X3D / Threadripper PRO 7985WX, 128GB DDR5 RAM',
        premium: 'Opciones de 8TB SSD, Custom Watercooling EKWB, Estación de carga integrada',
        price: 'Desde 15.500€',
        image: getImage(data.ultimateX),
      },
    ],
    ia: [
      {
        name: 'VLCExtreme AI Workstation',
        specs: 'RTX 4090 / 2x RTX 4080, AMD Threadripper PRO 5975WX, 128GB DDR5 RAM',
        premium: 'Opciones de SSD 4TB NVMe, 10Gb Ethernet, Refrigeración líquida',
        price: 'Desde 12.000€',
        image: getImage(data.aiWorkstation),
      },
      {
        name: 'VLCExtreme AI Ultra',
        specs: '2x RTX 4090, AMD Threadripper 5995WX, 256GB DDR5 RAM',
        premium: 'Opciones de almacenamiento RAID 10, Optimización CUDA, Chasis premium RGB',
        price: 'Desde 20.000€',
        image: getImage(data.aiUltra),
      },
    ],
  }

  const [activeTab, setActiveTab] = useState('gaming')

  return (
    <section className="py-20 bg-carbon-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-4">
          Encuentra el equipo perfecto para ti
        </h2>
        <p className="text-medium-gray text-center mb-12 max-w-xl mx-auto">
          Todos nuestros ordenadores están hechos a medida con componentes premium. Sin stock antiguo, sin limitaciones: rendimiento extremo desde la primera configuración.
        </p>

        {/* 🔹 Category Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {['gaming', 'ia'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 text-lg font-bold rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-neon-cyan text-carbon-black shadow-lg'
                  : 'bg-dark-gray text-light-gray hover:bg-neon-cyan/20'
              }`}
            >
              {tab === 'gaming' ? '🎮 Gaming & Streaming' : '🤖 Workstations IA'}
            </button>
          ))}
        </div>

{/* 🔹 Grid Layout */}
<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-12">
  {buildsData[activeTab].map((build, index) => (
    <div key={index} className="group relative bg-dark-gray rounded-lg p-6 border border-dark-gray hover:border-neon-cyan transition-all">
      <div className="h-48 mb-4 rounded-lg overflow-hidden">
        <GatsbyImage image={build.image} alt={build.name} className="rounded-lg" />
      </div>
      <h3 className="text-xl font-bold text-light-gray mb-2">{build.name}</h3>
      <p className="text-medium-gray mb-4">{build.specs}</p>
      <p className="text-light-gray text-sm mb-4">{build.premium}</p>

      {/* 🔹 Flexbox Adjusted for Left Button & Right Price */}
      <div className="flex justify-between items-center">
        <Button to="/configuraciones" size="sm" variant="outline" color="neongreen" className="order-1">
          Ver Configuración
        </Button>
        <span className="text-light-gray font-bold order-2 lg:mr-4">{build.price}</span>
      </div>
    </div>
  ))}
</div>


        {/* 🔹 Custom Configuration CTA */}
        <div className="text-center">
          <Button to="/configuraciones" size="lg" variant="outline">
            Crear configuración personalizada
          </Button>
        </div>
      </div>
    </section>
  )
}

export default RecommendedBuilds
