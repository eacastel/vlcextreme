import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const GarantiaYVenta = () => {
  return (
    <Layout>

<div className="mx-auto max-w-screen-lg px-4 md:px-8 lg:px-16">
<section className="container mx-auto px-6 py-16 text-light-gray">
      <section className="container mx-auto px-6 py-16 text-light-gray">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Condiciones de Venta y Garantía
        </h1>

        <p className="text-lg mb-6 text-center">
          En VLCExtreme ensamblamos cada PC con los componentes más avanzados y un control de calidad riguroso. Al realizar tu compra, aceptas las siguientes condiciones de venta y garantía.
        </p>

        {/* 1. Precios y Pago */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Precios y Métodos de Pago</h2>
          <ul className="list-disc list-inside">
            <li>
              Todos los precios están expresados en <strong>euros (€)</strong> e incluyen el <strong>IVA del 21%</strong> conforme a la normativa española.
            </li>
            <li>
              El precio final incluye todos los componentes, el ensamblaje, las pruebas de funcionamiento y los gastos de envío (con seguro incluido cuando corresponda).
            </li>
            <li>
              Se requiere el pago completo mediante tarjeta de crédito/débito, transferencia bancaria o PayPal para iniciar el pedido.
            </li>
          </ul>
        </section>

        {/* 2. Envíos y Entrega */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. Envíos y Entrega</h2>
          <ul className="list-disc list-inside">
            <li>El envío es gratuito dentro de la Comunidad Valenciana.</li>
            <li>
              Para el resto de España, los gastos de envío se calcularán según el peso y la ubicación.
            </li>
            <li>
              El plazo de entrega estimado es de 2 a 3 semanas, sujeto a la disponibilidad de componentes.
            </li>
          </ul>
        </section>

        {/* 3. Garantía */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Garantía</h2>
          
          <h3 className="text-xl font-semibold mb-2">Garantía de Fabricante</h3>
          <p className="mb-4">
            Cada componente cuenta con la garantía oficial del fabricante (entre 2 y 5 años, según la marca). Esta garantía cubre defectos de fabricación, pero no daños ocasionados por un uso inadecuado.
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

        {/* 4. Condiciones de Devolución */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Condiciones de Devolución</h2>
          <p className="mb-4">
            Debido a que cada PC se ensambla bajo pedido y se somete a rigurosas pruebas de funcionamiento, <strong>todas las compras son finales</strong>. No se aceptan devoluciones ni cambios una vez confirmado el pago. Cualquier cancelación previa al envío podrá incurrir en costes administrativos y de reposición de componentes.
          </p>
          <p className="mb-4">
            Además, todos los equipos se envían con seguro de transporte, lo que garantiza que, en caso de incidencias durante el envío, se tomarán las medidas oportunas para proteger el producto.
          </p>
        </section>

        {/* 5. Protección de Datos */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">5. Protección de Datos</h2>
          <p className="mb-4">
            VLCExtreme cumple con la normativa vigente de protección de datos (GDPR y LOPD). Garantizamos la confidencialidad y el uso responsable de la información proporcionada por el cliente.
          </p>
        </section>

        {/* 6. Legislación Aplicable */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">6. Legislación Aplicable</h2>
          <p className="mb-4">
            Para cualquier controversia, se aplicará la legislación española y se someterá a los juzgados de la provincia de Valencia, salvo que la ley indique lo contrario.
          </p>
        </section>

        <p className="text-sm text-center mt-8">
          VLCExtreme se reserva el derecho a actualizar estos términos en cualquier momento. Última actualización: 1 de Enero de 2025.
        </p>
      </section>
      </section>
      </div>
    </Layout>
  );
};

export default GarantiaYVenta;

export const Head = () => (
  <Seo 
    title="Condiciones de Venta y Garantía | VLCExtreme - PCs Personalizados en Valencia"
    description="Consulta las condiciones de venta y garantía de VLCExtreme: todas las compras son finales, sin devoluciones, con garantía oficial de componentes y 12 meses de mano de obra. IVA incluido."
    pathname="/condiciones-de-venta-y-garantia"
  />
);
