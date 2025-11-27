// privacidad.js
import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const PoliticaDePrivacidad = () => {
  return (
    <Layout>
      <Seo 
        title="Política de Privacidad | VLCExtreme"
        description="Consulta nuestra Política de Privacidad para conocer cómo protegemos y utilizamos tu información personal en VLCExtreme. Cumplimos con el RGPD y la LSSI-CE."
        pathname="/privacidad"
      />
      
      <div className="bg-carbon-black min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-6">
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">
              Política de Privacidad
            </h1>

            <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                <p>
                  En <strong>VLCExtreme</strong>, la privacidad de nuestros clientes es una prioridad. Esta política explica cómo recopilamos,
                  usamos y protegemos su información personal, en cumplimiento del <strong>Reglamento General de Protección de Datos (RGPD)</strong> y
                  la <strong>Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)</strong>.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Responsable del Tratamiento</h2>
                <p>
                  <strong>VLCExtreme</strong><br />
                  Ubicación: Valencia, España<br />
                  Email de contacto: <a href="mailto:info@vlcextreme.com" className="text-neon-cyan hover:underline">info@vlcextreme.com</a>
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Información que Recopilamos</h2>
                <p>Recopilamos datos personales con las siguientes finalidades:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Nombre y apellidos</li>
                  <li>Correo electrónico</li>
                  <li>Dirección de envío y facturación</li>
                  <li>Número de teléfono</li>
                  <li>Datos de pago (procesados de forma segura por terceros como Stripe, PayPal y criptomonedas)</li>
                  <li>Datos de navegación (cookies y analítica web, con su consentimiento)</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Uso de la Información</h2>
                <p>Usamos la información recopilada para:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Procesar y enviar pedidos personalizados</li>
                  <li>Gestionar consultas y soporte técnico</li>
                  <li>Enviar actualizaciones sobre productos y ofertas (previo consentimiento)</li>
                  <li>Cumplir con regulaciones fiscales y legales</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Base Legal del Tratamiento</h2>
                <p>Tratamos los datos personales según las siguientes bases legales del RGPD:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Ejecución de un contrato:</strong> Procesamiento de pedidos y envíos.</li>
                  <li><strong>Consentimiento explícito:</strong> Suscripción a boletines informativos.</li>
                  <li><strong>Obligación legal:</strong> Facturación y cumplimiento de regulaciones fiscales.</li>
                  <li><strong>Interés legítimo:</strong> Mejora del servicio y prevención de fraudes.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Derechos del Usuario</h2>
                <p>De acuerdo con el RGPD, usted tiene derecho a:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Acceder a sus datos personales</li>
                  <li>Rectificar información incorrecta</li>
                  <li>Solicitar la eliminación de sus datos</li>
                  <li>Restringir u oponerse al procesamiento de sus datos</li>
                  <li>Portar sus datos a otro proveedor</li>
                </ul>

                <p className="mt-4">
                  Puede ejercer estos derechos enviando una solicitud a <a href="mailto:info@vlcextreme.com" className="text-neon-cyan hover:underline">info@vlcextreme.com</a>.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Seguridad y Protección de Datos</h2>
                <p>
                  Implementamos medidas técnicas y organizativas para proteger su información contra accesos no autorizados, pérdida o manipulación.
                  Los datos de pago son gestionados por plataformas de pago certificadas con cifrado de extremo a extremo.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Cookies y Tecnologías de Seguimiento</h2>
                <p>
                  Utilizamos cookies para mejorar la experiencia del usuario y analizar el rendimiento del sitio web. Puede gestionar sus preferencias
                  desde la configuración de su navegador o en nuestra <a href="/cookies" className="text-neon-cyan hover:underline">Política de Cookies</a>.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Transferencias Internacionales de Datos</h2>
                <p>
                  En algunos casos, utilizamos servicios de terceros (como procesadores de pago y almacenamiento en la nube) que pueden transferir datos fuera del Espacio Económico Europeo (EEE).
                  Nos aseguramos de que estas transferencias cumplan con el RGPD y usen mecanismos adecuados como <strong>Cláusulas Contractuales Tipo (SCCs)</strong>.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Modificaciones de la Política</h2>
                <p>
                  Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio será notificado a través de nuestra web.
                </p>

                <h2 className="text-2xl font-bold text-white mt-8 mb-4">10. Contacto</h2>
                <p>
                  Para cualquier consulta sobre esta Política de Privacidad, puede contactarnos en:<br />
                  <a href="mailto:info@vlcextreme.com" className="text-neon-cyan hover:underline">info@vlcextreme.com</a>.
                </p>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default PoliticaDePrivacidad;