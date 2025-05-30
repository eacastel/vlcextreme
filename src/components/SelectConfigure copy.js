import React, { useState } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import buildsData from '../data/builds.json';

// Import Build Card Components
import GamingBuildCard from './builds/GamingBuildCard';
import ProductionBuildCard from './builds/ProductionBuildCard';
import AIBuildCard from './builds/AIBuildCard';
import CategoryButton from './CategoryButton';

// Define category styles
const categoryStyles = {
  gaming: { bg: 'bg-neon-green', text: 'text-neon-green', shadow: 'shadow-[0_0_20px_#00E472]' },
  production: { bg: 'bg-neon-yellow', text: 'text-neon-yellow', shadow: 'shadow-[0_0_20px_#FFD000]' },
  ai: { bg: 'bg-neon-orange', text: 'text-neon-orange', shadow: 'shadow-[0_0_20px_#FF8C00]' }
};

const SelectConfigure = () => {
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
    <div className="w-full max-w-5xl mx-auto mt-10 px-4">
      {/* **Top Category Buttons** */}
      <div className="flex flex-wrap justify-center mb-6 space-x-4">
        {Object.keys(categories).map(categoryKey => (
          <CategoryButton
            key={categoryKey}
            categoryKey={categoryKey}
            label={categories[categoryKey]}
            isActive={selectedCategory === categoryKey}
            onClick={setSelectedCategory}
            variant="outline"
            color={categoryKey === "gaming" ? "neongreen" : categoryKey === "production" ? "neonyellow" : "neonorange"}
            activeClass={`bg-${categoryKey === "gaming" ? "green-950" : categoryKey === "production" ? "yellow-950" : "amber-950"} !text-neon-${categoryKey === "gaming" ? "green" : categoryKey === "production" ? "yellow" : "orange"} shadow-xl`}
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

export default SelectConfigure;
