import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import { navigate } from "gatsby"; // ✅ Needed for updating the URL
import buildsData from '../data/builds.json';

// Import Build Card Components
import GamingBuildCard from './builds/GamingBuildCard';
import ProductionBuildCard from './builds/ProductionBuildCard';
import AIBuildCard from './builds/AIBuildCard';
import CategoryButton from './CategoryButton';

// ✅ Function to get the category from URL
const getQueryParam = (param) => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  return null;
};

const SelectConfigure = () => {
  // ✅ Read category from URL, default to "gaming"
  const initialCategory = getQueryParam("category") || "gaming";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // ✅ Ensure the URL updates when clicking buttons
  useEffect(() => {
    navigate(`/configuraciones?category=${selectedCategory}`, { replace: true });
  }, [selectedCategory]);

  // ✅ Fetch Sticker Image
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

  // ✅ Define categories
  const categories = {
    gaming: "Ordenadores Gaming Extremos",
    production: "Estaciones de Producción y Creación",
    ai: "Máquinas de Inteligencia Artificial"
  };

  // ✅ Filter builds by selected category
  const builds = Object.values(buildsData.builds).filter(build => build.category === selectedCategory);

  // ✅ Render correct Build Card
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
      {/* ✅ **Top Category Buttons** */}
      <div className="flex flex-wrap justify-center mb-6 space-x-4">
        {Object.keys(categories).map(categoryKey => (
          <CategoryButton
            key={categoryKey}
            categoryKey={categoryKey}
            label={categories[categoryKey]}
            isActive={selectedCategory === categoryKey}
            onClick={setSelectedCategory}
            variant="outline"
            color="neoncyan"
            activeClass="bg-neon-cyan !text-carbon-black shadow-[0_0_15px_#00A4C4] !font-bold"
          />
        ))}
      </div>

      {/* ✅ **Builds Grid** */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builds.map(build => renderBuildCard(build))}
      </div>
    </div>
  );
};

export default SelectConfigure;
