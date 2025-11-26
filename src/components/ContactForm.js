import React, { useState } from "react";
import { FaMicrochip, FaGamepad, FaServer, FaDesktop } from "react-icons/fa";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // State for visual selection (to style the active buttons)
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const encodedData = new URLSearchParams(formData).toString();

    try {
      const response = await fetch(`${window.location.pathname}?no-cache=1`, {
        method: "POST",
        body: encodedData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.ok) {
        setSubmitted(true);
        event.target.reset();
        setSelectedBudget("");
        setSelectedType("");
      } else {
        HTMLFormElement.prototype.submit.call(event.target);
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      HTMLFormElement.prototype.submit.call(event.target);
      return;
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-dark-gray p-8 rounded-2xl shadow-2xl border border-white/10">
      
      {/* Header inside the form card */}
      <div className="mb-8 border-b border-white/10 pb-4">
        <h3 className="text-2xl font-bold text-white mb-2">Inicia tu Proyecto</h3>
        <p className="text-sm text-gray-400">Cuéntanos qué necesitas y diseñaremos la arquitectura perfecta.</p>
      </div>

      {submitted ? (
        <div className="bg-neon-green/10 border border-neon-green text-white text-center py-8 rounded-xl animate-fade-in">
          <p className="text-xl font-bold text-neon-green mb-2">¡Solicitud Recibida!</p>
          <p className="text-gray-300">Un ingeniero revisará tus requisitos y te contactará en breve.</p>
        </div>
      ) : (
        <form
          name="configurador"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <input type="hidden" name="form-name" value="configurador" />
          <p hidden><label>Bot Field: <input name="bot-field" /></label></p>

          {/* 1. DATA: Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-3 border border-gray-600 rounded bg-carbon-black text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all outline-none"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-3 border border-gray-600 rounded bg-carbon-black text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all outline-none"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {/* 2. USE CASE: Visual Selectors */}
          <div>
            <label className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-3">Uso Principal</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "gaming", label: "Gaming Elite", icon: <FaGamepad /> },
                { id: "workstation", label: "Arquitectura / 3D", icon: <FaDesktop /> },
                { id: "ai", label: "Inteligencia Artificial", icon: <FaServer /> },
                { id: "streaming", label: "Streaming / Edición", icon: <FaMicrochip /> },
              ].map((type) => (
                <label 
                  key={type.id}
                  className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-2 transition-all duration-200
                    ${selectedType === type.id 
                      ? "bg-neon-cyan/20 border-neon-cyan text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]" 
                      : "bg-carbon-black border-gray-700 text-gray-400 hover:border-gray-500"
                    }`}
                >
                  <input 
                    type="radio" 
                    name="tipo" 
                    value={type.label} 
                    className="hidden" 
                    onChange={() => setSelectedType(type.id)}
                    required
                  />
                  <span className="text-xl mb-1">{type.icon}</span>
                  <span className="text-xs font-bold text-center">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. BUDGET: Range Selectors */}
          <div>
            <label className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-3">Rango de Inversión</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "2.000€ - 3.000€",
                "3.000€ - 4.500€",
                "4.500€ - 6.000€",
                "+6.000€ (Extreme)"
              ].map((range) => (
                <label 
                  key={range}
                  className={`cursor-pointer border rounded-lg py-3 px-2 text-center transition-all duration-200
                    ${selectedBudget === range 
                      ? "bg-neon-green/20 border-neon-green text-white font-bold" 
                      : "bg-carbon-black border-gray-700 text-gray-400 hover:border-gray-500 text-sm"
                    }`}
                >
                  <input 
                    type="radio" 
                    name="presupuesto" 
                    value={range} 
                    className="hidden" 
                    onChange={() => setSelectedBudget(range)}
                  />
                  {range}
                </label>
              ))}
            </div>
          </div>

          {/* 4. TECHNICAL DETAILS */}
          <div className="grid md:grid-cols-2 gap-6">
             <div>
                <label htmlFor="software" className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">Software / Juegos Clave</label>
                <input
                  type="text"
                  id="software"
                  name="software"
                  className="w-full p-3 border border-gray-600 rounded bg-carbon-black text-white focus:border-neon-cyan transition-all text-sm"
                  placeholder="Ej: Revit, Unreal 5, Cyberpunk 2077..."
                />
             </div>
             <div>
                <label htmlFor="monitor" className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">Resolución Monitor</label>
                <select
                  id="monitor"
                  name="monitor"
                  className="w-full p-3 border border-gray-600 rounded bg-carbon-black text-gray-300 focus:border-neon-cyan transition-all text-sm"
                >
                  <option value="">Seleccionar...</option>
                  <option value="1080p (Competitive)">1080p (Competitivo)</option>
                  <option value="1440p (Balanced)">1440p (2K)</option>
                  <option value="4K (Visual)">4K UHD</option>
                  <option value="Ultrawide">Ultrawide / Multi-monitor</option>
                </select>
             </div>
          </div>

          {/* 5. MESSAGE */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">Notas Adicionales</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              className="w-full p-3 border border-gray-600 rounded bg-carbon-black text-white focus:border-neon-cyan transition-all text-sm"
              placeholder="¿Alguna preferencia estética? (Ej: Torre negra, sin luces, mucho RGB, refrigeración líquida...)"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-neon-green to-neon-cyan text-carbon-black shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
            }`}
          >
            {isSubmitting ? "Procesando..." : "Solicitar Configuración"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;