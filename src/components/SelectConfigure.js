import React, { useState } from 'react';
import buildsData from '../data/builds.json'; // Ensure the JSON file is in the correct path
// Import your separate build card components:
import GamingBuildCard from './builds/GamingBuildCard';
import ProductionBuildCard from './builds/ProductionBuildCard';
import AIBuildCard from './builds/AIBuildCard';
// import MiningBuildCard from './builds/MiningBuildCard';
import CategoryButton from './CategoryButton';

const SelectConfigure = () => {
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
        return <GamingBuildCard key={build.id} build={build} />;
      case 'production':
        return <ProductionBuildCard key={build.id} build={build} />;
        case 'ai':
        return <AIBuildCard key={build.id} build={build} />;
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
        <CategoryButton
          categoryKey="gaming"
          label={categories.gaming}
          isActive={selectedCategory === "gaming"}
          onClick={setSelectedCategory}
          variant="outline"
          color="neongreen"
          activeClass="bg-emerald-900 !text-neon-green shadow-xl"  
        />
        <CategoryButton
          categoryKey="production"
          label={categories.production}
          isActive={selectedCategory === "production"}
          onClick={setSelectedCategory}
          variant="outline"
          color="neonyellow"
          activeClass="bg-yellow-950 !text-neon-yellow shadow-xl"  // Custom active styling for production
        />
        <CategoryButton
          categoryKey="ai"
          label={categories.ai}
          isActive={selectedCategory === "ai"}
          onClick={setSelectedCategory}
          variant="outline"
          color="neonorange"
          activeClass="bg-amber-950 !text-neon-orange shadow-xl"
        />
        {/*   
        <CategoryButton 
          categoryKey="mining"
          label={categories.mining}
          isActive={selectedCategory === "mining"}
          onClick={setSelectedCategory}
          variant="outline"
          color="vividred"
          activeClass="bg-vivid-red text-black shadow-xl"  // Custom active styling for mining
        />
        
        <CategoryButton
          categoryKey="help"
          label={categories.help}
          isActive={selectedCategory === "help"}
          onClick={setSelectedCategory}
          variant="outline"
          color="neoncyan"
          activeClass="border-2 border-neon-cyan bg-neon-cyan text-carbon-black shadow-xl"  // Custom active styling for help
        />
        */}
      </div>

      {/* Responsive Grid of Build Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {builds.map(build => renderBuildCard(build))}
      </div>
    </div>
  );
};

export default SelectConfigure;
