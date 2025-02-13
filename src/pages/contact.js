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
      />

      <section className="container mx-auto px-6 pt-16">
        <h1 className="text-4xl font-bold text-neon-cyan text-center mb-2">
          Contáctanos
        </h1>

        <p className="text-medium-gray text-center max-w-2xl mx-auto mb-2">
          ¿Tienes dudas sobre nuestros ordenadores personalizados?  
          Envíanos un mensaje y te responderemos lo antes posible.
        </p>

        <ContactForm />

      </section>


    </Layout>
  );
}