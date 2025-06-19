import React, { useState, useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

export function Head({ pageContext }) {
  const {
    productName,
    description,
    longDescription,
    slug,
    baseComponents,
    imageKeys,
  } = pageContext;

  const calcularPrecioBase = (baseComponents) => {
    let total = 0;
    for (const key in baseComponents) {
      total += baseComponents[key].price;
    }
    return Math.ceil(total * 1.4);
  };

  const defaultPrice = calcularPrecioBase(baseComponents);

  let imageUrl = "";
  if (imageKeys && imageKeys.length > 0) {
    imageUrl = `https://vlcextreme.com/builds/${imageKeys[0]}`;
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productName,
    description: description || longDescription,
    brand: "VLCExtreme",
    url: `https://vlcextreme.com${slug}`,
    sku: slug.replace(/[^a-zA-Z0-9-]/g, ""),
    image: imageUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: defaultPrice.toString(),
      availability: "https://schema.org/InStock"
    }
  };

  return (
    <>
      <title>{`${productName} - VLCExtreme`}</title>
      <meta name="description" content={description || longDescription} />
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
    </>
  );
};

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.GATSBY_SITE_URL}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-6">
      <PaymentElement />
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <div className="mt-4 text-right md:text-right">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-neon-cyan text-carbon-black px-6 py-2 rounded-md font-bold w-full md:w-auto hover:opacity-90"
        >
          {loading ? "Procesando..." : "Confirmar y pagar"}
        </button>
      </div>
    </form>
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
    const foundImage = data.allFile.edges.find((edge) => edge.node.name === normalizedKey);
    return foundImage ? getImage(foundImage.node.childImageSharp) : getImage(data.noImage.childImageSharp);
  };

  const buildImage = imageKeys.length > 0 ? findImage(imageKeys[0]) : getImage(data.noImage.childImageSharp);

  const [clientSecret, setClientSecret] = useState("");
  const [intentLoading, setIntentLoading] = useState(true);

  useEffect(() => {
  const price = (() => {
    let total = 0;
    Object.values(baseComponents).forEach((comp) => {
      total += comp.price;
    });
    return Math.ceil(total * 1.4);
  })();
  
  const desc = Object.entries(baseComponents)
    .map(([cat, comp]) => `- [${cat}] ${comp.name} => ${comp.price} €`)
    .join("\n");

  fetch("/api/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: productName,
      price,
      description: desc,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setClientSecret(data.clientSecret);
      setIntentLoading(false);
    })
    .catch((err) => {
      console.error("Error creating payment intent:", err);
      setIntentLoading(false);
    });
}, [baseComponents, productName]);

  const calculateFinalPriceNumber = () => {
    let total = 0;
    Object.values(baseComponents).forEach((comp) => {
      total += comp.price;
    });
    return Math.ceil(total * 1.4);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="bg-gray-800 text-light-gray rounded-lg shadow-lg p-6 md:flex md:items-start md:gap-6 md:min-h-[400px]">
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-3xl font-bold text-neon-cyan">{productName}</h1>
            <p className="text-md text-light-gray mt-2">{shortDescription}: {description}</p>
            {buildImage && (
              <div className="mt-4">
                <GatsbyImage image={buildImage} alt={productName} className="rounded-lg shadow-md max-w-[400px]" />
              </div>
            )}
            <p className="text-md text-light-gray mt-4 whitespace-pre-line">{longDescription}</p>
          </div>

          <div className="md:w-1/2 flex flex-col space-y-8 justify-between">
            <div>
              <h2 className="text-xl font-bold text-neon-cyan mb-2">Componentes Incluidos</h2>
              <div className="bg-carbon-black p-4 rounded-lg shadow-md">
                <table className="w-full text-sm text-light-gray">
                  <tbody>
                    {Object.entries(baseComponents).map(([category, comp]) => (
                      <tr key={category} className="border-b border-gray-700">
                        <td className="py-1 text-light-gray uppercase pr-2">{category}</td>
                        <td className="py-1 font-semibold">{comp.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <h3 className="text-xl font-bold text-neon-cyan">Precio Total</h3>
                <p className="text-2xl font-bold text-neon-cyan">{calculateFinalPriceNumber().toLocaleString("es-ES")} €</p>
              </div>
            </div>

            {intentLoading ? (
              <div className="text-center text-light-gray text-sm mt-8">Cargando pasarela de pago segura...</div>
            ) : (
              clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm clientSecret={clientSecret} />
                </Elements>
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
