import React, { useState } from 'react';

const BuildCard = ({ build }) => {
  // Compute total price of the build
  const totalPrice = Object.values(build.base_components).reduce(
    (sum, component) => sum + component.price, 0
  );

  // State to toggle visibility of the details
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-dark-gray text-light-gray rounded-xl shadow-lg p-6 mb-6 border border-neon-cyan/20 hover:shadow-neon-cyan/40 transition-all text-center">
      {/* Build Title */}
      <h3 className="text-2xl font-bold text-neon-cyan mb-4">{build.name}</h3>

      {/* Build Description */}
      <p className="mb-2 text-gray-400">{build.description}</p>

      {/* Compatible Games Section */}
      {build.compatible_games && build.compatible_games.length > 0 && (
        <p className="text-sm text-gray-400 italic mb-4">
          🎮 Juegos Compatibles: <span className="text-light-gray">{build.compatible_games.join(', ')}</span>
        </p>
      )}

      {/* Toggle Details Link placed right after description */}
      <div className="mt-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-neon-cyan underline hover:text-light-gray"
        >
          {showDetails ? "Ocultar" : "Detalles"}
        </button>
      </div>

      {/* Conditionally rendered Components List */}
      {showDetails && (
        <div className="space-y-1 mt-4 mb-4">
          {Object.entries(build.base_components).map(([key, component]) => (
            <div key={key} className="p-1 border-b border-dark-gray/60">
              <p className="text-s text-gray-500 uppercase">{key}</p>
              <p className="text-md font-semibold">{component.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Total Price & Selection Button */}
      <div className="mt-6 flex flex-col items-center space-y-4 text-neon-cyan font-bold text-lg">
        <span>Precio Total: {totalPrice}€</span>
        <button
          onClick={() => alert(`Configuración "${build.name}" seleccionada.`)}
          className="px-6 py-3 rounded-xl font-bold bg-vivid-red text-white hover:bg-red-700 transition-all shadow-lg shadow-vivid-red/20 hover:shadow-vivid-red/40"
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
};

export default BuildCard;
