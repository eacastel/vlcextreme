import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/Layout";
import Button from "../components/Button";

const ProductPage = ({ pageContext }) => {
  const {
    productName,
    shortDescription,
    description,
    compatibleSoftware,
    compatibleGames,
    slug,
    imageKeys = [],
    baseComponents = {},
    optionalUpgrades = [],
    alternatives = {},
  } = pageContext;

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "builds" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 400, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
            }
          }
        }
      }
      noImage: file(relativePath: { eq: "builds/imagen-no-disponible.png" }) {
        childImageSharp {
          gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
        }
      }
    }
  `);

  const findImage = (key) => {
    if (!key) return getImage(data.noImage.childImageSharp);
    const normalizedKey = key.replace(/\.(png|jpg|jpeg|webp)$/i, "").replace(/[()]/g, "");
    const foundImage = data.allFile.edges.find(edge => edge.node.name === normalizedKey);
    return foundImage ? getImage(foundImage.node.childImageSharp) : getImage(data.noImage.childImageSharp);
  };

  const buildImage = imageKeys.length > 0 ? findImage(imageKeys[0]) : getImage(data.noImage.childImageSharp);

  const [selectedOS, setSelectedOS] = useState("Windows 11 Pro");
  const [selectedUpgrades, setSelectedUpgrades] = useState({});
  const [selectedAlternatives, setSelectedAlternatives] = useState({});

  const calculateTotalPrice = () => {
    let basePrice = Object.values(baseComponents).reduce((sum, component) => sum + component.price, 0);

    Object.keys(selectedAlternatives).forEach((key) => {
      if (selectedAlternatives[key]) {
        basePrice += selectedAlternatives[key].price - baseComponents[key].price;
      }
    });

    Object.keys(selectedUpgrades).forEach((key) => {
      if (selectedUpgrades[key]) {
        basePrice += selectedUpgrades[key].price;
      }
    });

    return Math.ceil(basePrice * 1.4).toLocaleString('es-ES', { useGrouping: true });
  };

  const [loading, setLoading] = useState(false);

  const handleUpgradeChange = (componentKey, upgrade) => {
    setSelectedUpgrades((prev) => ({
      ...prev,
      [componentKey]: prev[componentKey]?.name === upgrade.name ? null : upgrade,
    }));
  };

  const handleAlternativeChange = (componentKey, alternative) => {
    setSelectedAlternatives((prev) => ({
      ...prev,
      [componentKey]: alternative ? alternative : null, // Ensure no null reference errors
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="bg-gray-800 text-light-gray rounded-lg shadow-lg p-6 md:flex md:items-start md:gap-6 md:min-h-[400px]">
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-3xl font-bold text-neon-cyan">{productName}</h1>
            <p className="text-md text-gray-300 mt-2">{shortDescription}: {description}</p>
            {buildImage && (
              <div className="mt-4">
                <GatsbyImage image={buildImage} alt={productName} className="rounded-lg shadow-md max-w-[400px]" />
              </div>
            )}
            <p className="text-sm text-gray-400 italic mt-4">{description}</p>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-xl font-bold text-neon-cyan mb-2">Componentes Incluidos*</h2>
            <div className="bg-carbon-black p-4 rounded-lg shadow-md">
              <table className="w-full text-sm text-gray-300">
                <tbody>
                  {Object.entries(baseComponents).map(([key, component]) => (
                    <tr key={key} className="border-b border-gray-700">
                      <td className="py-1 text-gray-400 uppercase pr-2">{key}</td>
                      <td className="py-1 font-semibold">
                        {selectedAlternatives[key] ? selectedAlternatives[key].name : component.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {Object.keys(alternatives).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-neon-cyan">Alternativas</h3>
                <div className="bg-carbon-black p-4 rounded-lg shadow-md">
                  <table className="w-full text-sm text-gray-300">
                    <tbody>
                      {Object.entries(alternatives).map(([key, altOptions]) => (
                        <React.Fragment key={key}>
                          <tr>
                            <td colSpan="3" className="py-2 text-gray-300 font-bold">{key}</td>
                          </tr>
                          <tr>
  <td className="py-1">
    <input
      type="radio"
      name={key}
      checked={!selectedAlternatives[key]}
      onChange={() => handleAlternativeChange(key, null)} // Reset to default component
    />
  </td>
  <td className="py-1">{baseComponents[key].name} (Predeterminado)</td>
  <td className="py-1 text-gray-400">0 €</td>
</tr>
                          {altOptions.map(alternative => (
                            <tr key={alternative.name} className="border-b border-gray-700">
                              <td className="py-1">
                                <input
                                  type="radio"
                                  name={key}
                                  checked={selectedAlternatives[key]?.name === alternative.name}
                                  onChange={() => handleAlternativeChange(key, alternative)}
                                />
                              </td>
                              <td className="py-1">{alternative.name}</td>
                              <td className="py-1 text-gray-400">
                                {alternative.price > baseComponents[key].price
                                  ? `+${(alternative.price - baseComponents[key].price).toLocaleString('es-ES')} €`
                                  : `-${(baseComponents[key].price - alternative.price).toLocaleString('es-ES')} €`}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end items-center">
              <div className="text-right mr-8">
                <h3 className="text-xl font-bold text-neon-cyan">Precio Total</h3>
                <p className="text-2xl font-bold text-neon-cyan">{calculateTotalPrice()} €</p>
              </div>
              <div className="text-right">
                <Button onClick={() => alert("Compra procesada")} color="neoncyan" variant="solid" disabled={loading}>
                  {loading ? "Procesando..." : "Comprar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
