import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <Layout>
      <Seo 
        title="Contacto | VLCExtreme | Ensamblaje de Ordenadores Personalizados"
        description="¿Tienes dudas o necesitas asesoramiento sobre tu PC personalizado? Contacta con VLCExtreme, expertos en hardware de alto rendimiento."
        pathname="/contacto/"
      />

      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neon-cyan text-center mb-8">
          Contáctanos
        </h1>

        <p className="text-medium-gray text-center max-w-2xl mx-auto mb-12">
          ¿Tienes dudas sobre nuestros ordenadores personalizados?  
          Envíanos un mensaje y te responderemos lo antes posible.
        </p>

        {/* Contact Form Component */}
        <ContactForm />
      </section>

      {/* 🔹 Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contacto VLCExtreme",
          "description": "Contacta con VLCExtreme para asesoramiento sobre ordenadores personalizados de alto rendimiento.",
          "url": "https://vlcextreme.com/contacto/",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+34 600 000 000",
            "contactType": "customer support",
            "areaServed": "ES",
            "availableLanguage": ["Spanish", "English"]
          }
        })}
      </script>
    </Layout>
  );
}
