import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql, useStaticQuery } from 'gatsby';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from './Button';
import buildsJson from '../data/builds.json';

// Category Styles
const categoryStyles = {
  gaming: { bg: 'bg-neon-green', text: 'text-neon-green', shadow: 'shadow-[0_0_20px_#00E472]' },
  workstations: { bg: 'bg-neon-yellow', text: 'text-neon-yellow', shadow: 'shadow-[0_0_20px_#FFD000]' },
  ai: { bg: 'bg-neon-orange', text: 'text-neon-orange', shadow: 'shadow-[0_0_20px_#FF8C00]' }
};

const RecommendedBuilds = () => {
  // GraphQL Query for Builds Images
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "builds" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, PNG], quality: 90)
            }
          }
        }
      }
      noImage: file(relativePath: { eq: "builds/imagen-no-disponible.png" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP, PNG], quality: 90)
        }
      }
    }
  `);

  // Function to Find Image by Name or Use Placeholder
  const findImage = (imageName) => {
    const foundImage = data.allFile.edges.find(edge => edge.node.name === imageName);
    return foundImage ? getImage(foundImage.node.childImageSharp) : getImage(data.noImage.childImageSharp);
  };

  // Process Builds from JSON
  const buildsData = Object.values(buildsJson.builds).map(build => ({
    ...build,
    image: findImage(build.imageKeys ? build.imageKeys[0] : null),
    price: Math.ceil(build.price_range.min * 1.4).toLocaleString('es-ES', { minimumFractionDigits: 0 }) + "€"
  }));

  // Group builds by category
  const groupedBuilds = buildsData.reduce((acc, build) => {
    if (!acc[build.category]) acc[build.category] = [];
    acc[build.category].push(build);
    return acc;
  }, {});

  // Slick Carousel Settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="py-20 bg-carbon-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-4">
          Encuentra el equipo perfecto para ti
        </h2>
        <p className="text-medium-gray text-center mb-12 max-w-xl mx-auto">
          Todos nuestros ordenadores están hechos a medida con componentes premium. Sin stock antiguo, sin limitaciones: rendimiento extremo desde la primera configuración.
        </p>

        {/* Loop Through Categories */}
        {Object.entries(groupedBuilds).map(([category, builds]) => (
          <div key={category} className="mb-16">
            {/* Category Title */}
            <h3 className={`text-2xl font-bold text-center uppercase ${categoryStyles[category]?.text || 'text-white'} mb-4`}>
              {category === 'gaming' ? '🎮 Gaming & Streaming' : category === 'workstations' ? '💼 Workstations' : '🤖 AI Workstations'}
            </h3>

            {/* Carousel */}
            <Slider {...sliderSettings}>
              {builds.map((build, index) => (
                <div key={index} className="p-4">
                  <div className={`relative bg-dark-gray rounded-xl shadow-lg border border-gray-500/30 transition-all hover:text-carbon-black hover:${categoryStyles[category]?.shadow || ''} text-center`}>
                    
                    {/* Short Description Banner */}
                    <div className={`${categoryStyles[category]?.bg || 'bg-gray-700'} text-black text-xs font-bold uppercase w-full rounded-t-xl px-2 py-2`}>
                      {build.short_description}
                    </div>

                    {/* Image */}
                    <div className="h-48 mb-4 rounded-lg overflow-hidden">
                      {build.image ? (
                        <GatsbyImage image={build.image} alt={build.name || 'Build'} className="rounded-lg" />
                      ) : (
                        <p className="text-gray-400">Imagen no disponible</p>
                      )}
                    </div>

                    {/* Build Info */}
                    <div className="bg-inherit text-light-gray p-6 transition-all duration-200">
                      <h3 className={`text-2xl font-bold text-center uppercase ${categoryStyles[category]?.text || 'text-white'} mb-4`}>
                        {build.name}
                      </h3>                      
                      <p className="mb-4 text-gray-300">{build.description}</p>

                      {/* Price & Button */}
                      <div className="mt-6 flex flex-col items-center space-y-1 text-neon-cyan font-bold text-lg">
                        <span className="text-sm uppercase">Desde:</span>
                        <span className="text-2xl">{build.price}</span>
                      </div>

                      <div className="mt-4">
                        <Button to={`/builds/${build.name.toLowerCase().replace(/\s+/g, "-")}`} size="sm" variant="outline" color="neongreen">
                          Ver Configuración
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedBuilds;
