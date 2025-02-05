import React, { useState } from 'react';
import buildsData from '../data/builds.json'; // Ensure the JSON file is in the correct path
import BuildCard from './BuildCard'; // Importing the component

const SelectConfigure = () => {
  // Use state to keep track of the selected category; default is "gaming"
  const [selectedCategory, setSelectedCategory] = useState("gaming");

  // Category definitions in Spanish
  const categories = {
    gaming: "Ordenadores Gaming Extremos",
    production: "Estaciones de Producción y Creación",
    ai: "Máquinas de Inteligencia Artificial",
    mining: "Rigs de Minado",
    help: "Ayúdame a Elegir (GPT)"
  };

  // For now, only the "gaming" category has builds defined
  const builds = selectedCategory === "gaming" ? Object.values(buildsData.builds) : [];

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4">
      {/* Top Category Buttons */}
      <div className="flex flex-wrap justify-center mb-6 space-x-4">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-xl font-bold transition-colors ${
              selectedCategory === key 
                ? "bg-neon-cyan text-carbon-black shadow-md"
                : "bg-dark-gray text-light-gray hover:bg-neon-cyan/10 hover:shadow-md"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Responsive Grid of Build Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {builds.map((build, index) => (
          <BuildCard key={index} build={build} />
        ))}
      </div>
    </div>
  );
};

export default SelectConfigure;
