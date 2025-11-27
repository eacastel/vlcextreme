// condiciones-de-venta-y-garantia.js
import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { FaShieldAlt, FaTruck, FaFileContract } from 'react-icons/fa';

const GarantiaYVenta = () => {
  return (
    <Layout>
      <Seo 
        title="Condiciones de Venta y Garantía | VLCExtreme"
        description="Contrato de compraventa, política de 'Ingeniería Bajo Pedido', garantía de 3 años y protocolo de envíos."
        pathname="/condiciones-de-venta-y-garantia"
      />

      <div className="bg-carbon-black min-h-screen pb-20 pt-24">
        <div className="max-w-4xl mx-auto px-6">
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 text-center">
              Condiciones de Venta y Garantía
            </h1>

            {/* Visual Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-dark-gray p-6 rounded-xl border border-white/5 text-center">
                    <FaFileContract className="text-neon-cyan text-3xl mx-auto mb-3"/>
                    <h3 className="font-bold text-white">Contrato a Medida</h3>
                    <p className="text-xs text-gray-400">Ingeniería bajo pedido</p>
                </div>
                <div className="bg-dark-gray p-6 rounded-xl border border-white/5 text-center">
                    <FaTruck className="text-neon-green text-3xl mx-auto mb-3"/>
                    <h3 className="font-bold text-white">Envío Blindado</h3>
                    <p className="text-xs text-gray-400">Seguro 100% valor</p>
                </div>
                <div className="bg-dark-gray p-6 rounded-xl border border-white/5 text-center">
                    <FaShieldAlt className="text-purple-500 text-3xl mx-auto mb-3"/>
                    <h3 className="font-bold text-white">3 Años Garantía</h3>
                    <p className="text-xs text-gray-400">RDL 7/2021</p>
                </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                
                <p className="text-sm italic mb-8">
                    Estas condiciones regulan la compraventa de equipos informáticos personalizados entre VLCExtreme ("El Vendedor") y el Cliente ("El Comprador"). Al realizar un pago o reserva, el Cliente acepta estas condiciones.
                </p>

                {/* 1. MODELO DE NEGOCIO */}
                <section className="mb-12 border-b border-white/5 pb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">1. Precios y Naturaleza del Pedido</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Precios Estimados:</strong> Los precios mostrados en la web son referencias basadas en el mercado actual. Debido a la volatilidad del sector de semiconductores, el <strong>Precio Final Vinculante</strong> se confirmará mediante Factura Proforma antes del pago.
                        </li>
                        <li>
                            <strong>Ingeniería Bajo Pedido:</strong> VLCExtreme no mantiene stock de equipos terminados. Cada PC se manufactura específicamente para el cliente tras la confirmación del pago.
                        </li>
                        <li>
                            <strong>Impuestos:</strong> Todos los precios finales incluyen el <strong>IVA (21%)</strong> aplicable en España.
                        </li>
                    </ul>
                </section>

                {/* 2. PAGOS */}
                <section className="mb-12 border-b border-white/5 pb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">2. Pagos y Reserva</h2>
                    <p className="mb-4">
                        Para iniciar el aprovisionamiento de componentes y reservar el slot de ingeniería, se requiere el abono del importe acordado.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Aceptamos Transferencia Bancaria (Recomendado para importes mayores de 2.000€), Tarjetas y Criptomonedas (BTC/ETH bajo consulta).</li>
                        <li>En caso de rotura de stock global de un componente tras el pago, se ofrecerá una alternativa de igual o superior rendimiento. Si no hay acuerdo, se procederá al reembolso íntegro inmediato.</li>
                    </ul>
                </section>

                {/* 3. ENVÍOS */}
                <section className="mb-12 border-b border-white/5 pb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">3. Plazos y Envíos</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Plazo Estimado:</strong> 10 a 15 días laborables (incluye adquisición, montaje y testeo de 24h).</li>
                        <li><strong>Comunidad Valenciana:</strong> Envío gratuito y entrega personal por técnico especializado (según zona).</li>
                        <li><strong>Resto de España:</strong> Envío asegurado. El equipo viaja con protección interna (Espuma Expansiva Instapak) para inmovilizar la GPU. Es responsabilidad del cliente retirar esta protección antes de encender el equipo.</li>
                    </ul>
                </section>

                {/* 4. POLÍTICA DE DEVOLUCIONES (El punto crítico) */}
                <section className="mb-12 border-b border-white/5 pb-8 bg-dark-gray p-6 rounded-lg border-l-4 border-neon-yellow">
                    <h2 className="text-2xl font-bold text-white mb-4">4. Política de Devoluciones y Desistimiento</h2>
                    <p className="mb-4">
                        De conformidad con el <strong>Artículo 103.c del RDL 1/2007</strong>, el derecho de desistimiento <strong>no es aplicable</strong> a bienes confeccionados conforme a las especificaciones del consumidor o claramente personalizados.
                    </p>
                    <p>
                        Al ser equipos ensamblados a medida, <strong>no se admiten devoluciones por cambio de opinión</strong> una vez los componentes han sido desprecintados y ensamblados. VLCExtreme sí cubre cualquier falta de conformidad o defecto de fabricación a través de la Garantía.
                    </p>
                </section>

                {/* 5. GARANTÍA */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">5. Garantía Legal (3 Años)</h2>
                    <p className="mb-4">
                        Ofrecemos <strong>3 años de garantía</strong> en todos los componentes hardware y 12 meses de soporte sobre el montaje y configuración.
                    </p>
                    <h3 className="text-lg font-bold text-white mt-4 mb-2">Cobertura:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Fallos de hardware (CPU, GPU, Placa, etc.).</li>
                        <li>Defectos de ensamblaje o refrigeración.</li>
                        <li>Gestión integral del RMA con los fabricantes.</li>
                    </ul>
                    <h3 className="text-lg font-bold text-white mt-4 mb-2">Exclusiones:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Daños accidentales (golpes, líquidos, subidas de tensión externas).</li>
                        <li>Modificaciones de BIOS/Overclocking agresivo realizado por el usuario.</li>
                        <li>Problemas de software (virus, corrupción de Windows) ajenos al hardware.</li>
                    </ul>
                </section>

                <p className="text-sm text-gray-500 mt-12 border-t border-white/10 pt-6">
                    Última actualización: 1 de Enero de 2025.
                </p>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default GarantiaYVenta;