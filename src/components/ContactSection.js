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
    <section className="py-20 bg-carbon-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray text-center mb-12">
            ¿Tienes dudas? Hablemos.
          </h2>


          {submitted ? (
            <div className="bg-neon-green text-black text-center py-4 rounded-md shadow-lg" role="alert">
            ¡Tu mensaje ha sido enviado con éxito! Te responderemos pronto.
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-recaptcha="true"
              onSubmit={handleSubmit}
              noValidate
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid gap-6">
                <label className="block text-light-gray">
                  Nombre
                  <input
                    type="text"
                    name="name"
                    required
                    aria-required="true"
                    placeholder="Tu nombre"
                    className="p-3 bg-dark-gray rounded text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
                  />
                </label>

                <label className="block text-light-gray">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    aria-required="true"
                    placeholder="Tu email"
                    className="p-3 bg-dark-gray rounded text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
                  />
                </label>

                <label className="block text-light-gray">
                  Tipo de PC que buscas
                  <select
                    name="tipo"
                    required
                    aria-required="true"
                    className="p-3 bg-dark-gray rounded text-light-gray focus:ring-2 focus:ring-neon-cyan"
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
                    aria-required="true"
                    placeholder="Tu mensaje..."
                    className="p-3 bg-dark-gray rounded text-light-gray placeholder-medium-gray focus:ring-2 focus:ring-neon-cyan"
                  />
                </label>
                <div data-netlify-recaptcha="true" className="mb-4"></div>

                <Button type="submit" color="neon-cyan" className="w-full">
                  {isSubmitting ? "Enviando..." : "Enviar consulta"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
