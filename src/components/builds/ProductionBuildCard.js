import React, { useState } from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";

const ProductionBuildCard = ({ build }) => {
  // Fetch all images from "builds" folder + sticker + fallback image
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "builds" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 400, height:400, placeholder: BLURRED, formats: [AUTO, WEBP, PNG], quality: 90, transformOptions: { cropFocus: CENTER })             
            }
          }
        }
      }
      noImage: file(relativePath: { eq: "builds/imagen-no-disponible.png" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, PNG], quality: 90)
        }
      }
      sticker: file(relativePath: { eq: "extreme-build-sticker.png" }) {
        childImageSharp {
          gatsbyImageData(width: 96, height: 96, layout: FIXED)
        }
      }
    }
  `);

  // **Find and return the correct image**
  const findImage = (imageKeys) => {
    if (!imageKeys || imageKeys.length === 0) {
      return getImage(data.noImage.childImageSharp);
    }

    const normalizedKeys = imageKeys.map(key =>
      key.replace(/\.(png|jpg|jpeg)$/i, "").replace(/[()]/g, "")
    );

    let foundImages = data.allFile.edges.filter(edge =>
      normalizedKeys.includes(edge.node.name)
    );

    if (foundImages.length === 0) {
      return getImage(data.noImage.childImageSharp);
    }

    foundImages.sort((a, b) => a.node.name.localeCompare(b.node.name, undefined, { numeric: true }));
    return getImage(foundImages[0].node.childImageSharp);
  };

  const buildImage = findImage(build.imageKeys);
  const stickerImage = build.sticker && data.sticker ? getImage(data.sticker.childImageSharp) : null;

  // **Calculate total price with 40% markup**
  const totalPrice = Math.ceil(
    Object.values(build.base_components).reduce((sum, component) => sum + component.price, 0) * 1.4
  ).toLocaleString('es-ES', { useGrouping: true });

  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  // **Handle Purchase Process**
  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: [
            { 
              name: build.name, 
              price: Math.ceil(
                Object.values(build.base_components).reduce((sum, component) => sum + component.price, 0) * 1.4
              )
            }
          ]
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Checkout error:", data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-dark-gray rounded-xl shadow-lg border border-gray-500/30 transition-all hover:text-carbon-black hover:shadow-[0_0_20px_#00A4C4] text-center">
      
      {/* Floating Sticker */}
      {build.sticker && stickerImage && (
        <div className="absolute top-[230px] z-40 -right-2 w-24 h-24 rounded-full shadow-md overflow-hidden">
          <GatsbyImage image={stickerImage} alt="VLCExtreme Build" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Short Description */}
      <div className="bg-neon-cyan text-black text-xs font-bold uppercase w-full rounded-t-xl px-2 py-2 pb-2">
        {build.short_description}
      </div>

      {/* Content */}
      <div className="bg-inherit text-light-gray p-6 mb-6 transition-all flex flex-col justify-center min-h-[300px]">
        <h3 className="text-2xl font-bold text-neon-cyan mt-2 mb-4">{build.name}</h3>

        <div className="mb-4 rounded-lg overflow-hidden">
          <GatsbyImage image={buildImage} alt={build.name} className="rounded-lg shadow-lg" />
        </div>

        <p className="mb-4 text-gray-300">{build.description}</p>

        {build.compatible_software?.length > 0 && (
          <p className="text-sm text-gray-300 italic mb-4">
            <span className="text-white">Programas compatibles: {build.compatible_software.join(', ')}. (No incluidos).</span>
          </p>
        )}

        <div className="mt-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-light-gray underline hover:text-white"
          >
            {showDetails ? "Ocultar" : "Más Detalles"}
          </button>
        </div>

        {showDetails && (
          <div className="space-y-1 mt-4 mb-4">
            {Object.entries(build.base_components).map(([key, component]) => (
              <div key={key} className="p-1 border-b border-dark-gray/60">
                <p className="text-xs text-gray-400 uppercase">{key}</p>
                <p className="text-md font-semibold">{component.name}</p>
              </div>
            ))}
                                    <p className="text-xs text-gray-300 pt-6">
              **En caso de que no exista disponibilidad de algún componente, o por fluctuación de precios, éste se sustituirá por otro de rendimiento, marca y calidad similares.**
            </p>
            <p className="text-xs text-gray-300 pt-6">
              **Nos pondremos en contacto contigo para confirmar la instalación de los componentes finales y del sistema operativo (incluido: Windows o Linux).**
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center space-y-1 text-neon-cyan font-bold text-lg">
          <span className="text-sm uppercase">Precio Total:</span>
          <span className="text-neon-cyan text-2xl font-bold">{totalPrice} €</span>
        </div>

        <div className="mt-4">
          <button
            onClick={handlePurchase}
            className={`bg-neon-cyan text-carbon-black px-6 py-2 rounded-md font-bold text-sm xl:text-base transition-all duration-200 ease-in-out hover:bg-neon-cyan hover:shadow-[0_0_15px_#00A4C4] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Comprar Ahora"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductionBuildCard;
