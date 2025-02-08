import React, { useState } from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);

    try {
      const response = await fetch(event.target.action, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        event.target.reset(); // Reset form after success
      } else {
        alert('Error al enviar el mensaje. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Hubo un problema con el envío.');
    }

    setIsSubmitting(false);
  };

  return (
    <Layout>
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neon-cyan text-center mb-8">
          Contáctanos
        </h1>

        <p className="text-medium-gray text-center max-w-2xl mx-auto mb-12">
          ¿Tienes dudas sobre nuestros ordenadores personalizados?  
          Envíanos un mensaje y te responderemos lo antes posible.
        </p>

        {/* Success Message */}
        {submitted ? (
          <div className="bg-neon-green text-black text-center py-4 rounded-md shadow-lg max-w-lg mx-auto">
            ✅ ¡Tu mensaje ha sido enviado con éxito! Te responderemos pronto.
          </div>
        ) : (
          <form
            className="max-w-2xl mx-auto bg-dark-gray p-8 rounded-xl shadow-lg"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/contact/success"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                No llenar: <input name="bot-field" />
              </label>
            </p>

            <div className="mb-6">
              <label htmlFor="name" className="block text-light-gray font-semibold mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-3 border border-medium-gray rounded bg-carbon-black text-white focus:ring-2 focus:ring-neon-green"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-light-gray font-semibold mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-3 border border-medium-gray rounded bg-carbon-black text-white focus:ring-2 focus:ring-neon-green"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-light-gray font-semibold mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full p-3 border border-medium-gray rounded bg-carbon-black text-white focus:ring-2 focus:ring-neon-green"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 rounded-md font-bold text-black transition-all duration-200 ${
                isSubmitting
                  ? 'bg-medium-gray cursor-not-allowed'
                  : 'bg-neon-cyan hover:bg-neon-green hover:shadow-[0_0_15px_#00FF87]'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        )}
      </section>
    </Layout>
  );
}

export const Head = () => (
  <Seo 
    title="📞 Contacto | VLCExtreme | Ensamblaje de Ordenadores Personalizados"
    description="¿Tienes dudas o necesitas asesoramiento sobre tu PC personalizado? Contacta con VLCExtreme, expertos en hardware de alto rendimiento."
    pathname="/contact"
  />
);
