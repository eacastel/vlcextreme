import React from "react";

const CondicionesDeUso = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Condiciones de Uso</h1>

      <p>
        Bienvenido a <strong>VLC Extreme</strong>. Al acceder a nuestro sitio web (<a href="https://vlcextreme.com" className="text-neon-cyan">vlcextreme.com</a>),
        acepta cumplir con estas condiciones de uso.
      </p>

      <h2 className="text-2xl font-bold mt-6">1. Uso del Sitio</h2>
      <p>El contenido de este sitio es solo para uso personal y comercial legítimo. Está prohibido:</p>
      <ul className="list-disc list-inside">
        <li>Distribuir o modificar contenido sin autorización</li>
        <li>Usar el sitio con fines ilícitos</li>
        <li>Intentar acceder a datos privados</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6">2. Propiedad Intelectual</h2>
      <p>Todos los textos, imágenes y código en este sitio están protegidos por derechos de autor. No se permite su uso sin autorización expresa de VLC Extreme.</p>

      <h2 className="text-2xl font-bold mt-6">3. Limitación de Responsabilidad</h2>
      <p>VLC Extreme no se hace responsable de errores en el contenido ni de daños derivados del uso del sitio web.</p>

      <h2 className="text-2xl font-bold mt-6">4. Modificaciones</h2>
      <p>Nos reservamos el derecho de modificar estas condiciones en cualquier momento.</p>
    </div>
  );
};

export default CondicionesDeUso;
