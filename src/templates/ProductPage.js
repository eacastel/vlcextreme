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
    longDescription,
    compatibleSoftware,
    compatibleGames,
    slug,
    imageKeys = [],
    baseComponents = {},
    optionalUpgrades = []
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
  const [loading, setLoading] = useState(false);

  const calculateTotalPrice = () => {
    let basePrice = Object.values(baseComponents).reduce((sum, component) => sum + component.price, 0);

    Object.keys(selectedUpgrades).forEach((key) => {
      if (selectedUpgrades[key]) {
        basePrice += selectedUpgrades[key].price;
      }
    });

    return Math.ceil(basePrice * 1.4).toLocaleString('es-ES', { useGrouping: true });
  };

  const handleUpgradeChange = (componentKey, upgrade) => {
    setSelectedUpgrades((prev) => ({
      ...prev,
      [componentKey]: prev[componentKey]?.name === upgrade.name ? null : upgrade,
    }));
  };

  // **Handle Purchase Process**
  const handlePurchase = async () => {
    if (!Object.keys(baseComponents).length) return;
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: [
            {
              name: productName,
              slug: slug,
              price: Math.ceil(
                Object.values(baseComponents).reduce((sum, component) => sum + component.price, 0) * 1.4
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
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="bg-gray-800 text-light-gray rounded-lg shadow-lg p-6 md:flex md:items-start md:gap-6 md:min-h-[400px]">
          
          {/* Left Column: Title, Description, Image */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-3xl font-bold text-neon-cyan">{productName}</h1>
            <p className="text-md text-gray-300 mt-2">{shortDescription}: {description}</p>

            {buildImage && (
              <div className="mt-4">
                <GatsbyImage image={buildImage} alt={productName} className="rounded-lg shadow-md max-w-[400px]" />
              </div>
            )}

            <div className="mt-6">
              <h2 className="text-xl font-bold text-neon-cyan">Detalles del Producto</h2>
              <p className="text-md text-gray-300 mt-2">{longDescription}</p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-neon-cyan">Sistema Operativo</h3>
              <select
                className="bg-gray-700 text-light-gray p-2 rounded-md mt-2"
                value={selectedOS}
                onChange={(e) => setSelectedOS(e.target.value)}
              >
                <option value="Windows 11 Pro">Windows 11 Pro</option>
                <option value="Ubuntu">Ubuntu</option>
              </select>
            </div>
          </div>

          {/* Right Column: Components Table */}
          <div className="md:w-1/2">
            <h2 className="text-xl font-bold text-neon-cyan mb-2">Componentes Incluidos*</h2>
            <div className="bg-carbon-black p-4 rounded-lg shadow-md">
              <table className="w-full text-sm text-gray-300">
                <tbody>
                  {Object.entries(baseComponents).map(([key, component]) => (
                    <tr key={key} className="border-b border-gray-700">
                      <td className="py-1 text-gray-400 uppercase pr-2">{key}</td>
                      <td className="py-1 font-semibold">{component.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Optional Upgrades Table */}
            {optionalUpgrades.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-neon-cyan">Mejoras Opcionales</h3>
                <div className="bg-carbon-black p-4 rounded-lg shadow-md">
                  <table className="w-full text-sm text-gray-300">
                    <tbody>
                      {optionalUpgrades.map((upgrade) => (
                        <tr key={upgrade.name} className="border-b border-gray-700">
                          <td className="py-1">
                            <input
                              type="checkbox"
                              checked={!!selectedUpgrades[upgrade.name]}
                              onChange={() => handleUpgradeChange(upgrade.name, upgrade)}
                            />
                          </td>
                          <td className="py-1 font-semibold">{upgrade.name}</td>
                          <td className="py-1 text-gray-400">
                            {upgrade.price.toLocaleString('es-ES')} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <p className="text-sm text-gray-300 pt-4">
              *En caso de que de algún componente no estuviese disponible, o por fluctuación de precios, tras acuerdo previo, éste se sustituirá por otro de rendimiento, marca y calidad similar.
            </p>
            <p className="text-sm text-gray-300 pt-1">
              **Nos pondremos en contacto contigo para confirmar la instalación de los componentes finales y del sistema operativo (incluido: Windows o Linux).
            </p>

            {/* Total Price & Purchase Button */}
            <div className="mt-6 flex justify-end items-center">
              <div className="text-right mr-8">
                <h3 className="text-xl font-bold text-neon-cyan">Precio Total</h3>
                <p className="text-2xl font-bold text-neon-cyan">{calculateTotalPrice()} €</p>
              </div>
              <div className="text-right">
                <Button onClick={handlePurchase} color="neoncyan" variant="solid" disabled={loading}>
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
