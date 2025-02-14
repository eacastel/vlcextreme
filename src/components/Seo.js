import * as React from "react";

const Seo = ({ title, description, image, pathname, children }) => {
  const siteUrl = "https://vlcextreme.com";
  const defaultTitle = "VLCExtreme | Ordenadores Gaming y Workstations de Alta Gama";
  const defaultDescription = "Ordenadores de alto rendimiento hechos a medida en Valencia. Soluciones premium para Gamers, Creadores de Contenido y Profesionales de IA.";
  const defaultImage = "/og-vlcextreme-ensamblaje-ordenadores-sobremesa.png";

  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`;
  const url = `${siteUrl}${pathname || "/"}`;

  const globalSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "VLCExtreme",
    "description": defaultDescription,
    "url": siteUrl,
    "logo": `${siteUrl}/vlc-square-for-manifest-w.png`,
    "image": `${siteUrl}/og-vlcextreme-ensamblaje-ordenadores-sobremesa.png`,
    "priceRange": "€€€",
    "areaServed": "ES",
    "availableDeliveryMethod": "OnlineShipping",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "3",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewBody": "Mi PC gaming llegó optimizado al 100% y listo para jugar sin hacer nada más",
        "author": { "@type": "Person", "name": "Juan M." },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
      },
      {
        "@type": "Review",
        "reviewBody": "Mi estación VLCExtreme maneja grandes datasets de IA sin problemas",
        "author": { "@type": "Person", "name": "Laura G." },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
      },
      {
        "@type": "Review",
        "reviewBody": "6 meses de uso y funciona como el primer día",
        "author": { "@type": "Person", "name": "David S." },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
      }
    ]
  };

  return (
    <>
      {/* Standard SEO Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content="Ordenadores de alta gama ensamblados por VLCExtreme para gaming, IA y producción." />

      {/* Twitter Metadata */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Inject Global JSON-LD Schema */}
      <script type="application/ld+json">{JSON.stringify(globalSchema)}</script>

      {children}
    </>
  );
};

export default Seo;
