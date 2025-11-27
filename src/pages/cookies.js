// cookies.js

import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const PoliticaDeCookies = () => {
  return (
    <Layout>
      <Seo
        title="Política de Cookies | VLCExtreme"
        description="Información sobre el uso de cookies y tecnologías de rastreo."
        pathname="/cookies"
      />
      
      <div className="bg-carbon-black min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-6">
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">
              Política de Cookies
            </h1>

            <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                <p>
                  En cumplimiento de la <strong>Ley 34/2002 (LSSI-CE)</strong>, informamos que VLCExtreme utiliza cookies para mejorar la experiencia de navegación y analizar métricas de uso.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. ¿Qué son las cookies?</h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu navegador. No contienen datos personales directos, pero nos permiten recordar tus preferencias (como el contenido de tu configuración actual).
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Tipos de Cookies utilizadas</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Técnicas (Esenciales):</strong> Necesarias para que la web funcione (ej. mantener tu sesión o configuración).</li>
                  <li><strong>Analíticas:</strong> Utilizamos Google Analytics 4 (GA4) de forma anonimizada para entender qué configuraciones son las más visitadas.</li>
                  <li><strong>Publicitarias:</strong> En ocasiones podemos usar Pixel de Meta para medir la efectividad de nuestras campañas en redes sociales.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Gestión de Cookies</h2>
                <p>
                  Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de tu navegador:
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="block p-3 bg-dark-gray border border-white/10 rounded hover:border-neon-cyan transition-colors">Google Chrome</a>
                    <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" className="block p-3 bg-dark-gray border border-white/10 rounded hover:border-neon-cyan transition-colors">Safari</a>
                    <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noreferrer" className="block p-3 bg-dark-gray border border-white/10 rounded hover:border-neon-cyan transition-colors">Mozilla Firefox</a>
                    <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer" className="block p-3 bg-dark-gray border border-white/10 rounded hover:border-neon-cyan transition-colors">Microsoft Edge</a>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default PoliticaDeCookies;