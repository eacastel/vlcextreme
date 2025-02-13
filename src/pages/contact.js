import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ContactForm from "../components/ContactSection";

export default function ContactPage() {
  return (
    <Layout>
      <Seo 
        title="📞 Contacto | VLCExtreme | Ensamblaje de Ordenadores Personalizados"
        description="¿Tienes dudas o necesitas asesoramiento sobre tu PC personalizado? Contacta con VLCExtreme, expertos en hardware de alto rendimiento."
        pathname="/contact"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "VLCExtreme Contacto",
          "description": "Formulario de contacto para VLCExtreme, especialistas en ordenadores personalizados de alto rendimiento.",
          "url": "https://vlcextreme.com/contact",
          "contactPoint": {
            "@type": "ContactPoint",
            "areaServed": "ES",
            "availableLanguage": ["Spanish", "English"]
          }
        }}
      />

      <section className="container mx-auto px-6 pt-16">
        <h1 className="text-4xl font-bold text-neon-cyan text-center mb-2"  aria-level="1">
          Contáctanos
        </h1>

        <p className="text-medium-gray text-center max-w-2xl mx-auto mb-2" role="presentation">
          ¿Tienes dudas sobre nuestros ordenadores personalizados?  
          Envíanos un mensaje y te responderemos lo antes posible.
        </p>

        <ContactForm />

      </section>
    </Layout>
  );
}
