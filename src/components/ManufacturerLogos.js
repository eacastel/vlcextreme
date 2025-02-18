import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ManufacturerLogos = () => {
  const data = useStaticQuery(graphql`
    query {
      intel: file(relativePath: { eq: "manufacturers/intel-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      amd: file(relativePath: { eq: "manufacturers/amd-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      nvidia: file(relativePath: { eq: "manufacturers/nvidia-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      asus: file(relativePath: { eq: "manufacturers/asus-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      msi: file(relativePath: { eq: "manufacturers/msi-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      gigabyte: file(relativePath: { eq: "manufacturers/gigabyte-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      evga: file(relativePath: { eq: "manufacturers/evga-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      corsair: file(relativePath: { eq: "manufacturers/corsair-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      gskill: file(relativePath: { eq: "manufacturers/gskill-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      kingston: file(relativePath: { eq: "manufacturers/kingston-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      nzxt: file(relativePath: { eq: "manufacturers/nzxt-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      samsung: file(relativePath: { eq: "manufacturers/samsung-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      seasonic: file(relativePath: { eq: "manufacturers/seasonic-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      lianli: file(relativePath: { eq: "manufacturers/lian-li-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 160, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  `);

  const manufacturers = [
    { name: "Intel", image: getImage(data.intel), url: "https://www.intel.es" },
    { name: "AMD", image: getImage(data.amd), url: "https://www.amd.com" },
    { name: "NVIDIA", image: getImage(data.nvidia), url: "https://www.nvidia.com" },
    { name: "ASUS", image: getImage(data.asus), url: "https://www.asus.com" },
    { name: "MSI", image: getImage(data.msi), url: "https://www.msi.com" },
    { name: "Gigabyte", image: getImage(data.gigabyte), url: "https://www.gigabyte.com" },
    { name: "EVGA", image: getImage(data.evga), url: "https://www.evga.com" },
    { name: "Corsair", image: getImage(data.corsair), url: "https://www.corsair.com" },
    { name: "G.Skill", image: getImage(data.gskill), url: "https://www.gskill.com" },
    { name: "Kingston", image: getImage(data.kingston), url: "https://www.kingston.com" },
    { name: "NZXT", image: getImage(data.nzxt), url: "https://www.nzxt.com" },
    { name: "Samsung", image: getImage(data.samsung), url: "https://www.samsung.com" },
    { name: "Seasonic", image: getImage(data.seasonic), url: "https://seasonic.com" },
    { name: "Lian Li", image: getImage(data.lianli), url: "https://www.lian-li.com" }
  ];

  // **Log missing images for debugging**
  manufacturers.forEach(manufacturer => {
    if (!manufacturer.image) {
      console.warn(`⚠️ Missing image for: ${manufacturer.name}`);
    }
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } }
    ]
  };

  return (
    <section className="py-12 bg-dark-gray">
      <div className="container mx-auto px-4">
        <h2 id="vlcextreme-process-title" className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
          Trabajamos con los mejores fabricantes
        </h2>
        
        {/* Desktop Grid */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-6">
          {manufacturers.map((brand, index) => (
            brand.image ? (
              <a key={index} href={brand.url} target="_blank" rel="noopener noreferrer" 
                 className="flex justify-center items-center max-w-[130px] h-auto transition-opacity hover:opacity-80">
                <GatsbyImage
                  image={brand.image}
                  alt={`Logo de ${brand.name}`}
                  className="object-scale-down w-full h-auto"
                />
              </a>
            ) : null
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden container mx-auto px-[5%]">
          <Slider {...settings}>
            {manufacturers.map((brand, index) => (
              brand.image ? (
                <div key={index} className="flex flex-col justify-center items-center p-2">
                  <a href={brand.url} target="_blank" rel="noopener noreferrer" className="flex flex-col justify-center items-center">
                    <GatsbyImage
                      image={brand.image}
                      alt={`Logo de ${brand.name}`}
                      className="object-scale-down w-[110px] h-auto mx-auto"
                    />
                  </a>
                </div>
              ) : null
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ManufacturerLogos;
