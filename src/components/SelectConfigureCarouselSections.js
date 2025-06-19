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

  const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-5xl text-white hover:text-neon-cyan transition"
    onClick={onClick}
    aria-label="Anterior"
  >
    ‹
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-5xl text-white hover:text-neon-cyan transition"
    onClick={onClick}
    aria-label="Siguiente"
  >
    ›
  </button>
);

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
  infinite: false,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  swipeToSlide: true,
  touchThreshold: 15,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  mobileFirst: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        arrows: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        arrows: true,
        swipeToSlide: true,
        speed: 500,
        touchThreshold: 20
      }
    }
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
