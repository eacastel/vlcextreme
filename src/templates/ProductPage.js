import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/Layout";
import Button from "../components/Button";

// Gatsby v4/v5 SEO approach
export function Head({ pageContext }) {
  const {
    productName,
    description,
    longDescription,
    slug,
  } = pageContext;

  // Marcado Schema.org (Product)
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "description": description || longDescription,
    "brand": "VLCExtreme",
    "url": `https://tusitio.com${slug}`, // Ajusta tu dominio
    "sku": slug.replace(/[^a-zA-Z0-9-]/g, ""),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "9999",
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
}

const ProductPage = ({ pageContext }) => {
  const {
    productName,
    shortDescription,
    description,
    longDescription,
    imageKeys = [],
    baseComponents = {},
    personalize = [],
    slug
  } = pageContext;

  // Consulta de imágenes
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

  // Obtener la imagen principal (o noImage)
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

  // Estados
  const [selectedUpgrades, setSelectedUpgrades] = useState({});
  const [selectedOS, setSelectedOS] = useState("");
  const [loading, setLoading] = useState(false);

  // OS (radio). Precios ocultos, solo para cálculo
  const osOptions = [
    { label: "Ninguno (sin sistema operativo)", value: "", price: 0 },
    { label: "Windows 11 Home", value: "win11home", price: 119 },
    { label: "Windows 11 Pro", value: "win11pro", price: 159 },
    { label: "Ubuntu 22.04 LTS", value: "ubuntu", price: 0 },
  ];

  // Manejadores para upgrades y OS
  const handleUpgradeChange = (upgrade) => {
    setSelectedUpgrades((prev) => ({
      ...prev,
      [upgrade.name]: prev[upgrade.name] ? null : upgrade,
    }));
  };
  const handleOSChange = (e) => {
    setSelectedOS(e.target.value);
  };

  // Construye la configuración final
  const getFinalConfiguration = () => {
    // Clonamos baseComponents para no mutar
    const finalConfig = { ...baseComponents };

    // Aplica las personalizaciones
    Object.values(selectedUpgrades).forEach((upgrade) => {
      if (!upgrade) return;
      const cat = upgrade.category; // "CPU", "GPU", etc.
      if (cat && finalConfig[cat]) {
        // Sustituye
        finalConfig[cat] = {
          name: upgrade.name,
          price: upgrade.price,
          note: upgrade.note || ""
        };
      } else if (cat) {
        // Añade si no estaba
        finalConfig[cat] = {
          name: upgrade.name,
          price: upgrade.price,
          note: upgrade.note || ""
        };
      }
    });

    // Añade OS
    if (selectedOS) {
      const chosenOS = osOptions.find((o) => o.value === selectedOS);
      if (chosenOS) {
        finalConfig["OS"] = {
          name: chosenOS.label,
          price: chosenOS.price
        };
      }
    }

    return finalConfig;
  };

  // Calcula precio total (no se muestra en tablas)
  const calculateFinalPriceNumber = () => {
    const finalConfig = getFinalConfiguration();
    let total = 0;
    Object.values(finalConfig).forEach((comp) => {
      total += comp.price;
    });
    // 40% markup
    return Math.ceil(total * 1.4);
  };

  const calculateFinalPriceDisplay = () => {
    return calculateFinalPriceNumber().toLocaleString("es-ES", {
      useGrouping: true
    });
  };

  // Build Personalizado o Preconfigurado
  const isCustomized =
    Object.values(selectedUpgrades).some((val) => val !== null) ||
    !!selectedOS;
  const finalTableTitle = isCustomized
    ? "Build Personalizado"
    : "Componentes Preconfigurados";

  // Tabla 1: Configuración Final -> array de cat + name
  const finalConfigObj = getFinalConfiguration();
  const finalConfigArray = Object.entries(finalConfigObj).map(([cat, c]) => ({
    category: cat,
    name: c.name,
    price: c.price, // no se muestra, pero se usa en checkout
    note: c.note || ""
  }));

  // Checkout
  const handlePurchase = async () => {
    setLoading(true);
    try {
      // Construir descripción textual con precios (aunque no se muestren)
      const lines = finalConfigArray.map(
        (item) => `- [${item.category}] ${item.name} (${item.price} €)`
      );
      const desc =
        `${finalTableTitle}: ${productName}\n\n` +
        lines.join("\n") +
        `\n\nPrecio Final: ${calculateFinalPriceNumber()} €`;

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: [
            {
              name: `${finalTableTitle}: ${productName}`,
              price: calculateFinalPriceNumber(), // num
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
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // Render
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="bg-gray-800 text-light-gray rounded-lg shadow-lg p-6 md:flex md:items-start md:gap-6 md:min-h-[400px]">

          {/* Columna Izquierda: info del producto */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-3xl font-bold text-neon-cyan">{productName}</h1>
            <p className="text-md text-gray-300 mt-2">
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
            <p className="text-sm text-gray-400 italic mt-4">
              {longDescription}
            </p>
          </div>

          {/* Columna Derecha: tablas y precio */}
          <div className="md:w-1/2 flex flex-col space-y-8">

            {/* TABLA 1 => Build Final (o Preconfigurado) */}
            <div>
              <h2 className="text-xl font-bold text-neon-cyan mb-2">
                {finalTableTitle}
              </h2>
              <div className="bg-carbon-black p-4 rounded-lg shadow-md">
                <table className="w-full text-sm text-gray-300">
                  <tbody>
                    {finalConfigArray.map((item) => (
                      <tr key={item.category} className="border-b border-gray-700">
                        <td className="py-1 text-gray-400 uppercase pr-2">
                          {item.category}
                        </td>
                        <td className="py-1 font-semibold">
                          {item.name}
                          {item.note ? ` (${item.note})` : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABLA 2 => Personalizaciones (checkbox) */}
            {personalize.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-neon-cyan mb-2">
                  Opciones / Personalizaciones
                </h3>
                <div className="bg-carbon-black p-4 rounded-lg shadow-md">
                  <table className="w-full text-sm text-gray-300">
                    <tbody>
                      {personalize.map((upgrade) => {
                        const checked = !!selectedUpgrades[upgrade.name];
                        return (
                          <tr key={upgrade.name} className="border-b border-gray-700">
                            <td className="py-1 pr-4">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleUpgradeChange(upgrade)}
                              />
                            </td>
                            <td className="py-1">
                              <strong>{upgrade.category}</strong> — {upgrade.name}
                              {upgrade.note ? ` (${upgrade.note})` : ""}
                            </td>
                            {/* No price displayed */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TABLA 3 => Sistema Operativo (radio) */}
            <div>
              <h3 className="text-xl font-bold text-neon-cyan mb-2">
                Sistema Operativo
              </h3>
              <div className="bg-carbon-black p-4 rounded-lg shadow-md">
                <table className="w-full text-sm text-gray-300">
                  <tbody>
                    {osOptions.map((os) => (
                      <tr key={os.value} className="border-b border-gray-700">
                        <td className="py-1 pr-4">
                          <input
                            type="radio"
                            name="osSelection"
                            value={os.value}
                            checked={selectedOS === os.value}
                            onChange={handleOSChange}
                          />
                        </td>
                        <td className="py-1 font-semibold">{os.label}</td>
                        {/* No price displayed */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PRECIO TOTAL + BOTÓN */}
            <div className="flex justify-end items-center">
              <div className="text-right mr-8">
                <h3 className="text-xl font-bold text-neon-cyan">Precio Total</h3>
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
