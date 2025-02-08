import React from "react";

const PoliticaDePrivacidad = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>

      <p>
        En <strong>VLC Extreme</strong>, la privacidad de nuestros clientes es una prioridad. Esta política describe
        cómo recopilamos, utilizamos y protegemos su información personal conforme al **Reglamento General de Protección de Datos (RGPD)**
        y la **Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)**.
      </p>

      <h2 className="text-2xl font-bold mt-6">1. Responsable del Tratamiento</h2>
      <p>
        <strong>VLC Extreme</strong><br />
        Email de contacto: <a href="mailto:info@vlcextreme.com" className="text-neon-cyan">info@vlcextreme.com</a>
      </p>

      <h2 className="text-2xl font-bold mt-6">2. Información que Recopilamos</h2>
      <p>Podemos recopilar los siguientes datos personales:</p>
      <ul className="list-disc list-inside">
        <li>Nombre y apellidos</li>
        <li>Correo electrónico</li>
        <li>Dirección de envío y facturación</li>
        <li>Número de teléfono</li>
        <li>Información de pago (procesado de forma segura por terceros como Stripe)</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6">3. Finalidad del Tratamiento</h2>
      <p>Usamos la información recopilada para:</p>
      <ul className="list-disc list-inside">
        <li>Procesar y entregar pedidos</li>
        <li>Gestionar consultas de clientes</li>
        <li>Enviar actualizaciones y ofertas (solo con consentimiento previo)</li>
        <li>Garantizar el cumplimiento legal</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6">4. Derechos del Usuario</h2>
      <p>De acuerdo con el RGPD, usted tiene derecho a:</p>
      <ul className="list-disc list-inside">
        <li>Acceder a sus datos personales</li>
        <li>Rectificar información incorrecta</li>
        <li>Solicitar la eliminación de sus datos</li>
        <li>Oponerse al procesamiento de sus datos</li>
      </ul>

      <p>Para ejercer estos derechos, contacte con nosotros en <a href="mailto:info@vlcextreme.com" className="text-neon-cyan">info@vlcextreme.com</a>.</p>
    </div>
  );
};

export default PoliticaDePrivacidad;
