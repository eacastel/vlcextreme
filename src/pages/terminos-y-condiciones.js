import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

const TermsPage = () => {
  return (
    <Layout>
      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-light-gray mb-8 text-center">
          Términos y Condiciones Generales
        </h1>

        <p className="text-lg text-light-gray mb-6 text-center">
          Estos Términos y Condiciones regulan la venta, garantía y uso de servicios ofrecidos por  <strong>VLCExtreme</strong>. Al realizar un pedido, el cliente acepta las siguientes condiciones.
        </p>

        {/* Presupuestos y Precios */}
        <section className="mb-10">
          <h2 className="text-2xl text-light-gray font-semibold mb-4">Presupuestos y Precios</h2>
          <ul className="list-disc list-inside text-light-gray">
            <li>Todos los precios están en <strong>euros (€)</strong>.</li>
            <li>El precio incluye los componentes detallados y el ensamblaje si procede.</li>
            <li>El <strong>IVA (Impuesto sobre el Valor Añadido) del 21%</strong> se aplicará en todas las compras dentro de España.</li>
          </ul>
        </section>

        {/* Reserva y Pago */}
        <section className="mb-10">
          <h2 className="text-2xl text-light-gray font-semibold mb-4">Reserva y Pago</h2>
          <ul className="list-disc list-inside text-light-gray">
            <li>Para iniciar el pedido y ensamblaje, se requiere el <strong>pago completo</strong>.</li>
            <li>Métodos de pago aceptados: <strong>Tarjeta de Crédito/Débito (Visa, MasterCard, Amex), Transferencia Bancaria (IBAN España), PayPal, ₿ Bitcoin (BTC), Ξ Ethereum (ETH)</strong>.</li>
            <li>Los pedidos personalizados no pueden modificarse después de la confirmación de pago.</li>
          </ul>
        </section>

        {/* Plazos de Entrega */}
        <section className="mb-10">
          <h2 className="text-2xl text-light-gray font-semibold mb-4">Plazos de Entrega</h2>
          <ul className="list-disc list-inside text-light-gray">
            <li>El tiempo estimado de llegada de los componentes es de <strong>1 a 2 semanas</strong>, dependiendo del stock.</li>
            <li>El ensamblaje y testeo del equipo requiere aproximadamente <strong>1 semana adicional</strong>.</li>
            <li>Si hay retrasos, el cliente será notificado con la nueva fecha de entrega estimada.</li>
          </ul>
        </section>

        {/* Envíos y Transportes */}
        <section className="mb-10">
          <h2 className="text-2xl text-light-gray font-semibold mb-4">Envíos y Transportes</h2>
          <ul className="list-disc list-inside text-light-gray">
            <li>El <strong>envío es gratuito</strong> dentro de la <strong>Comunidad Valenciana</strong>.</li>
            <li>Para otras regiones de España, los gastos de envío varían según el peso y la ubicación.</li>
            <li>Se recomienda contratar <strong>seguro de transporte</strong> para proteger el equipo.</li>
            <li>VLCExtreme <strong>no se hace responsable</strong> de daños ocurridos en tránsito si el cliente opta por envío sin seguro.</li>
          </ul>
        </section>

        {/* Garantías */}
        <section className="mb-10">
          <h2 className="text-2xl text-light-gray font-semibold mb-4">Garantías</h2>
          
          <h3 className="text-xl text-light-gray font-semibold mb-2">Garantía de Fabricante</h3>
          <p className="text-light-gray mb-4">Cada componente tiene la garantía del fabricante (normalmente <strong>entre 2 y 5 años</strong>, según la marca). Esta garantía cubre defectos de fabricación pero no daños causados por mal uso.</p>

          <h3 className="text-xl text-light-gray font-semibold mb-2">Garantía de Mano de Obra VLCExtreme (12 meses)</h3>
          <p className="text-light-gray mb-4">Ofrecemos <strong>12 meses de garantía en la mano de obra</strong>, cubriendo cualquier intervención de reinstalación o ajuste por defectos de ensamblaje.</p>

          <h3 className="text-xl text-light-gray font-semibold mb-2">Exclusiones de Garantía</h3>
          <ul className="list-disc list-inside text-light-gray">
            <li>Daños físicos por accidentes, golpes, líquidos o manipulación incorrecta.</li>
            <li>Overclocking o modificaciones extremas en BIOS/firmware realizadas por el cliente.</li>
            <li>Instalación de software malicioso o uso en condiciones ambientales inadecuadas.</li>
          </ul>
        </section>

        {/* Derecho de Desistimiento */}
        <section className="mb-10">
          <h2 className="text-2xl text-light-gray font-semibold mb-4">Derecho de Desistimiento</h2>
          <p className="text-light-gray">
            Dado que los equipos son ensamblados <strong>a medida</strong>, no se aplican las mismas condiciones de devolución que en productos estándar.  
            Cualquier cancelación antes del envío puede incurrir en <strong>costes de gestión y tasas de reposición</strong>.
          </p>
        </section>

        {/* Protección de Datos */}
        <section className="mb-10">
          <h2 className="text-2xl text-light-gray font-semibold mb-4">Protección de Datos</h2>
          <p className="text-light-gray">
            VLCExtreme cumple con la legislación vigente en <strong>protección de datos (GDPR y LOPD)</strong>. Garantizamos la confidencialidad y el uso responsable de la información proporcionada por el cliente.
          </p>
        </section>

        {/* Legislación Aplicable */}
        <section className="mb-10">
          <h2 className="text-2xl text-light-gray font-semibold mb-4">Jurisdicción y Legislación Aplicable</h2>
          <p className="text-light-gray">
            Para cualquier controversia legal, se aplicará la legislación española y se someterá a los juzgados y tribunales de la provincia de <strong>Valencia</strong>, salvo que la ley disponga lo contrario.
          </p>
        </section>

        <p className="text-sm text-light-gray-400 text-center mt-8">
          VLCExtreme se reserva el derecho a actualizar estos términos en cualquier momento.  
          Última actualización:  <strong>12 de Febrero de 2025</strong>.
        </p>
      </section>
    </Layout>
  )
}

export default TermsPage

export const Head = () => (
  <Seo 
    title="Términos y Condiciones | VLCExtreme - PCs Personalizados en Valencia"
    description="Consulta los términos y condiciones de VLCExtreme: compra segura, garantía, envíos gratis en la Comunidad Valenciana y servicio postventa."
    pathname="/terminos-y-condiciones"
  />
)
