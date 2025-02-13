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
      const response = await fetch(event.target.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        event.target.reset(); // Reset form after success
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
    <section className="py-20 bg-carbon-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            ¿Tienes dudas? Hablemos.
          </h2>

          {/* Success Message */}
          {submitted ? (
            <div className="bg-neon-green text-black text-center py-4 rounded-md shadow-lg">
              ✅ ¡Tu mensaje ha sido enviado con éxito! Te responderemos pronto.
            </div>
          ) : (
            <form
              className="grid gap-6"
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

              <input
                type="text"
                name="name"
                placeholder="Nombre"
                required
                className="p-3 bg-dark-gray rounded text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="p-3 bg-dark-gray rounded text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
              />

              <select
                name="tipo"
                required
                className="p-3 bg-dark-gray rounded text-light-gray focus:ring-2 focus:ring-neon-cyan"
              >
                <option value="">Tipo de PC que buscas</option>
                <option>Gaming & Streaming</option>
                <option>Workstation IA</option>
                <option>Edición y Producción</option>
                <option>Otro</option>
              </select>

              <textarea
                name="message"
                placeholder="Mensaje"
                rows="4"
                required
                className="p-3 bg-dark-gray rounded text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
              />

              <Button type="submit" color="neon-cyan" className="w-full">
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
              </Button>
            </form>
          )}

         
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
