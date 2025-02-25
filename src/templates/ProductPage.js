import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/Layout";
import Button from "../components/Button";

// Gatsby SEO approach
export function Head({ pageContext }) {
  const {
    productName,
    description,
    longDescription,
    slug,
    baseComponents,
    imageKeys,
  } = pageContext;

  // Helper function to calculate the default price from base components
  const calcularPrecioBase = (baseComponents) => {
    let total = 0;
    for (const key in baseComponents) {
      total += baseComponents[key].price;
    }
    return Math.ceil(total * 1.4);
  };

  const defaultPrice = calcularPrecioBase(baseComponents);

  // Construct the full URL for the first image
  let imageUrl = "";
  if (imageKeys && imageKeys.length > 0) {
    // Adjust the path if necessary
    imageUrl = `https://vlcextreme.com/builds/${imageKeys[0]}`;
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "description": description || longDescription,
    "brand": "VLCExtreme",
    "url": `https://vlcextreme.com${slug}`,
    "sku": slug.replace(/[^a-zA-Z0-9-]/g, ""),
    "image": imageUrl,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": defaultPrice.toString(),
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <title>{`${productName} - VLCExtreme`}</title>
      <meta name="description" content={description || longDescription} />
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </>
  );
};

const ProductPage = ({ pageContext }) => {
  const {
    productName,
    shortDescription,
    description,
    longDescription,
    imageKeys = [],
    baseComponents = {},
    personalize = [],
  } = pageContext;

  // Query for images
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "builds" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(
                width: 400
                height: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP]
                quality: 90
              )
            }
          }
        }
      }
      noImage: file(relativePath: { eq: "builds/imagen-no-disponible.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90
          )
        }
      }
    }
  `);

  // Find image function
  const findImage = (key) => {
    if (!key) return getImage(data.noImage.childImageSharp);
    const normalizedKey = key
      .replace(/\.(png|jpg|jpeg|webp)$/i, "")
      .replace(/[()]/g, "");
    const foundImage = data.allFile.edges.find(
      (edge) => edge.node.name === normalizedKey
    );
    return foundImage
      ? getImage(foundImage.node.childImageSharp)
      : getImage(data.noImage.childImageSharp);
  };
  const buildImage = imageKeys.length > 0
    ? findImage(imageKeys[0])
    : getImage(data.noImage.childImageSharp);

  // Component state
  const [selectedUpgrades, setSelectedUpgrades] = useState({});
  const [selectedOS, setSelectedOS] = useState("");
  const [loading, setLoading] = useState(false);

  // OS options
  const osOptions = [
    { label: "Ninguno (sin sistema operativo)", value: "", price: 0 },
    { label: "Windows 11 Home", value: "win11home", price: 120 },
    { label: "Windows 11 Pro", value: "win11pro", price: 170 },
    { label: "Ubuntu 22.04 LTS", value: "ubuntu", price: 0 },
    { label: "Rocky Linux 9", value: "rockylinux", price: 0 },
  ];

  // Handlers for upgrades and OS selection
  const handleUpgradeChange = (upgrade) => {
    setSelectedUpgrades((prev) => ({
      ...prev,
      [upgrade.name]: prev[upgrade.name] ? null : upgrade,
    }));
  };
  const handleOSChange = (e) => {
    setSelectedOS(e.target.value);
  };

  // Build final configuration based on baseComponents plus selected upgrades and OS
  const getFinalConfiguration = () => {
    const finalConfig = { ...baseComponents };
    Object.values(selectedUpgrades).forEach((upgrade) => {
      if (!upgrade) return;
      const cat = upgrade.category;
      if (cat && finalConfig[cat]) {
        finalConfig[cat] = {
          name: upgrade.name,
          price: upgrade.price,
          note: upgrade.note || "",
          isSubstitution: true
        };
      } else if (cat) {
        finalConfig[cat] = {
          name: upgrade.name,
          price: upgrade.price,
          note: upgrade.note || "",
          isSubstitution: false
        };
      }
    });
    if (selectedOS) {
      const chosenOS = osOptions.find(o => o.value === selectedOS);
      if (chosenOS) {
        finalConfig["OS"] = {
          name: chosenOS.label,
          price: chosenOS.price,
          isSubstitution: false
        };
      }
    }
    return finalConfig;
  };

  // Calculate final price (number)
  const calculateFinalPriceNumber = () => {
    const config = getFinalConfiguration();
    let total = 0;
    Object.values(config).forEach((comp) => {
      total += comp.price;
    });
    return Math.ceil(total * 1.4);
  };
  const calculateFinalPriceDisplay = () =>
    calculateFinalPriceNumber().toLocaleString("es-ES", { useGrouping: true });

  // Determine table title based on personalization
  const isCustomized =
    Object.values(selectedUpgrades).some((val) => val !== null) || !!selectedOS;
  const table1Title = isCustomized
    ? "Build Personalizado *"
    : "Componentes Preconfigurados *";

  // Array for Table 1 (final configuration)
  const finalConfigObj = getFinalConfiguration();
  const finalConfigArray = Object.entries(finalConfigObj).map(([cat, c]) => ({
    category: cat,
    name: c.name,
    price: c.price,
    note: c.note || "",
    isSubstitution: c.isSubstitution || false
  }));

  // Checkout function
  const handlePurchase = async () => {
    setLoading(true);
    try {
      const lines = finalConfigArray.map((item) => {
        if (item.isSubstitution) {
          return `- [${item.category}] **${item.name}** (Sustitución) => ${item.price} €`;
        }
        return `- [${item.category}] ${item.name} => ${item.price} €`;
      });
      const desc = 
        `${table1Title}: ${productName}\n\n` +
        lines.join("\n") +
        `\n\nPrecio Total: ${calculateFinalPriceNumber()} €`;

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: [
            {
              name: `${table1Title}: ${productName}`,
              price: calculateFinalPriceNumber(),
              description: desc
            }
          ]
        })
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="bg-gray-800 text-light-gray rounded-lg shadow-lg p-6 md:flex md:items-start md:gap-6 md:min-h-[400px]">
          {/* Left Column: Product info */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-3xl font-bold text-neon-cyan">{productName}</h1>
            <p className="text-md text-light-gray mt-2">
              {shortDescription}: {description}
            </p>
            {buildImage && (
              <div className="mt-4">
                <GatsbyImage
                  image={buildImage}
                  alt={productName}
                  className="rounded-lg shadow-md max-w-[400px]"
                />
              </div>
            )}
            <p className="text-md text-light-gray mt-4 whitespace-pre-line">
              {longDescription}
            </p>

          </div>
          {/* Right Column: Tables and total price */}
          <div className="md:w-1/2 flex flex-col space-y-8">
            {/* Table 1: Final Build */}
            <div>
              <h2 className="text-xl font-bold text-neon-cyan mb-2">
                {table1Title}
              </h2>
              <div className="bg-carbon-black p-4 rounded-lg shadow-md">
                <table className="w-full text-sm text-light-gray">
                  <tbody>
                    {finalConfigArray.map((item) => {
                      let displayName = item.name;
                      let nameClasses = "py-1 font-semibold";
                      if (item.isSubstitution) {
                        displayName = `${item.name} **`;
                        nameClasses += " text-neon-cyan";
                      }
                      return (
                        <tr key={item.category} className="border-b border-gray-700">
                          <td className="py-1 text-light-gray uppercase pr-2">
                            {item.category}
                          </td>
                          <td className={nameClasses}>
                            {displayName}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-sm italic text-light-gray pt-1">
              * En caso de que de algún componente no estuviese disponible, o por fluctuación de precios, tras acuerdo previo, éste se sustituirá por otro de rendimiento, marca y calidad equivalente.
            </p>
            </div>
            {/* Table 2: Personalizations */}
            {personalize.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-neon-cyan mb-2">
                  Opciones Disponibles **
                </h3>
                <div className="bg-carbon-black p-4 rounded-lg shadow-md">
                  <table className="w-full text-sm text-light-gray">

                    <tbody>
                      {personalize.map((upgrade) => {
                        const checked = !!selectedUpgrades[upgrade.name];
                        const inputId = `upgrade-${upgrade.category}-${upgrade.name}`;
                        return (
                          <tr key={upgrade.name} className="border-b border-gray-700">
                            <td className="py-1 pr-4">
                              <input
                                type="checkbox"
                                id={inputId}
                                checked={checked}
                                onChange={() => handleUpgradeChange(upgrade)}
                              />
                              <label htmlFor={inputId} className="sr-only">
                                Activar {upgrade.name}
                              </label>
                            </td>
                            <td className="py-1 uppercase">{upgrade.category}</td>
                            <td className="py-1 font-semibold">{upgrade.name}</td>
                            <td className="py-1 text-light-gray">{upgrade.note}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

            <p className="text-sm italic text-light-gray pt-1">
              ** Nos pondremos en contacto contigo para confirmar la instalación de los componentes finales.
            </p>
              </div>
            )}
            {/* Table 3: OS (radio) */}
            <div>
              <h3 className="text-xl font-bold text-neon-cyan mb-2">
                Sistema Operativo
              </h3>
              <div className="bg-carbon-black p-4 rounded-lg shadow-md">
                <table className="w-full text-sm text-light-gray">
                  <tbody>
                    {osOptions.map((os) => {
                      const inputId = `os-${os.value || "none"}`;
                      return (
                        <tr key={os.value} className="border-b border-gray-700">
                          <td className="py-1 pr-4">
                            <input
                              type="radio"
                              id={inputId}
                              name="osSelection"
                              value={os.value}
                              checked={selectedOS === os.value}
                              onChange={handleOSChange}
                            />
                            <label htmlFor={inputId} className="sr-only">
                              Seleccionar {os.label}
                            </label>
                          </td>
                          <td className="py-1 font-semibold">{os.label}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Total Price and Purchase Button */}
            <div className="flex justify-end items-center">
              <div className="text-right mr-8">
                <h3 className="text-xl font-bold text-neon-cyan">
                  Precio Total
                </h3>
                <p className="text-2xl font-bold text-neon-cyan">
                  {calculateFinalPriceDisplay()} €
                </p>
              </div>
              <div className="text-right">
                <Button
                  onClick={handlePurchase}
                  color="neoncyan"
                  variant="solid"
                  disabled={loading}
                >
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
