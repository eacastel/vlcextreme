import React, { useState } from 'react';
import { GatsbyImage } from "gatsby-plugin-image";

const AIBuildCard = ({ build, stickerImage  }) => {
  // Compute total price of the build with European thousands separator (e.g. 1.234€)
  const totalPrice = Object.values(build.base_components)
    .reduce((sum, component) => sum + component.price, 0)
    .toLocaleString('es-ES', { useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // State to toggle visibility of the details
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative bg-dark-gray rounded-xl shadow-lg border border-gray-500/30 transition-all hover:text-carbon-black hover:shadow-[0_0_20px_#FF8C00] text-center">

            {/* Floating Sticker - Uses Gatsby Image if available */}
            {build.sticker && (
              <div className="absolute top-[230px] -right-2 w-24 h-24 flex items-center justify-center rounded-full shadow-md overflow-hidden">
                {build.sticker.image ? (
                  <GatsbyImage image={stickerImage} alt="VLC Extreme Build" className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full rounded-full bg-${build.sticker.bg} flex items-center justify-center text-${build.sticker.textColor}`}>
                    {build.sticker.text}
                  </div>
                )}
              </div>
            )}

      {/* Short Description Banner */}
      <div className="bg-neon-orange text-black text-xs font-bold uppercase w-full rounded-t-xl px-2 py-2 pb-2">
        {build.short_description}
      </div>

      {/* This container will be vertically centered within the card */}
      <div className="bg-inherit text-light-gray p-6 mb-6 transition-all duration-200 flex flex-col justify-center min-h-[300px]">
        {/* Build Title */}
        <h3 className="text-2xl font-bold text-neon-orange mt-2 mb-4">{build.name}</h3>

        {/* Build Description */}
        <p className="mb-4 text-gray-300">{build.description}</p>

        {/* Compatible Games Section */}
        {build.compatible_software && build.compatible_software.length > 0 && (
          <p className="text-sm text-gray-300 italic mb-4">
            <span className="text-white">{build.compatible_software.join(', ')}</span>
          </p>
        )}

        {/* Toggle Details Link */}
        <div className="mt-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-light-gray underline hover:text-white"
          >
            {showDetails ? "Ocultar" : "Más Detalles"}
          </button>
        </div>

        {/* Conditionally Rendered Components List */}
        {showDetails && (
          <div className="space-y-1 mt-4 mb-4">
            {Object.entries(build.base_components).map(([key, component]) => (
              <div key={key} className="p-1 border-b border-dark-gray/60">
                <p className="text-xs text-gray-400 uppercase">{key}</p>
                <p className="text-md font-semibold">{component.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Total Price & Selection Button */}
        <div className="mt-6 flex flex-col items-center space-y-1 text-neon-cyan font-bold text-lg">
          <span className="text-sm uppercase">Precio Total:</span>
          <span className="text-neon-orange text-2xl font-bold">{totalPrice}€</span>
        </div>

        <div className="mt-4">
          <button
            onClick={() => alert(`Configuración "${build.name}" seleccionada.`)}
            className="bg-neon-cyan text-carbon-black px-6 py-2 rounded-md font-bold text-sm xl:text-base transition-all duration-200 ease-in-out hover:bg-neon-orange hover:shadow-[0_0_15px_#FF8C00]"
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIBuildCard;
