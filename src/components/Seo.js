import * as React from "react";

const Seo = ({ title, description, image, pathname, children }) => {
  const siteUrl = "https://vlcextreme.com";
  const defaultTitle = "VLCExtreme | Ordenadores Gaming y Workstations de Alta Gama";
  const defaultDescription = "Ordenadores de alto rendimiento hechos a medida en Valencia. Soluciones premium para Gamers, Creadores de Contenido y Profesionales de IA.";
  const defaultImage = "https://vlcextreme.com/og-vlcextreme-ordenadores-sobremesa-extremos.png";

  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image?.startsWith("http")
  ? image
  : `${siteUrl}${image || defaultImage}`;
  const url = `${siteUrl}${pathname || "/"}`;

  const globalSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "name": "VLCExtreme",
    "description": defaultDescription,
    "url": "https://vlcextreme.com/",
    "logo": "https://vlcextreme.com/favicon-512x512.png",
    "image": "https://vlcextreme.com/og-vlcextreme-ordenadores-sobremesa-extremos.png",
    "priceRange": "€€€",
    "areaServed": "ES",
    "availableDeliveryMethod": "OnlineShipping",
    "brand": [
      {
        "@type": "Brand",
        "name": "Intel",
        "logo": `${siteUrl}/brands/intel-logo.png`,
        "url": "https://www.intel.es"
      },
      {
        "@type": "Brand",
        "name": "AMD",
        "logo": `${siteUrl}/brands/amd-logo.png`,
        "url": "https://www.amd.com"
      },
      {
        "@type": "Brand",
        "name": "NVIDIA",
        "logo": `${siteUrl}/brands/nvidia-logo.png`,
        "url": "https://www.nvidia.com"
      },
      {
        "@type": "Brand",
        "name": "ASUS",
        "logo": `${siteUrl}/brands/asus-logo.png`,
        "url": "https://www.asus.com"
      },
      {
        "@type": "Brand",
        "name": "MSI",
        "logo": `${siteUrl}/brands/msi-logo.png`,
        "url": "https://www.msi.com"
      },
      {
        "@type": "Brand",
        "name": "Corsair",
        "logo": `${siteUrl}/brands/corsair-logo.png`,
        "url": "https://www.corsair.com"
      },
      {
        "@type": "Brand",
        "name": "G.Skill",
        "logo": `${siteUrl}/brands/gskill-logo.png`,
        "url": "https://www.gskill.com"
      },
      {
        "@type": "Brand",
        "name": "Lian Li",
        "logo": `${siteUrl}/brands/lian-li-logo.png`,
        "url": "https://www.lian-li.com"
      }
    ],
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
