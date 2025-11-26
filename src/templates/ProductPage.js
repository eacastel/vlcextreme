import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/Layout";
import Button from "../components/Button"; // Using your custom button component
import { 
  FaWhatsapp, 
  FaEnvelope,
  FaMicrochip, 
  FaMemory, 
  FaHdd, 
  FaBox, 
  FaInfoCircle, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaUniversity 
} from "react-icons/fa";

/* 🔹 SEO HEAD */
export function Head({ pageContext }) {
  const { productName, description, longDescription, imageKeys } = pageContext;
  const imageUrl = imageKeys && imageKeys.length > 0 ? `https://vlcextreme.com/builds/${imageKeys[0]}` : "";

  return (
    <>
      <title>{`${productName} - Ingeniería Bajo Pedido | VLCExtreme`}</title>
      <meta name="description" content={description || longDescription} />
      {/* We use Product schema but mark availability as PreOrder/MadeToOrder */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": productName,
          "description": description,
          "brand": "VLCExtreme",
          "image": imageUrl,
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/PreOrder",
            "priceCurrency": "EUR"
          }
        })}
      </script>
    </>
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

  // 2. Price Logic (Estimated Base)
  const calculateFinalPriceNumber = () => {
    let total = 0;
    Object.values(baseComponents).forEach((comp) => {
      total += comp.price;
    });
    // Keeping your 1.4 margin logic
    return Math.ceil(total * 1.4);
  };
  
  const finalPrice = calculateFinalPriceNumber();

  // 3. WhatsApp Link Generation
  // This creates a professional pre-filled message requesting the specific build
  const waMessage = `Hola VLCExtreme, me interesa iniciar el encargo de la arquitectura *${productName}* (Precio est. ${finalPrice.toLocaleString("es-ES")}€). Por favor, confirmadme disponibilidad de componentes y enviadme la factura proforma.`;
  const waLink = `https://wa.me/34963594092?text=${encodeURIComponent(waMessage)}`;

  // Helper icon mapper
  const getIcon = (key) => {
    if (key.includes("CPU")) return <FaMicrochip />;
    if (key.includes("RAM")) return <FaMemory />;
    if (key.includes("Storage")) return <FaHdd />;
    return <FaBox />;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        
        {/* Top Label */}
        <div className="mb-6">
           <span className="text-neon-cyan font-bold tracking-[0.2em] text-xs uppercase border border-neon-cyan/30 px-3 py-1 rounded bg-neon-cyan/5">
              Ingeniería Bajo Pedido
           </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* ---------------- LEFT COLUMN: The Machine ---------------- */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{productName}</h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light border-l-4 border-neon-cyan pl-4">
              {shortDescription}
            </p>

            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-10 bg-dark-gray relative group">
                {buildImage && <GatsbyImage image={buildImage} alt={productName} className="w-full object-cover hover:scale-105 transition-transform duration-700" />}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-xs text-white font-mono">
                   Ref: {productName.replace(/\s+/g, '-').toUpperCase()}
                </div>
            </div>

            {/* The Narrative */}
            <div className="prose prose-invert max-w-none mb-10">
                <h3 className="text-white font-bold text-2xl mb-4">Concepto de Arquitectura</h3>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                    {longDescription}
                </p>
            </div>

            {/* Core Specs */}
            <div className="bg-dark-gray rounded-xl p-8 border border-white/5">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-wider text-sm">
                    <FaMicrochip className="text-neon-cyan"/> Especificaciones Nucleares
                </h3>
                <div className="grid md:grid-cols-2 gap-y-6 gap-x-4">
                    {Object.entries(baseComponents).map(([category, comp]) => (
                      <div key={category} className="flex items-start gap-3">
                        <div className="mt-1 text-gray-500 text-sm">{getIcon(category)}</div>
                        <div>
                            <span className="block text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">{category}</span>
                            <span className="text-white font-medium text-sm">{comp.name}</span>
                        </div>
                      </div>
                    ))}
                </div>
            </div>
          </div>

          {/* ---------------- RIGHT COLUMN: The Deal (No Stripe) ---------------- */}
          <div className="lg:sticky lg:top-24 bg-carbon-black border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl">
            
            {/* 1. Blunt Payment Notification (Yellow Alert) */}
            <div className="bg-neon-yellow/5 border-l-4 border-neon-yellow p-5 mb-8 rounded-r-lg">
              <div className="flex items-start gap-3">
                <FaExclamationTriangle className="text-neon-yellow text-xl flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm uppercase mb-1">Protocolo de Adquisición</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    No almacenamos stock antiguo. <strong>El pago por adelantado es necesario para asegurar la adquisición inmediata de tus componentes</strong> en el mercado global, garantizando el lote de fabricación más reciente (silicio fresco).
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Price Block */}
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-8">
                <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Inversión Estimada</p>
                    <p className="text-4xl font-bold text-white">{finalPrice.toLocaleString("es-ES")} €</p>
                </div>
                <div className="text-right">
                    <span className="block text-neon-green text-xs font-bold mb-1">Montaje e IVA Incl.</span>
                    <span className="text-gray-500 text-[10px] flex items-center justify-end gap-1">
                        <FaUniversity /> Transferencia Bancaria
                    </span>
                </div>
            </div>

            {/* 3. CTA Buttons - Direct Action */}
            <div className="space-y-4 mb-8">
                <Button 
                    to={waLink}
                    external={true}
                    color="neoncyan" 
                    variant="solid"
                    className="w-full flex justify-center items-center gap-2 !py-4 !text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                    <FaWhatsapp /> Iniciar Encargo
                </Button>
                
                <Button 
                    to="/contacto"
                    variant="outline"
                    color="white"
                    className="w-full flex justify-center items-center gap-2"
                >
                    <FaEnvelope /> Solicitar Presupuesto Formal
                </Button>
            </div>

            {/* 4. The Disclaimers (Terms & Conditions) */}
            <div className="space-y-5 pt-4 border-t border-white/5">
                <div className="flex gap-3">
                    <FaInfoCircle className="text-gray-500 flex-shrink-0 mt-0.5 text-xs" />
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                        <strong className="text-gray-300">Flexibilidad de Componentes:</strong> En caso de que algún componente no estuviese disponible, o por una dramática fluctuación de precios, tras acuerdo previo, éste se sustituirá por otro de rendimiento, marca y calidad similar.
                    </p>
                </div>
                <div className="flex gap-3">
                    <FaCheckCircle className="text-gray-500 flex-shrink-0 mt-0.5 text-xs" />
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                        <strong className="text-gray-300">Validación Final:</strong> De cualquier manera nos pondremos en contacto contigo para confirmar la instalación de los componentes finales y del sistema operativo (incluido: Windows o Linux) antes de iniciar el montaje.
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