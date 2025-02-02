import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import Button from './Button'

const RecommendedBuilds = () => {
    const data = useStaticQuery(graphql`
        query {
          kidsStarter: file(relativePath: { eq: "vlcextreme-kids-starter-gaming-pc.jpg" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          pro: file(relativePath: { eq: "vlcextreme-pro-rtx-4070ti-ryzen-7800x3d.jpg" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          ultra: file(relativePath: { eq: "vlcextreme-ultra-rtx-4080-64gb-ram.jpg" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          ultimateX: file(relativePath: { eq: "vlcextreme-ultimate-x-ryzen-9800x3d-rtx-4090.jpg" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          aiWorkstation: file(relativePath: { eq: "vlcextreme-ai-workstation-threadripper-128gb.jpg" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
          aiUltra: file(relativePath: { eq: "vlcextreme-ai-ultra-dual-rtx-4090-256gb.jpg" }) {
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
      `)

  const buildsData = {
    gaming: [
      {
        name: 'VLCExtreme Kids Starter',
        specs: 'GTX 1650 / RTX 3050, Ryzen 5 5600G / Intel i5-12400F, 16GB RAM (expandable)',
        premium: 'Opciones de SSD NVMe 1TB, Wi-Fi 6E, RGB total, Chasis premium',
        price: 'Desde 1.200€',
        image: getImage(data.kidsStarter),
      },
      {
        name: 'VLCExtreme Pro',
        specs: 'RTX 4070 Ti / 4080, Ryzen 7 7800X3D / Intel i7-13700KF, 32GB DDR5 RAM',
        premium: 'Opciones de SSD NVMe 2TB, RAM expandible a 64GB, Refrigeración líquida',
        price: 'Desde 3.200€',
        image: getImage(data.pro),
      },
      {
        name: 'VLCExtreme Ultra',
        specs: 'RTX 4080 / 4090, Ryzen 9 7900X / Intel i9-13900KF, 64GB DDR5 RAM',
        premium: 'Opciones de SSD NVMe 4TB, Custom Watercooling, Panel de vidrio templado',
        price: 'Desde 4.800€',
        image: getImage(data.ultra),
      },
      {
        name: 'VLCExtreme Ultimate X',
        specs: 'RTX 4090 / Dual GPU, Ryzen 7 9800X3D / Threadripper, 128GB DDR5 RAM',
        premium: 'Opciones de 8TB SSD, Custom Watercooling EKWB, Estación de carga integrada',
        price: 'Desde 14.000€',
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
        {/* Content Here */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-12">
          {buildsData[activeTab].map((build, index) => (
            <div key={index} className="group relative bg-dark-gray rounded-lg p-6 border border-dark-gray hover:border-neon-cyan transition-all">
              <div className="h-48 mb-4 rounded-lg overflow-hidden">
                <GatsbyImage image={build.image} alt={build.name} className="rounded-lg" />
              </div>
              <h3 className="text-xl font-bold text-light-gray mb-2">{build.name}</h3>
              <p className="text-medium-gray mb-4">{build.specs}</p>
              <p className="text-light-gray text-sm mb-4">{build.premium}</p>
              <div className="flex justify-between items-center">
                <span className="text-neon-cyan font-bold">{build.price}</span>
                <Button to="/configure" size="sm" variant="outline">
                  Ver Configuración
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecommendedBuilds
