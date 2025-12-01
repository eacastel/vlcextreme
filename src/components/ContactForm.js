import React, { useState } from "react";
import { FaMicrochip, FaGamepad, FaServer, FaDesktop } from "react-icons/fa";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // State for visual selection
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); 
    setIsSubmitting(true);

    const myForm = event.target;
    const formData = new FormData(myForm);
    
    // EXTRACT DATA FOR ENHANCED CONVERSIONS
    const userEmail = formData.get("email"); // Get the email field
    const userName = formData.get("name");   // Get the name (optional but good)

    // 1. Localhost Bypass (For testing without Netlify)
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      setTimeout(() => {
        console.log("📝 [Localhost] Sent:", Object.fromEntries(formData));
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
      return; 
    }

    // 2. Real Netlify Submission
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {

        // ✅ ENHANCED CONVERSION DATALAYER PUSH
        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'generate_lead',
            'form_location': 'contact_form',
            'user_email': userEmail, // Pushing the captured email
            'user_name': userName    // Pushing the captured name
          });
        }

        setSubmitted(true);
        setIsSubmitting(false);
        
        // Reset Form State
        setSelectedBudget("");
        setSelectedType("");
        event.target.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Hubo un error al enviar. Por favor, recarga y prueba de nuevo.");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-dark-gray p-8 rounded-2xl shadow-2xl border border-white/10">
      
      <div className="mb-8 border-b border-white/10 pb-4">
        <h3 className="text-2xl font-bold text-white mb-2">Inicia tu Proyecto</h3>
        <p className="text-sm text-gray-400">Cuéntanos qué necesitas y diseñaremos la arquitectura perfecta.</p>
      </div>

      {submitted ? (
        <div className="bg-neon-green/10 border border-neon-green text-white text-center py-10 rounded-xl animate-fade-in px-4">
          <p className="text-2xl font-bold text-neon-green mb-4">¡Solicitud Recibida!</p>
          <p className="text-gray-300 mb-6">Un ingeniero revisará tus requisitos y te contactaremos en breve.</p>
          <button 
            onClick={() => setSubmitted(false)} 
            className="text-neon-cyan hover:underline text-sm"
          >
            Enviar otra solicitud
          </button>
        </div>
      ) : (
        <form
          name="configurador"
          method="POST"
          action="/" /* Fallback URL */
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <input type="hidden" name="form-name" value="configurador" />
          <p hidden><label>Bot Field: <input name="bot-field" /></label></p>

          {/* 1. DATA */}
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

          {/* 2. USE CASE (Fixed Selection Logic) */}
          <fieldset>
            <legend className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-3">Uso Principal</legend>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "gaming", label: "Gaming Elite", icon: <FaGamepad /> },
                { id: "workstation", label: "Arquitectura / 3D", icon: <FaDesktop /> },
                { id: "ai", label: "Inteligencia Artificial", icon: <FaServer /> },
                { id: "streaming", label: "Streaming", icon: <FaMicrochip /> },
              ].map((type) => (
                <div key={type.id} className="relative">
                  <input 
                    type="radio" 
                    id={`type-${type.id}`} // Unique ID
                    name="tipo" 
                    value={type.label} 
                    className="peer hidden" // Native radio hidden
                    onChange={() => setSelectedType(type.id)}
                    checked={selectedType === type.id}
                    required
                  />
                  <label 
                    htmlFor={`type-${type.id}`} // Connects to input ID
                    className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-2 transition-all duration-200 h-full
                      ${selectedType === type.id 
                        ? "bg-neon-cyan/20 border-neon-cyan text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]" 
                        : "bg-carbon-black border-gray-700 text-gray-400 hover:border-gray-500"
                      }`}
                  >
                    <span className="text-xl mb-1 pointer-events-none">{type.icon}</span>
                    <span className="text-xs font-bold text-center pointer-events-none">{type.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </fieldset>

          {/* 3. BUDGET (Fixed Selection Logic) */}
          <fieldset>
            <legend className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-3">Rango de Inversión</legend>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "2.000€ - 3.000€",
                "3.000€ - 4.500€",
                "4.500€ - 6.000€",
                "+6.000€ (Extreme)"
              ].map((range, index) => (
                <div key={index} className="relative">
                  <input 
                    type="radio" 
                    id={`budget-${index}`} // Unique ID
                    name="presupuesto" 
                    value={range} 
                    className="peer hidden"
                    onChange={() => setSelectedBudget(range)}
                    checked={selectedBudget === range}
                  />
                  <label 
                    htmlFor={`budget-${index}`} // Connects to input ID
                    className={`cursor-pointer border rounded-lg py-3 px-2 text-center transition-all duration-200 flex items-center justify-center h-full
                      ${selectedBudget === range 
                        ? "bg-neon-green/20 border-neon-green text-white font-bold" 
                        : "bg-carbon-black border-gray-700 text-gray-400 hover:border-gray-500 text-sm"
                      }`}
                  >
                    <span className="pointer-events-none">{range}</span>
                  </label>
                </div>
              ))}
            </div>
          </fieldset>

          {/* 4. TECHNICAL */}
          <div className="grid md:grid-cols-2 gap-6">
             <div>
                <label htmlFor="software" className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">Software / Juegos</label>
                <input
                  type="text"
                  id="software"
                  name="software"
                  className="w-full p-3 border border-gray-600 rounded bg-carbon-black text-white focus:border-neon-cyan transition-all text-sm"
                  placeholder="Ej: Revit, Cyberpunk 2077..."
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
                  <option value="1080p">1080p (Competitivo)</option>
                  <option value="1440p">1440p (2K)</option>
                  <option value="4K">4K UHD</option>
                  <option value="Ultrawide">Ultrawide</option>
                </select>
             </div>
          </div>

          {/* 5. MESSAGE */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-neon-cyan uppercase tracking-wider mb-2">Notas / Estética</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              className="w-full p-3 border border-gray-600 rounded bg-carbon-black text-white focus:border-neon-cyan transition-all text-sm"
              placeholder="Ej: Torre negra sin luces, refrigeración líquida, silencio absoluto..."
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