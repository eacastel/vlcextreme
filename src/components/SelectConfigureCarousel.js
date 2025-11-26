import React, { useState } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import buildsData from '../data/builds.json';
import GamingBuildCard from './builds/GamingBuildCard';
import ProductionBuildCard from './builds/ProductionBuildCard';
import AIBuildCard from './builds/AIBuildCard';
import CategoryButton from './CategoryButton';


const SelectConfigureCarousel = () => {
  // Fetch Sticker Image
  const data = useStaticQuery(graphql`
    query {
      sticker: file(relativePath: { eq: "extreme-build-sticker.png" }) {
        childImageSharp {
          gatsbyImageData(width: 96, height: 96, layout: FIXED)
        }
      }
    }
  `);

  const stickerImage = data?.sticker?.childImageSharp?.gatsbyImageData;

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("gaming");

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-5xl text-white hover:text-neon-cyan transition"
    onClick={onClick}
    aria-label="Anterior"
  >
    ‹
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-5xl text-white hover:text-neon-cyan transition"
    onClick={onClick}
    aria-label="Siguiente"
  >
    ›
  </button>
);



  // Define categories in Spanish
  const categories = {
    gaming: "Ordenadores Gaming Extremos",
    production: "Estaciones de Producción y Creación",
    ai: "Máquinas de Inteligencia Artificial"
  };

  // Filter builds by selected category
  const builds = Object.values(buildsData.builds).filter(build => build.category === selectedCategory);

  // **Render Build Cards based on category**
  const renderBuildCard = (build) => {
    switch (build.category) {
      case 'gaming':
        return <GamingBuildCard key={build.id} build={build} stickerImage={stickerImage} />;
      case 'production':
        return <ProductionBuildCard key={build.id} build={build} stickerImage={stickerImage} />;
      case 'ai':
        return <AIBuildCard key={build.id} build={build} stickerImage={stickerImage} />;
      default:
        return null;
    }
  };

  // **Carousel Settings**
  const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  swipeToSlide: true,
  touchThreshold: 15,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  mobileFirst: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        arrows: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        arrows: true,
        swipeToSlide: true,
        speed: 500,
        touchThreshold: 20
      }
    }
  ]
};


  return (
    <div className="w-full max-w-7xl mx-auto mt-20 px-4 mb-20">

      {/* ✅ NEW: Strategic Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Arquitecturas de Referencia
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          No vendemos cajas cerradas. Las siguientes configuraciones son <strong>plataformas base validadas</strong> que usamos como punto de partida para diseñar tu máquina única. Elige tu base y personalízala.
        </p>
      </div>

{/* **Top Category Buttons** */}
      <div className="flex flex-wrap justify-center mb-10 space-x-4">
         {/* ... (Keep your existing CategoryButton map logic here) */}
         {Object.keys(categories).map(categoryKey => (
          <CategoryButton
            key={categoryKey}
            categoryKey={categoryKey}
            label={categories[categoryKey]}
            isActive={selectedCategory === categoryKey}
            onClick={setSelectedCategory}
            variant="outline"
            color="neoncyan"
            // Minor tweak: emphasize the active state distinctively
            activeClass="bg-neon-cyan !text-carbon-black shadow-[0_0_20px_rgba(6,182,212,0.4)] font-bold scale-105"
          />
        ))}
      </div>

      {/* **Slick Carousel** */}
      {/* Keep existing slider logic */}
      <div className="relative w-full overflow-visible">
        <Slider {...sliderSettings} className="mt-6">
          {builds.map(build => (
            <div key={build.id} className="p-4">
              {/* NOTE: Inside your Card components (GamingBuildCard, etc.), 
                 change the button text from "Comprar" to "Configurar Base" 
              */}
              {renderBuildCard(build)}
            </div>
          ))}
        </Slider>
      </div>
      
      <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
              * Todos los componentes se piden <strong>on-demand</strong> para garantizar la última revisión de hardware.
          </p>
      </div>
    </div>
  );
};

export default SelectConfigureCarousel;
