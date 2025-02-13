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
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,            
    autoplaySpeed: 3000, 
    arrows: true,
    rows: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4">
      {/* **Top Category Buttons** */}
      <div className="flex flex-wrap justify-center mb-6 space-x-4">
        {Object.keys(categories).map(categoryKey => (
          <CategoryButton
          key={categoryKey}
          categoryKey={categoryKey}
          label={categories[categoryKey]}
          isActive={selectedCategory === categoryKey}
          onClick={setSelectedCategory}
          variant="outline" // Ensure background color is applied instead of outline
          color="neoncyan" // Make all buttons use neon cyan color
          activeClass="bg-neon-cyan !text-carbon-black shadow-[0_0_15px_#00A4C4] !font-bold hover:!bg-neon-cyan hover:!text-carbon-black hover:!shadow-[0_0_15px_#00A4C4]" 
        />
        ))}
      </div>

      {/* **Slick Carousel** */}
      <Slider {...sliderSettings} className="mt-6">
        {builds.map(build => (
          <div key={build.id} className="p-4">
            {renderBuildCard(build)}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SelectConfigureCarousel;
