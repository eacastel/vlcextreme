import React, { useState } from "react";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const encodedData = new URLSearchParams(formData).toString(); // Ensures Netlify reads the data correctly

    try {
      const response = await fetch("/", {
        method: "POST",
        body: encodedData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      if (response.ok) {
        setSubmitted(true);
        event.target.reset();
      } else {
        alert("Error al enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Hubo un problema con el envío.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-dark-gray p-8 rounded-xl shadow-lg border border-gray-600">
      {submitted ? (
        <div className="bg-neon-cyan text-black text-center py-4 rounded-md shadow-lg">
          ✅ ¡Tu mensaje ha sido enviado con éxito! Te responderemos pronto.
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-recaptcha="true"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />

          <div className="mb-6">
            <label htmlFor="name" className="block text-neon-cyan font-semibold mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Tu nombre"
              className="w-full p-3 border border-gray-500 rounded bg-carbon-black text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-neon-cyan font-semibold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Tu email"
              className="w-full p-3 border border-gray-500 rounded bg-carbon-black text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="tipo" className="block text-neon-cyan font-semibold mb-2">
              Tipo de PC que buscas
            </label>
            <select
              id="tipo"
              name="tipo"
              required
              className="w-full p-3 border border-gray-500 rounded bg-carbon-black text-light-gray focus:ring-2 focus:ring-neon-cyan"
            >
              <option value="">Selecciona una opción</option>
              <option>Gaming & Streaming</option>
              <option>Workstation IA</option>
              <option>Edición y Producción</option>
              <option>Otro</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-neon-cyan font-semibold mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              placeholder="Tu mensaje..."
              className="w-full p-3 border border-gray-500 rounded bg-carbon-black text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
            ></textarea>
          </div>

          {/* Netlify reCAPTCHA */}
          <div data-netlify-recaptcha="true" className="mb-4"></div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-md font-bold transition-all duration-200 text-carbon-black ${
              isSubmitting
                ? "bg-medium-gray cursor-not-allowed"
                : "bg-neon-cyan hover:bg-neon-cyan hover:shadow-[0_0_15px_#00A4C4]"
            }`}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
