import React from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const TermsPage = () => {
  return (
    <Layout>
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Términos y Condiciones Generales
        </h1>

        <p className="text-lg mb-6 text-center">
          Estos Términos y Condiciones regulan la venta, garantía y uso de los servicios ofrecidos por <strong>VLCExtreme</strong>. Al realizar un pedido, el cliente acepta las siguientes condiciones.
        </p>

        {/* Presupuestos y Precios */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Presupuestos y Precios</h2>
          <ul className="list-disc list-inside">
            <li>Todos los precios están expresados en <strong>euros (€)</strong>.</li>
            <li>El precio final incluye los componentes detallados, el ensamblaje, las pruebas de funcionamiento y el IVA del 21% conforme a la normativa española.</li>
            <li>Los gastos de envío están incluidos para la Comunidad Valenciana; para otras regiones, se calcularán según peso y destino.</li>
          </ul>
        </section>

        {/* Reserva y Pago */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Reserva y Pago</h2>
          <ul className="list-disc list-inside">
            <li>Se requiere el pago completo para iniciar el pedido y el ensamblaje.</li>
            <li>Métodos de pago aceptados: <strong>Tarjeta de Crédito/Débito, Transferencia Bancaria (IBAN España), PayPal, ₿ Bitcoin (BTC) y Ξ Ethereum (ETH)</strong>.</li>
            <li>Una vez confirmado el pago, no se podrán realizar modificaciones en el pedido.</li>
          </ul>
        </section>

        {/* Disponibilidad y Fluctuación de Precios */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Disponibilidad de Componentes y Fluctuaciones de Precios</h2>
          <ul className="list-disc list-inside">
            <li>VLCExtreme no mantiene stock permanente; cada equipo se ensambla bajo pedido.</li>
            <li>Los precios de los componentes pueden variar según la disponibilidad del mercado. Si algún componente sufre un aumento de precio o se agota antes del envío, se notificará al cliente para evaluar alternativas.</li>
            <li>
              En caso de no encontrar un componente o que su precio sea significativamente mayor, se ofrecerá un componente equivalente o superior. El cliente podrá aceptar la diferencia o rechazar la propuesta, procediéndose al reembolso total o parcial según corresponda.
            </li>
            <li>VLCExtreme no se responsabiliza por las fluctuaciones de precios, pero siempre informará al cliente y buscará la mejor solución.</li>
          </ul>
        </section>

        {/* Plazos de Entrega */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Plazos de Entrega</h2>
          <ul className="list-disc list-inside">
            <li>El tiempo estimado de llegada de los componentes es de 1 a 2 semanas, dependiendo de la disponibilidad.</li>
            <li>El ensamblaje y testeo del equipo requieren aproximadamente 1 semana adicional.</li>
            <li>En caso de retrasos, el cliente será notificado con la nueva fecha de entrega estimada.</li>
          </ul>
        </section>

        {/* Envíos y Transportes */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Envíos y Transportes</h2>
          <ul className="list-disc list-inside">
            <li>El envío es gratuito dentro de la Comunidad Valenciana.</li>
            <li>Para otras regiones, los gastos de envío se calcularán según peso y destino.</li>
            <li>Se recomienda contratar seguro de transporte. Si se opta por envío sin seguro, VLCExtreme no se hace responsable de los daños en tránsito.</li>
          </ul>
        </section>

        {/* Garantías */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Garantías</h2>
          <h3 className="text-xl font-semibold mb-2">Garantía de Fabricante</h3>
          <p className="mb-4">
            Cada componente cuenta con la garantía oficial del fabricante (entre 2 y 5 años, según la marca). Esta garantía cubre defectos de fabricación, excluyendo daños por uso inadecuado.
          </p>
          <h3 className="text-xl font-semibold mb-2">Garantía de Mano de Obra (12 meses)</h3>
          <p className="mb-4">
            VLCExtreme garantiza 12 meses de mano de obra para cubrir incidencias derivadas de defectos en el ensamblaje.
          </p>
          <h3 className="text-xl font-semibold mb-2">Exclusiones de Garantía</h3>
          <ul className="list-disc list-inside">
            <li>Daños físicos por accidentes, golpes, líquidos o manipulación incorrecta.</li>
            <li>Overclocking extremo o modificaciones no autorizadas en BIOS/firmware.</li>
            <li>Uso en condiciones ambientales inadecuadas (temperatura o humedad excesivas).</li>
          </ul>
        </section>

        {/* Derecho de Desistimiento */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Derechos de Desistimiento</h2>
          <p>
            Dado que los equipos se ensamblan a medida, el derecho de desistimiento no se aplica como en productos estándar. Cancelaciones previas al envío podrán generar costes administrativos y de reposición de componentes.
          </p>
        </section>

        {/* Protección de Datos */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Protección de Datos</h2>
          <p>
            VLCExtreme cumple con la normativa de protección de datos (GDPR y LOPD). Se garantiza la confidencialidad y el uso responsable de la información del cliente.
          </p>
        </section>

        {/* Legislación Aplicable */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Legislación Aplicable</h2>
          <p>
            Para cualquier controversia, se aplicará la legislación española y se someterá a los juzgados de la provincia de Valencia, salvo disposición en contrario.
          </p>
        </section>

        <p className="text-sm text-center mt-8">
          VLCExtreme se reserva el derecho a actualizar estos términos en cualquier momento. Última actualización: 24 de febrero de 2025.
        </p>
      </section>
    </Layout>
  );
};

export default TermsPage;

export const Head = () => (
  <Seo 
    title="Términos y Condiciones | VLCExtreme - PCs Personalizados en Valencia"
    description="Consulta los términos y condiciones de VLCExtreme: compra segura, garantía, envíos gratuitos en la Comunidad Valenciana y servicio postventa."
    pathname="/terminos-y-condiciones"
  />
);
