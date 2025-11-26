import React, { useState, useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaMicrochip, FaMemory, FaHdd, FaBox } from "react-icons/fa";

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

/* 🔹 SEO HEAD */
export function Head({ pageContext }) {
  const { productName, description, longDescription, slug, imageKeys } = pageContext;
  const imageUrl = imageKeys && imageKeys.length > 0 ? `https://vlcextreme.com/builds/${imageKeys[0]}` : "";

  return (
    <>
      <title>{`${productName} - Configuración a Medida | VLCExtreme`}</title>
      <meta name="description" content={description || longDescription} />
    </>
  );
}

/* 🔹 STRIPE CHECKOUT FORM */
function CheckoutForm({ price }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;

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
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <PaymentElement />
      
      {errorMessage && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 text-sm p-3 rounded mt-4">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-6 w-full bg-neon-cyan text-carbon-black font-bold py-4 rounded-lg hover:bg-[#008ca6] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
      >
        {loading ? "Procesando..." : `Confirmar Encargo • ${price.toLocaleString("es-ES")} €`}
      </button>
      
      <p className="text-center text-[10px] text-gray-500 mt-3">
        <FaCheckCircle className="inline mr-1"/> Pago seguro cifrado SSL de 256-bit. 
      </p>
    </form>
  );
}

/* 🔹 MAIN PRODUCT PAGE */
const ProductPage = ({ pageContext }) => {
  const {
    productName,
    shortDescription,
    longDescription,
    imageKeys = [],
    baseComponents = {},
  } = pageContext;

  // 1. Image Query Logic
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "builds" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
            }
          }
        }
      }
      noImage: file(relativePath: { eq: "builds/imagen-no-disponible.png" }) {
        childImageSharp {
          gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
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

  // 2. Price Logic
  const calculateFinalPriceNumber = () => {
    let total = 0;
    Object.values(baseComponents).forEach((comp) => {
      total += comp.price;
    });
    return Math.ceil(total * 1.4);
  };
  
  const finalPrice = calculateFinalPriceNumber();

  // 3. Stripe Intent Logic
  const [clientSecret, setClientSecret] = useState("");
  const [intentLoading, setIntentLoading] = useState(true);

  useEffect(() => {
    const desc = Object.entries(baseComponents)
      .map(([cat, comp]) => `- [${cat}] ${comp.name}`)
      .join("\n");

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: productName,
        price: finalPrice,
        description: `Encargo VLCExtreme: ${productName}`, // Cleaner description for Stripe dashboard
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
  }, [baseComponents, productName, finalPrice]);

  // Helper to get icon for specs
  const getSpecIcon = (key) => {
    if (key.includes("CPU")) return <FaMicrochip />;
    if (key.includes("RAM")) return <FaMemory />;
    if (key.includes("Storage")) return <FaHdd />;
    return <FaBox />;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* ---------------- LEFT COLUMN: The Product ---------------- */}
          <div>
            <div className="mb-2">
               <span className="text-neon-cyan font-bold tracking-widest text-xs uppercase">Configuración de Referencia</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{productName}</h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light border-l-4 border-neon-cyan pl-4">
              {shortDescription}
            </p>

            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-10 bg-dark-gray relative group">
                {buildImage && <GatsbyImage image={buildImage} alt={productName} className="w-full object-cover" />}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                    <p className="text-white text-sm font-mono">Architecture: {productName} // Rev. 1.0</p>
                </div>
            </div>

            {/* The Narrative */}
            <div className="prose prose-invert max-w-none mb-10">
                <h3 className="text-white font-bold text-xl mb-4">Concepto de Ingeniería</h3>
                <p className="text-gray-400 whitespace-pre-line leading-relaxed">
                    {longDescription}
                </p>
            </div>

            {/* Simplified Specs List (No Prices, Just Power) */}
            <div className="bg-dark-gray rounded-xl p-6 border border-white/5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <FaMicrochip className="text-neon-cyan"/> Especificaciones Nucleares
                </h3>
                <div className="space-y-3">
                    {Object.entries(baseComponents).map(([category, comp]) => (
                      <div key={category} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-500 text-sm w-24 uppercase font-bold tracking-wider">{category}</span>
                            <span className="text-gray-200 font-medium">{comp.name}</span>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
          </div>

          {/* ---------------- RIGHT COLUMN: The Transaction ---------------- */}
          <div className="lg:sticky lg:top-24 h-fit">
            
            {/* 1. The "Blunt" Payment Notification */}
            <div className="bg-neon-yellow/10 border-l-4 border-neon-yellow p-5 mb-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-neon-yellow text-xl flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm uppercase mb-1">Protocolo de Encargo</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    En VLCExtreme no almacenamos stock antiguo. <strong>El pago por adelantado es necesario para asegurar la adquisición inmediata de tus componentes</strong> en el mercado global, garantizando el lote de fabricación más reciente.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. The Checkout Card */}
            <div className="bg-carbon-black border border-white/10 rounded-xl p-6 shadow-2xl">
                <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-6">
                    <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Inversión Total</p>
                        <p className="text-3xl font-bold text-white">{finalPrice.toLocaleString("es-ES")} €</p>
                    </div>
                    <div className="text-right">
                        <span className="bg-neon-green/20 text-neon-green text-xs font-bold px-2 py-1 rounded">
                            IVA Incluido
                        </span>
                    </div>
                </div>

                {intentLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 text-sm">Conectando con pasarela segura...</p>
                  </div>
                ) : (
                  clientSecret && (
                    <Elements stripe={stripePromise} options={{ 
                        clientSecret,
                        appearance: {
                            theme: 'night',
                            variables: {
                                colorPrimary: '#06b6d4',
                                colorBackground: '#1f1f1f',
                                colorText: '#ffffff',
                            }
                        }
                    }}>
                      <CheckoutForm price={finalPrice} />
                    </Elements>
                  )
                )}
            </div>

            {/* 3. The Disclaimers (Your Text) */}
            <div className="mt-6 space-y-4 px-2">
                <div className="flex gap-3">
                    <FaExclamationTriangle className="text-gray-500 flex-shrink-0 mt-0.5 text-xs" />
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                        <strong>Nota de Disponibilidad:</strong> En caso de que algún componente no estuviese disponible, o por una dramática fluctuación de precios, tras acuerdo previo, éste se sustituirá por otro de rendimiento, marca y calidad similar.
                    </p>
                </div>
                <div className="flex gap-3">
                    <FaCheckCircle className="text-gray-500 flex-shrink-0 mt-0.5 text-xs" />
                    <p className="text-[10px] text-gray-400 leading-relaxed">
                        <strong>Confirmación Final:</strong> De cualquier manera nos pondremos en contacto contigo para confirmar la instalación de los componentes finales y del sistema operativo (incluido: Windows o Linux) antes del ensamblaje.
                    </p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;