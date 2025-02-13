import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const GarantiaYVenta = () => {
  return (
    <Layout>
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-neon-green mb-8 text-center">
          Términos de Venta y Garantía
        </h1>

        <p className="text-lg text-gray-300 mb-6 text-center">
          En VLCExtreme ensamblamos cada PC con los **componentes más avanzados** y un **control de calidad riguroso**.  
          A continuación, detallamos las **condiciones de venta, garantía y servicio postventa**.
        </p>

        {/* 📌 Precios y Pago */}
        <section className="mb-10">
          <h2 className="text-2xl text-neon-cyan font-semibold mb-4">1. Precios y Métodos de Pago</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>Todos los precios están en **euros (€)** e incluyen el **IVA (21%)** según la normativa española.</li>
            <li>Aceptamos pagos mediante **tarjeta de crédito/débito, transferencia bancaria y PayPal**.</li>
            <li>El pago completo es requerido para iniciar el ensamblaje del pedido.</li>
          </ul>
        </section>

        {/* 🚚 Envíos y Entrega */}
        <section className="mb-10">
          <h2 className="text-2xl text-neon-cyan font-semibold mb-4">2. Envíos y Entrega</h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>El envío es **gratuito dentro de la Comunidad Valenciana**.</li>
            <li>Para el resto de España, los gastos de envío varían según peso y ubicación.</li>
            <li>El **plazo de entrega estimado es de 2 a 3 semanas**, sujeto a disponibilidad de componentes.</li>
          </ul>
        </section>

        {/* 📦 Garantía */}
        <section className="mb-10">
          <h2 className="text-2xl text-neon-cyan font-semibold mb-4">3. Garantía</h2>
          
          <h3 className="text-xl text-neon-green font-semibold mb-2">Garantía de Fabricante</h3>
          <p className="text-gray-300 mb-4">Cada componente tiene su propia **garantía oficial** (entre **2 y 5 años**, según la marca).</p>

          <h3 className="text-xl text-neon-green font-semibold mb-2">Garantía de Mano de Obra (12 meses)</h3>
          <p className="text-gray-300 mb-4">VLCExtreme cubre la mano de obra **durante 12 meses**, para cualquier incidencia derivada de **defectos en el ensamblaje**.</p>

          <h3 className="text-xl text-neon-green font-semibold mb-2">Exclusiones de Garantía</h3>
          <ul className="list-disc list-inside text-gray-300">
            <li>Daños por **manipulación inadecuada** o golpes.</li>
            <li>**Overclocking extremo** sin supervisión técnica.</li>
            <li>Uso en **condiciones ambientales inadecuadas** (temperatura o humedad excesivas).</li>
            <li>Modificaciones no autorizadas de hardware o firmware.</li>
          </ul>
        </section>

        {/* 🔄 Derecho de Desistimiento */}
        <section className="mb-10">
          <h2 className="text-2xl text-neon-cyan font-semibold mb-4">4. Derecho de Desistimiento</h2>
          <p className="text-gray-300">
            Debido a que cada PC se **ensambla bajo pedido**, el derecho de desistimiento **no se aplica** como en productos estándar.  
            Cualquier cancelación antes del envío puede incurrir en **costes administrativos y de reposición de componentes**.
          </p>
        </section>

        {/* 🛡 Protección de Datos */}
        <section className="mb-10">
          <h2 className="text-2xl text-neon-cyan font-semibold mb-4">5. Protección de Datos</h2>
          <p className="text-gray-300">
            VLCExtreme cumple con la normativa de protección de datos **LOPD y GDPR**. Garantizamos la **confidencialidad** y el uso responsable de la información del cliente.
          </p>
        </section>

        {/* ⚖ Legislación Aplicable */}
        <section className="mb-10">
          <h2 className="text-2xl text-neon-cyan font-semibold mb-4">6. Jurisdicción y Legislación Aplicable</h2>
          <p className="text-gray-300">
            Para cualquier controversia, se aplicará la legislación española y se someterá a los juzgados de la **provincia de Valencia**, salvo que la ley indique lo contrario.
          </p>
        </section>

        <p className="text-sm text-gray-400 text-center mt-8">
          VLCExtreme se reserva el derecho a actualizar estos términos en cualquier momento.  
          Última actualización: <strong>1 de Enero de 2025</strong>.
        </p>
      </section>
    </Layout>
  );
};

export default GarantiaYVenta;

export const Head = () => (
  <Seo 
    title="📜 Términos y Garantía | VLCExtreme - PCs Personalizados en Valencia"
    description="Consulta los términos y garantía de VLCExtreme: cobertura de 12 meses en ensamblaje, garantía oficial de componentes y servicio postventa."
    pathname="/garantia-y-venta"
  />
);
