import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const CondicionesDeUso = () => {
  return (
    <Layout>
      <Seo 
        title="Condiciones de Uso Web | VLCExtreme"
        description="Aviso legal y condiciones de uso del sitio web vlcextreme.com."
        pathname="/condiciones-de-uso"
      />
      
      <div className="bg-carbon-black min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-6">
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">
              Aviso Legal y Condiciones de Uso
            </h1>

            <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                <p>
                  Bienvenido a <strong>VLCExtreme</strong>. Al acceder y navegar por nuestro sitio web (<a href="https://vlcextreme.com" className="text-neon-cyan">vlcextreme.com</a>),
                  aceptas cumplir con estas condiciones de uso.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Datos Identificativos</h2>
                <p>
                  En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE), se informa que el titular del sitio web es <strong>VLCExtreme</strong>, 
                  con domicilio social en C/ de Dalt, 37, 46003, Valencia, España. Contacto: <a href="mailto:info@vlcextreme.com" className="text-neon-cyan">info@vlcextreme.com</a>.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Uso del Sitio</h2>
                <p>El contenido de este sitio es para información comercial y contratación de servicios de ingeniería. Queda prohibido:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Utilizar el sitio web para actividades ilícitas, ilegales o contrarias a la buena fe.</li>
                  <li>Provocar daños en los sistemas físicos y lógicos de VLCExtreme (hacking, virus, etc.).</li>
                  <li>Intentar acceder a áreas restringidas o datos privados de otros usuarios.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Propiedad Intelectual</h2>
                <p>
                  Todos los textos, imágenes, diseños de arquitecturas, logotipos y código fuente son propiedad exclusiva de VLCExtreme o de terceros que han autorizado su uso. 
                  Queda expresamente prohibida la reproducción, distribución o comunicación pública sin autorización.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Limitación de Responsabilidad</h2>
                <p>
                  VLCExtreme no se hace responsable de los errores u omisiones en los contenidos, ni de la falta de disponibilidad del portal por causas técnicas o de fuerza mayor. 
                  Los precios mostrados en la web son orientativos y no constituyen una oferta vinculante hasta la confirmación del pedido.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Modificaciones</h2>
                <p>
                  Nos reservamos el derecho de modificar el contenido y las condiciones de uso del sitio web en cualquier momento sin previo aviso.
                </p>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default CondicionesDeUso;