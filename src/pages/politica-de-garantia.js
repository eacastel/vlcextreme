import React from "react";

const GarantiaYVenta = () => {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Términos de Venta y Garantía</h1>

      <h2 className="text-2xl font-bold mt-6">1. Precios y Pagos</h2>
      <p>Los precios mostrados en nuestro sitio web incluyen impuestos aplicables. Los métodos de pago aceptados incluyen tarjeta de crédito/débito y transferencias bancarias.</p>

      <h2 className="text-2xl font-bold mt-6">2. Envíos y Entregas</h2>
      <p>Enviamos pedidos a toda España. Los tiempos de entrega pueden variar según la personalización del equipo.</p>

      <h2 className="text-2xl font-bold mt-6">3. Política de Devoluciones</h2>
      <p>Las devoluciones solo se aceptan dentro de los primeros 14 días hábiles después de la entrega, y el producto debe estar en su estado original.</p>

      <h2 className="text-2xl font-bold mt-6">4. Garantía</h2>
      <p>
        Todos nuestros productos incluyen una garantía de **2 años** contra defectos de fabricación. La garantía no cubre daños por uso inadecuado o modificaciones no autorizadas.
      </p>

      <h2 className="text-2xl font-bold mt-6">5. Atención al Cliente</h2>
      <p>Para cualquier consulta, contáctenos en <a href="mailto:info@vlcextreme.com" className="text-neon-cyan">info@vlcextreme.com</a>.</p>
    </div>
  );
};

export default GarantiaYVenta;
