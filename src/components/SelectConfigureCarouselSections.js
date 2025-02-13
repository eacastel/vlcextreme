import React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import buildsData from '../data/builds.json';
import GamingBuildCard from './builds/GamingBuildCard';
import ProductionBuildCard from './builds/ProductionBuildCard';
import AIBuildCard from './builds/AIBuildCard';

const SelectConfigureCarouselSections = ({ category }) => {
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

  // Filter builds dynamically based on the passed `category`
  const filteredBuilds = Object.values(buildsData.builds).filter(build => build.category === category);

  // **Render Build Cards based on category**
  const renderBuildCard = (build) => {
    switch (category) {
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

  // **Carousel Settings**
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,            
    autoplaySpeed: 3000, 
    arrows: true,
    rows: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4">
      <Slider {...sliderSettings} className="mt-6">
        {filteredBuilds.map(build => (
          <div key={build.id} className="p-4">
            {renderBuildCard(build)}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SelectConfigureCarouselSections;
