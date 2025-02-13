import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Seo from '../components/Seo';
import SelectConfigureCarouselSections from "../components/SelectConfigureCarouselSections";

const GamingPage = ({ data }) => {
  const heroImage = getImage(data.hero);
  const comparisonImage = getImage(data.comparison);

  return (
    <Layout>
      <Seo 
        title="PC Gaming en Valencia | Configuraciones Extremas y eSports"
        description="Descubre PCs Gaming de alta gama, diseñados para 8K, VR y eSports competitivos. Toda la potencia que un gamer exigente necesita."
        image={data.hero.childImageSharp.gatsbyImageData.images.fallback.src}
        pathname="/gaming"
      />

      {/* 🔹 Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage image={heroImage} alt="Setup gaming profesional con iluminación RGB" className="w-full h-full" />
          </div>
        )}
        <div className="absolute inset-0 bg-carbon-black/80" />
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

      {/* 🔹 Gaming Builds Showcase - Replace Static Grid with Carousel */}
      <section className="py-20 bg-carbon-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Elige tu PC Gaming Extremo
          </h2>
          <SelectConfigureCarouselSections category="gaming" />
        </div>
      </section>
    </Layout>
  );
};

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
  }
`;

export default GamingPage;
