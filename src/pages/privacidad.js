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
      
      <div className="container mx-auto px-6 py-10 text-light-gray">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>

        <p>
          En <strong>VLCExtreme</strong>, la privacidad de nuestros clientes es una prioridad. Esta política explica cómo recopilamos,
          usamos y protegemos su información personal, en cumplimiento del **Reglamento General de Protección de Datos (RGPD)** y
          la **Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)**.
        </p>

        <h2 className="text-2xl font-bold mt-6">1. Responsable del Tratamiento</h2>
        <p>
          <strong>VLCExtreme</strong><br />
          Ubicación: Valencia, España<br />
          Email de contacto: <a href="mailto:info@vlcextreme.com" className="underline">info@vlcextreme.com</a>
        </p>

        <h2 className="text-2xl font-bold mt-6">2. Información que Recopilamos</h2>
        <p>Recopilamos datos personales con las siguientes finalidades:</p>
        <ul className="list-disc list-inside">
          <li>Nombre y apellidos</li>
          <li>Correo electrónico</li>
          <li>Dirección de envío y facturación</li>
          <li>Número de teléfono</li>
          <li>Datos de pago (procesados de forma segura por terceros como Stripe, PayPal y criptomonedas)</li>
          <li>Datos de navegación (cookies y analítica web, con su consentimiento)</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6">3. Uso de la Información</h2>
        <p>Usamos la información recopilada para:</p>
        <ul className="list-disc list-inside">
          <li>Procesar y enviar pedidos personalizados</li>
          <li>Gestionar consultas y soporte técnico</li>
          <li>Enviar actualizaciones sobre productos y ofertas (previo consentimiento)</li>
          <li>Cumplir con regulaciones fiscales y legales</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6">4. Base Legal del Tratamiento</h2>
        <p>Tratamos los datos personales según las siguientes bases legales del RGPD:</p>
        <ul className="list-disc list-inside">
          <li><strong>Ejecución de un contrato:</strong> Procesamiento de pedidos y envíos.</li>
          <li><strong>Consentimiento explícito:</strong> Suscripción a boletines informativos.</li>
          <li><strong>Obligación legal:</strong> Facturación y cumplimiento de regulaciones fiscales.</li>
          <li><strong>Interés legítimo:</strong> Mejora del servicio y prevención de fraudes.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6">5. Derechos del Usuario</h2>
        <p>De acuerdo con el RGPD, usted tiene derecho a:</p>
        <ul className="list-disc list-inside">
          <li>Acceder a sus datos personales</li>
          <li>Rectificar información incorrecta</li>
          <li>Solicitar la eliminación de sus datos</li>
          <li>Restringir u oponerse al procesamiento de sus datos</li>
          <li>Portar sus datos a otro proveedor</li>
        </ul>

        <p>
          Puede ejercer estos derechos enviando una solicitud a <a href="mailto:info@vlcextreme.com" className="underline">info@vlcextreme.com</a>.
        </p>

        <h2 className="text-2xl font-bold mt-6">6. Seguridad y Protección de Datos</h2>
        <p>
          Implementamos medidas técnicas y organizativas para proteger su información contra accesos no autorizados, pérdida o manipulación.
          Los datos de pago son gestionados por plataformas de pago certificadas con cifrado de extremo a extremo.
        </p>

        <h2 className="text-2xl font-bold mt-6">7. Cookies y Tecnologías de Seguimiento</h2>
        <p>
          Utilizamos cookies para mejorar la experiencia del usuario y analizar el rendimiento del sitio web. Puede gestionar sus preferencias
          desde la configuración de su navegador o en nuestra <a href="/cookies" className="underline">Política de Cookies</a>.
        </p>

        <h2 className="text-2xl font-bold mt-6">8. Transferencias Internacionales de Datos</h2>
        <p>
          En algunos casos, utilizamos servicios de terceros (como procesadores de pago y almacenamiento en la nube) que pueden transferir datos fuera del Espacio Económico Europeo (EEE).
          Nos aseguramos de que estas transferencias cumplan con el RGPD y usen mecanismos adecuados como **Cláusulas Contractuales Tipo (SCCs)**.
        </p>

        <h2 className="text-2xl font-bold mt-6">9. Modificaciones de la Política</h2>
        <p>
          Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio será notificado a través de nuestra web.
        </p>

        <h2 className="text-2xl font-bold mt-6">10. Contacto</h2>
        <p>
          Para cualquier consulta sobre esta Política de Privacidad, puede contactarnos en:<br />
          <a href="mailto:info@vlcextreme.com" className="underline">info@vlcextreme.com</a>.
        </p>
      </div>
    </Layout>
  );
};

export default PoliticaDePrivacidad;
