import React, { useState } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import buildsData from '../data/builds.json';

// Import Build Card Components
import GamingBuildCard from './builds/GamingBuildCard';
import ProductionBuildCard from './builds/ProductionBuildCard';
import AIBuildCard from './builds/AIBuildCard';
import CategoryButton from './CategoryButton';


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


      {/* **Grid Layout for Builds** */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builds.map(build => renderBuildCard(build))}
      </div>
    </div>
  );
};

export default SelectConfigure;
