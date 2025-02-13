import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Seo from '../components/Seo'

const GamingPage = ({ data }) => {
  const heroImage = getImage(data.hero)
  const comparisonImage = getImage(data.comparison)
  const gamingPro = getImage(data.gamingPro)
  const gamingUltra = getImage(data.gamingUltra)
  const gamingUltimate = getImage(data.gamingUltimate)

  return (
    <Layout>
      {/* 🔹 SEO Metadata */}
      <Seo 
        title="PC Gaming en Valencia | Configuraciones Extremas y eSports"
        description="Descubre PCs Gaming de alta gama, diseñados para 8K, VR y eSports competitivos. Toda la potencia que un gamer exigente necesita."
        image={data.hero.childImageSharp.gatsbyImageData.images.fallback.src}
        pathname="/gaming"
      />

      {/* 🔹 Hero Section with Background Fix */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage
              image={heroImage}
              alt="Setup gaming profesional con iluminación RGB"
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
        <div className="absolute inset-0 bg-carbon-black/80" />

        {/* Content */}
        <div className="container mx-auto px-4 relative text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-light-gray mb-6">
          Ordenadores Gaming Personalizados con Rendimiento Extremo
          </h1>
          <p className="text-xl text-medium-gray max-w-2xl mx-auto mb-8">
          Encuentra tu próximo PC Gaming de gama alta en Valencia, con la última tecnología en CPUs, GPUs y refrigeración.
          </p>
          <Button to="/configuraciones" color="neoncyan">
            Elige tu PC Gaming
          </Button>
        </div>
      </section>

      {/* 🔹 Why Custom PCs? */}
      <section className="py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            ¿Por qué elegir un VLC Extreme Gaming personalizado?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <GatsbyImage image={comparisonImage} alt="Comparación de PCs personalizados vs preensamblados" className="rounded-lg" />
            </div>
            <div className="space-y-6">
              <p className="text-medium-gray text-lg">
                No todos los jugadores quieren pasar horas investigando qué piezas elegir. En <strong>VLCExtreme</strong>, eliminamos la complejidad para que solo te preocupes de jugar.
              </p>
              <ul className="list-disc pl-6 text-medium-gray space-y-2">
                <li>Nos encargamos de elegir los mejores componentes para maximizar tu inversión.</li>
                <li>Sin preocupaciones por compatibilidad, ensamblamos y optimizamos cada detalle.</li>
                <li>Máximo rendimiento garantizado con overclocking y refrigeración avanzada.</li>
                <li>Selección de hardware sin stock antiguo: solo lo mejor del mercado.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Gaming Builds Showcase */}
      <section className="py-20 bg-carbon-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Elige tu PC Gaming Extremo
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'VLCExtreme Pro', specs: 'RTX 4070 Ti, Ryzen 7 7800X3D, 32GB RAM', price: 'Desde 2.200€', image: gamingPro },
              { name: 'VLCExtreme Ultra', specs: 'RTX 4080, Intel i7-13700KF, 64GB RAM', price: 'Desde 3.400€', image: gamingUltra },
              { name: 'VLCExtreme Ultimate', specs: 'RTX 4090, Intel i9-14900KF, 128GB RAM', price: 'Desde 5.900€', image: gamingUltimate },
            ].map((build, index) => (
              <div key={index} className="group relative bg-dark-gray rounded-lg p-6 border border-dark-gray hover:border-neon-cyan transition-all">
                <GatsbyImage image={build.image} alt={build.name} className="rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-light-gray mb-2">{build.name}</h3>
                <p className="text-medium-gray mb-4">{build.specs}</p>
                <div className="flex justify-between items-center">
                  <span className="text-neon-cyan font-bold">{build.price}</span>
                  <Button to="/configuraciones" size="sm" variant="outline">
                    Ver Configuración
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query GamingPageQuery {
    hero: file(relativePath: { eq: "f1-concept.png" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    comparison: file(relativePath: { eq: "bespoke-3.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    gamingPro: file(relativePath: { eq: "vlcextreme-pro-rtx-4070ti-ryzen-7800x3d.webp" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    gamingUltra: file(relativePath: { eq: "vlcextreme-ultra-rtx-4080-64gb-ram.webp" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    gamingUltimate: file(relativePath: { eq: "vlcextreme-ultimate-x-ryzen-9800x3d-rtx-4090.webp" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
  }
`

export default GamingPage
