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
  } = pageContext;

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "builds" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
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

  // **Find and return the correct image**
  const findImage = (key) => {
    if (!key) return getImage(data.noImage.childImageSharp);
    const normalizedKey = key.replace(/\.(png|jpg|jpeg|webp)$/i, "").replace(/[()]/g, "");
    const foundImage = data.allFile.edges.find(edge => edge.node.name === normalizedKey);
    return foundImage ? getImage(foundImage.node.childImageSharp) : getImage(data.noImage.childImageSharp);
  };

  // **Use only the first image**
  const buildImage = imageKeys.length > 0 ? findImage(imageKeys[0]) : getImage(data.noImage.childImageSharp);

  // **State for OS Selection**
  const [selectedOS, setSelectedOS] = useState("Windows 11 Pro");

  // **State for Upgrades Selection**
  const [selectedUpgrades, setSelectedUpgrades] = useState({});

  // **Calculate total price with 40% markup**
  const calculateTotalPrice = () => {
    let basePrice = Object.values(baseComponents).reduce((sum, component) => sum + component.price, 0);

    // Add selected upgrades to the price
    Object.keys(selectedUpgrades).forEach((key) => {
      if (selectedUpgrades[key]) {
        basePrice += selectedUpgrades[key].price;
      }
    });

    return Math.ceil(basePrice * 1.4).toLocaleString('es-ES', { useGrouping: true });
  };

  // **Handle Upgrade Selection**
  const handleUpgradeChange = (componentKey, upgrade) => {
    setSelectedUpgrades((prev) => ({
      ...prev,
      [componentKey]: prev[componentKey]?.name === upgrade.name ? null : upgrade, // Toggle selection
    }));
  };

  const [loading, setLoading] = useState(false);

  // **Handle Purchase Process**
  const handlePurchase = async () => {
    if (!Object.keys(baseComponents).length) return;
    setLoading(true);

    // Prepare the final component list (substituting selected upgrades)
    const finalComponents = Object.entries(baseComponents).map(([key, component]) => {
      return selectedUpgrades[key] || component;
    });

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: [
            {
              name: productName,
              slug: slug,
              os: selectedOS,
              components: finalComponents,
              price: Math.ceil(finalComponents.reduce((sum, comp) => sum + comp.price, 0) * 1.4),
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

        {/* Product Card */}
        <div className="bg-gray-800 text-light-gray rounded-lg shadow-lg p-6 md:flex md:items-start md:gap-6 md:min-h-[400px]">
          {/* Left Column: Title, Description, Image */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-3xl font-bold text-neon-cyan">{productName}</h1>
            <p className="text-sm text-gray-300 mt-1">{shortDescription} - {description}</p>

            {compatibleSoftware?.length > 0 && (
              <p className="text-sm text-gray-400 italic mt-2">
                Compatible con: {compatibleSoftware.join(", ")}
              </p>
            )}

            {buildImage && (
              <div className="mt-4">
                <GatsbyImage image={buildImage} alt={productName} className="rounded-lg shadow-md max-w-[400px]" />
              </div>
            )}

            {/* OS Selection */}
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
            <h2 className="text-xl font-bold text-neon-cyan mb-2">Componentes Incluidos</h2>
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
          </div>
        </div>

        {/* Total Price & Purchase Button */}
        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-xl font-bold text-neon-cyan">Precio Total: {calculateTotalPrice()} €</h3>
          <Button onClick={handlePurchase} color="neoncyan" variant="solid" disabled={loading}>
            {loading ? "Procesando..." : "Comprar"}
          </Button>
        </div>

      </div>
    </Layout>
  );
};

export default ProductPage;
