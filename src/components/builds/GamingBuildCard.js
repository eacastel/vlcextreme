import React from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";
import Button from "../Button";
import { FaMicrochip, FaMemory, FaGamepad } from "react-icons/fa"; 
import { PiGraphicsCardFill } from "react-icons/pi"; // Nice GPU icon if available, or stick to FaLayerGroup

const GamingBuildCard = ({ build }) => {

  const getCategorySlug = (category) => {
    if (category === "gaming") return "ordenadores-gaming";
    if (category === "production") return "ordenadores-creadores-streamers";
    if (category === "ai") return "ordenadores-inteligencia-artificial";
    return "otros";
  };

  const slug = `/${getCategorySlug(build.category)}/${build.name.toLowerCase().replace(/\s+/g, "-")}/`;

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "builds" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 400, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP, PNG], quality: 90, transformOptions: { cropFocus: CENTER })
            }
          }
        }
      }
      noImage: file(relativePath: { eq: "builds/imagen-no-disponible.png" }) {
        childImageSharp {
          gatsbyImageData(width: 400, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP, PNG], quality: 90)
        }
      }
    }
  `);

  const findImage = (imageKeys) => {
    if (!imageKeys || imageKeys.length === 0) return getImage(data.noImage.childImageSharp);
    const normalizedKeys = imageKeys.map(key => key.replace(/\.(png|jpg|jpeg|webp)$/i, "").replace(/[()]/g, ""));
    let foundImages = data.allFile.edges.filter(edge => normalizedKeys.includes(edge.node.name));
    foundImages.sort((a, b) => a.node.name.localeCompare(b.node.name, undefined, { numeric: true }));
    return getImage(foundImages[0]?.node?.childImageSharp) || getImage(data.noImage.childImageSharp);
  };

  const buildImage = findImage(build.imageKeys);

  const totalPrice = Math.ceil(
    Object.values(build.base_components).reduce((sum, component) => sum + component.price, 0) * 1.4
  ).toLocaleString('es-ES', { useGrouping: true });

  return (
    <div className="relative bg-dark-gray rounded-xl shadow-lg border border-white/5 transition-all hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-neon-cyan/50 flex flex-col h-full group overflow-hidden">
      
      {/* Badge */}
      <div className="bg-carbon-black/80 backdrop-blur absolute top-0 left-0 w-full z-10 border-b border-white/10 py-1">
        <p className="text-center text-[10px] font-bold text-neon-cyan uppercase tracking-[0.2em]">
           Arquitectura de Referencia
        </p>
      </div>

      {/* Image */}
      <div className="h-56 overflow-hidden relative bg-carbon-black">
        {buildImage ? (
          <GatsbyImage 
            image={buildImage} 
            alt={build.name} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        
        <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors leading-tight">
                {build.name}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-2">
                {build.short_description || build.description}
            </p>
        </div>

        {/* Hero Specs */}
        <div className="grid grid-cols-1 gap-2 mb-6">
            <div className="flex items-center gap-3 bg-carbon-black p-2 rounded border border-white/5">
                <FaMicrochip className="text-neon-cyan text-sm" />
                <span className="text-xs font-bold text-gray-200">{build.base_components.CPU?.name}</span>
            </div>
            <div className="flex items-center gap-3 bg-carbon-black p-2 rounded border border-white/5">
                <PiGraphicsCardFill className="text-neon-cyan text-sm" /> 
                <span className="text-xs font-bold text-gray-200">{build.base_components.GPU?.name}</span>
            </div>
            <div className="flex items-center gap-3 bg-carbon-black p-2 rounded border border-white/5">
                <FaMemory className="text-neon-cyan text-sm" />
                <span className="text-xs font-bold text-gray-200">{build.base_components.RAM?.name}</span>
            </div>
        </div>

        {/* Compatible Games (Badges) */}
        {build.compatible_games?.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold flex items-center gap-1">
               <FaGamepad className="text-neon-cyan"/> Optimizado para
            </p>
            <div className="flex flex-wrap gap-1">
                {build.compatible_games.slice(0, 3).map((game, i) => (
                    <span key={i} className="text-[10px] bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/5">
                        {game}
                    </span>
                ))}
                {build.compatible_games.length > 3 && (
                    <span className="text-[10px] text-gray-500 px-1 py-1">+ {build.compatible_games.length - 3} más</span>
                )}
            </div>
          </div>
        )}

        {/* Price & Action */}
        <div className="mt-auto pt-4 border-t border-white/5">
            <div className="flex justify-between items-end mb-4">
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Inversión Est.</span>
                    <span className="text-[10px] text-neon-cyan">Desde</span>
                </div>
                <span className="text-2xl font-bold text-white">{totalPrice} €</span>
            </div>

            <Button 
                to={slug} 
                color="neoncyan" 
                variant="solid" 
                className="w-full shadow-none hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
                Ver Configuración
            </Button>
        </div>

      </div>
    </div>
  );
};

export default GamingBuildCard;