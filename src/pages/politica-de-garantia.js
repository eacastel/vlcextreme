import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const GarantiaYVenta = () => {
  return (
    <Layout>
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Términos de Venta y Garantía
        </h1>

        <p className="text-lg mb-6 text-center">
          En VLCExtreme ensamblamos cada PC con los componentes más avanzados y un control de calidad riguroso. A continuación, se detallan las condiciones de venta, garantía y servicio postventa.
        </p>

        {/* 1. Precios y Pago */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Precios y Métodos de Pago</h2>
          <ul className="list-disc list-inside">
            <li>Todos los precios están expresados en <strong>euros (€)</strong> e incluyen el IVA (21%) conforme a la normativa española.</li>
            <li>El precio final incluye los componentes, el ensamblaje y las pruebas de funcionamiento.</li>
            <li>Se acepta pago completo mediante tarjeta de crédito/débito, transferencia bancaria y PayPal.</li>
          </ul>
        </section>

        {/* 2. Envíos y Entrega */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. Envíos y Entrega</h2>
          <ul className="list-disc list-inside">
            <li>El envío es gratuito dentro de la Comunidad Valenciana.</li>
            <li>Para otras regiones de España, los gastos de envío se calcularán según peso y destino.</li>
            <li>El plazo de entrega estimado es de 2 a 3 semanas, sujeto a disponibilidad de componentes.</li>
          </ul>
        </section>

        {/* 3. Garantía */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Garantía</h2>
          <h3 className="text-xl font-semibold mb-2">Garantía de Fabricante</h3>
          <p className="mb-4">
            Cada componente cuenta con la garantía oficial del fabricante (normalmente entre 2 y 5 años, según la marca). Esta garantía cubre defectos de fabricación, pero no daños ocasionados por un uso inadecuado.
          </p>
          <h3 className="text-xl font-semibold mb-2">Garantía de Mano de Obra (12 meses)</h3>
          <p className="mb-4">
            VLCExtreme garantiza 12 meses de mano de obra, cubriendo cualquier incidencia derivada de defectos en el ensamblaje.
          </p>
          <h3 className="text-xl font-semibold mb-2">Exclusiones de Garantía</h3>
          <ul className="list-disc list-inside">
            <li>Daños por manipulación inadecuada, golpes o líquidos.</li>
            <li>Overclocking extremo o modificaciones no autorizadas de hardware/firmware.</li>
            <li>Uso en condiciones ambientales inadecuadas (temperatura o humedad excesivas).</li>
          </ul>
        </section>

        {/* 4. Derecho de Desistimiento */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Derecho de Desistimiento</h2>
          <p>
            Dado que cada PC se ensambla bajo pedido, el derecho de desistimiento no se aplica de la misma forma que en productos estándar. Cualquier cancelación previa al envío podrá incurrir en costes administrativos y de reposición de componentes.
          </p>
        </section>

        {/* 5. Protección de Datos */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">5. Protección de Datos</h2>
          <p>
            VLCExtreme cumple con la normativa vigente de protección de datos (GDPR y LOPD). Garantizamos la confidencialidad y el uso responsable de la información del cliente.
          </p>
        </section>

        {/* 6. Legislación Aplicable */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">6. Legislación Aplicable</h2>
          <p>
            Para cualquier controversia se aplicará la legislación española y se someterá a los juzgados de la provincia de Valencia, salvo que la ley indique lo contrario.
          </p>
        </section>

        <p className="text-sm text-center mt-8">
          VLCExtreme se reserva el derecho a actualizar estos términos en cualquier momento. Última actualización: 24 de febrero de 2025.
        </p>
      </section>
    </Layout>
  );
};

export default GarantiaYVenta;

export const Head = () => (
  <Seo 
    title="Términos de Garantía y Devoluciones | VLCExtreme - PCs Personalizados en Valencia"
    description="Consulta los términos de garantía y devoluciones de VLCExtreme: garantía oficial de componentes, 12 meses de mano de obra y envío incluido."
    pathname="/politica-de-garantia"
  />
);
