import React, { useState } from "react";
import Button from "./Button";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);

    try {
      const response = await fetch("/", {
        method: "POST",
        body: formData,
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
    <div className="max-w-2xl mx-auto">
      {submitted ? (
        <div
          className="bg-neon-green text-black text-center py-4 rounded-md shadow-lg"
          role="alert"
        >
          ¡Tu mensaje ha sido enviado con éxito! Te responderemos pronto.
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          action="/contact/success"
          data-netlify="true"
          data-netlify-recaptcha="true"
          onSubmit={handleSubmit}
          className="grid gap-6 bg-dark-gray p-8 rounded-xl shadow-lg"
        >
          <input type="hidden" name="form-name" value="contact" />

          <label className="block text-light-gray">
            Nombre Completo
            <input
              type="text"
              name="name"
              required
              placeholder="Tu nombre"
              className="w-full p-3 bg-carbon-black rounded text-white focus:ring-2 focus:ring-neon-cyan"
            />
          </label>

          <label className="block text-light-gray">
            Correo Electrónico
            <input
              type="email"
              name="email"
              required
              placeholder="Tu email"
              className="w-full p-3 bg-carbon-black rounded text-white focus:ring-2 focus:ring-neon-cyan"
            />
          </label>

          <label className="block text-light-gray">
            Tipo de PC que buscas
            <select
              name="tipo"
              required
              className="w-full p-3 bg-carbon-black rounded text-white focus:ring-2 focus:ring-neon-cyan"
            >
              <option value="">Selecciona una opción</option>
              <option>Gaming & Streaming</option>
              <option>Workstation IA</option>
              <option>Edición y Producción</option>
              <option>Otro</option>
            </select>
          </label>

          <label className="block text-light-gray">
            Mensaje
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Tu mensaje..."
              className="w-full p-3 bg-carbon-black rounded text-white focus:ring-2 focus:ring-neon-cyan"
            />
          </label>

          {/* Netlify reCAPTCHA */}
          <div data-netlify-recaptcha="true" className="mb-4"></div>

          <Button type="submit" color="neon-cyan" className="w-full">
            {isSubmitting ? "Enviando..." : "Enviar consulta"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
