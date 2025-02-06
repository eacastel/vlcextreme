import React, { useState } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import buildsData from '../data/builds.json'; // Ensure the JSON file is in the correct path
// Import your separate build card components:
import GamingBuildCard from './builds/GamingBuildCard';
import ProductionBuildCard from './builds/ProductionBuildCard';
import AIBuildCard from './builds/AIBuildCard';
// import MiningBuildCard from './builds/MiningBuildCard';
import CategoryButton from './CategoryButton';


const SelectConfigure = () => {
  // Fetch the sticker image for special builds
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

  // State to keep track of the selected category; default is "gaming"
  const [selectedCategory, setSelectedCategory] = useState("gaming");

  // Category definitions in Spanish
  const categories = {
    gaming: "Ordenadores Gaming Extremos",
    production: "Estaciones de Producción y Creación",
    ai: "Máquinas de Inteligencia Artificial",
    // mining: "Rigs de Minado",
    // help: "Ayúdame a Elegir (GPT)"
  };

  const builds = Object.values(buildsData.builds).filter(
    build => build.category === selectedCategory
  );

  const renderBuildCard = (build) => {
    switch (build.category) {
      case 'gaming':
        return <GamingBuildCard key={build.id} build={build} stickerImage={stickerImage} />;
      case 'production':
        return <ProductionBuildCard key={build.id} build={build} stickerImage={stickerImage} />;
      case 'ai':
        return <AIBuildCard key={build.id} build={build} stickerImage={stickerImage} />;
      /*
      case 'mining':
        return <MiningBuildCard key={build.id} build={build} />;
      */
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4">
      {/* Top Category Buttons */}
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

      {/* Responsive Grid of Build Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {builds.map(build => renderBuildCard(build))}
      </div>
    </div>
  );
};

export default SelectConfigure;
