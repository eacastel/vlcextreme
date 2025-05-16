import React from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const TermsPage = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-screen-lg px-4 md:px-8 lg:px-16">
        <section className="container mx-auto px-6 py-16 text-light-gray">
        <section className="container mx-auto px-6 py-16 text-light-gray">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Términos y Condiciones Generales
        </h1>

        <p className="text-lg mb-6 text-center">
          Estos términos regulan la venta, garantía y condiciones generales de los servicios ofrecidos por <strong>VLCExtreme</strong>. Al realizar un pedido, el cliente acepta todas las condiciones aquí establecidas.
        </p>

        {/* 1. Presupuestos y Precios */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. Presupuestos y Precios</h2>
          <ul className="list-disc list-inside">
            <li>
              Todos los precios se expresan en <strong>euros (€)</strong> e incluyen el <strong>IVA del 21%</strong>.
            </li>
            <li>
              El precio final abarca los componentes, el ensamblaje, las pruebas de funcionamiento y los gastos de envío (con seguro incluido cuando corresponda).
            </li>
          </ul>
        </section>

        {/* 2. Reserva y Pago */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. Reserva y Pago</h2>
          <ul className="list-disc list-inside">
            <li>
              El pago completo es necesario para iniciar el ensamblaje del equipo.
            </li>
            <li>
              Métodos de pago aceptados: <strong>Tarjeta de Crédito/Débito, Transferencia Bancaria, PayPal, ₿ Bitcoin (BTC) y Ξ Ethereum (ETH)</strong>.
            </li>
            <li>
              Una vez confirmado el pago, no se podrán realizar modificaciones en el pedido.
            </li>
          </ul>
        </section>

        {/* 3. Disponibilidad y Fluctuación de Precios */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">3. Disponibilidad y Fluctuación de Precios</h2>
          <ul className="list-disc list-inside">
            <li>
              Los componentes se adquieren bajo pedido, sin stock permanente.
            </li>
            <li>
              Los precios pueden variar según la disponibilidad del mercado. Si se produce un aumento de precio o se agota un componente antes del envío, se informará al cliente y se evaluarán alternativas.
            </li>
            <li>
              En caso de no encontrar un componente o que su precio sea significativamente mayor, se ofrecerá un componente equivalente o superior. Si no se llega a un acuerdo, se procederá al reembolso total o parcial del pedido.
            </li>
          </ul>
        </section>

        {/* 4. Plazos de Entrega */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">4. Plazos de Entrega</h2>
          <ul className="list-disc list-inside">
            <li>
              El tiempo estimado para la llegada de los componentes es de 1 a 2 semanas, dependiendo de la disponibilidad.
            </li>
            <li>
              El ensamblaje y testeo del equipo requieren aproximadamente 1 semana adicional.
            </li>
            <li>
              En caso de retrasos, se notificará al cliente oportunamente.
            </li>
          </ul>
        </section>

        {/* 5. Condiciones Finales de Compra */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">5. Condiciones Finales de Compra</h2>
          <p className="mb-4">
            Todas las compras son <strong>finales</strong>. Dado que cada equipo se ensambla a medida y se somete a rigurosas pruebas de funcionamiento, <strong>no se aceptan devoluciones ni cambios</strong> una vez confirmado el pago. Cualquier cancelación previa al envío podrá generar costes administrativos y de reposición de componentes.
          </p>
        </section>

        {/* 6. Protección de Datos */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">6. Protección de Datos</h2>
          <p className="mb-4">
            VLCExtreme cumple con la normativa de protección de datos (GDPR y LOPD). Se garantiza la confidencialidad y el uso responsable de los datos del cliente.
          </p>
        </section>

        {/* 7. Legislación Aplicable */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">7. Legislación Aplicable</h2>
          <p className="mb-4">
            Para cualquier controversia, se aplicará la legislación española y se someterá a los juzgados de la provincia de Valencia, salvo que la ley disponga lo contrario.
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

export default TermsPage;

export const Head = () => (
  <Seo
    title="Términos y Condiciones | VLCExtreme - PCs Personalizados en Valencia"
    description="Consulta los términos y condiciones de VLCExtreme: compra segura, garantía, envíos gratuitos en la Comunidad Valenciana y servicio postventa."
    pathname="/terminos-y-condiciones"
  />
);
