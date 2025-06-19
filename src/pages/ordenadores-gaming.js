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
      {/* ✅ Optimized SEO */}
      <Seo 
        title="Ordenadores Gaming de Alta Gama en Valencia | Máximo Rendimiento y eSports"
        description="Ordenadores Gaming de alta gama en Valencia con GPU NVIDIA RTX 5090. Diseñados para juegos en 4K/8K, VR y eSports competitivos con refrigeración líquida extrema y rendimiento de nueva generación."
        image="/og-pc-gaming.jpg"
        pathname="/ordenadores-gaming"
      />

      {/* 🔹 Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-labelledby="gaming-hero-title">
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage 
              image={heroImage} 
              alt="Auto Formula 1 al estilo de un ordenador gaming de alta gama con setup RGB y pantalla ultrapanorámica mostrando eSports en 4K" 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <div className="absolute inset-0 bg-carbon-black/80" />
        <div className="container mx-auto px-4 relative text-center z-10">
          <h1 id="gaming-hero-title" className="text-4xl md:text-6xl font-bold text-light-gray mb-6">
            Ordenadores Gaming de Alta Gama en Valencia con GPU RTX 5090
          </h1>
          <p className="text-xl text-medium-gray max-w-2xl mx-auto mb-8">
            Elige un <strong>ordenador gaming a medida</strong> con procesadores de última generación, GPU RTX 5090 y refrigeración líquida avanzada. Potencia extrema para 4K, VR y eSports.
</p>
          <Button to="/configuraciones?category=gaming" color="neoncyan">
            Encuentra tu Ordenador Gaming
          </Button>
        </div>
      </section>

      {/* 🔹 Why Custom PCs? */}
      <section className="py-20 bg-dark-gray" aria-labelledby="why-custom-gaming">
        <div className="container mx-auto px-4">
          <h2 id="why-custom-gaming" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Máximo Rendimiento para 4K, VR y eSports con Diseño Personalizado
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <GatsbyImage 
                image={comparisonImage} 
                alt="Comparativa entre ordenador gaming personalizado con GPU RTX 5090 y PC preensamblado estándar" 
                className="rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <p className="text-medium-gray text-lg">
                En <strong>VLCExtreme</strong>, sabemos que el hardware <strong>marca la diferencia</strong>. Por eso, construimos Ordenadores con componentes de última generación para ofrecer el mejor rendimiento posible.
              </p>
              <ul className="list-disc pl-6 text-medium-gray space-y-2">
                <li>Componentes elegidos por su máxima calidad, compatibilidad y sinergia.</li>
                <li>Procesadores de última generación Intel y AMD Ryzen.</li>
                <li>Tarjetas gráficas NVIDIA RTX 5090 para máxima calidad en juegos AAA y realidad virtual.</li>
                <li>Refrigeración líquida y overclocking optimizado para estabilidad extrema.</li>
                <li>Garantía de rendimiento con compatibilidad 100% asegurada.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Gaming Builds Showcase - Replace Static Grid with Carousel */}
      <section className="py-20 bg-carbon-black" aria-labelledby="gaming-builds">
        <div className="container mx-auto px-4">
          <h2 id="gaming-builds" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            Encuentra tu Ordenador Gaming Perfecto
          </h2>
          </div>
           <div className="w-full">
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
