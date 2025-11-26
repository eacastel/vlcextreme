import React, { useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { FaChevronDown, FaChevronUp, FaSearch, FaWrench, FaShippingFast, FaShieldAlt } from 'react-icons/fa';

/* Helper Accordion Component */
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left py-5 flex justify-between items-center focus:outline-none group"
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-neon-cyan' : 'text-white group-hover:text-neon-cyan/80'}`}>
                    {question}
                </span>
                <span className={`ml-4 text-neon-cyan transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <FaChevronDown />
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-400 leading-relaxed text-sm pr-8">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FaqPage = () => {
    return (
        <Layout>
            <Seo
                title="Preguntas Frecuentes y Soporte | VLCExtreme"
                description="Respuestas sobre nuestro proceso de ensamblaje, envíos, garantía y política de 'Zero Stock'. Todo lo que necesitas saber antes de encargar tu PC."
                pathname="/faq"
            />

            {/* Hero Section */}
            <section className="bg-carbon-black pt-24 pb-12 px-6 text-center border-b border-white/5">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">Knowledge Base</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Centro de Soporte
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Transparencia total sobre cómo trabajamos, cómo pagas y cómo te protegemos.
                    </p>
                </div>
            </section>

            <div className="bg-dark-gray py-16 px-4">
                <div className="max-w-4xl mx-auto space-y-16">
                    
                    {/* Category 1: Purchasing Logic */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <FaSearch className="text-neon-cyan text-xl" />
                            <h2 className="text-2xl font-bold text-white">Compras y Pagos</h2>
                        </div>
                        <div className="bg-carbon-black rounded-xl p-6 border border-white/5">
                            <FaqItem 
                                question="¿Por qué debo pagar por adelantado?"
                                answer="Operamos bajo un modelo de 'Comisión'. No almacenamos componentes antiguos. Tu pago asegura la compra inmediata del silicio más fresco disponible en el mercado global, garantizando que recibes la última revisión de hardware, no una caja que lleva 6 meses en una estantería."
                            />
                            <FaqItem 
                                question="¿Puedo financiar mi compra?"
                                answer="Actualmente trabajamos con transferencia bancaria directa para eliminar comisiones de pasarela y ofrecerte el mejor precio en hardware. Para financiación, recomendamos consultar con tu entidad bancaria habitual antes de realizar el encargo."
                            />
                            <FaqItem 
                                question="¿Hacéis factura para empresas/autónomos?"
                                answer="Por supuesto. Todos nuestros equipos se entregan con factura oficial española con IVA desglosado (21%) válida para deducción fiscal. Es nuestro estándar habitual."
                            />
                        </div>
                    </section>

                    {/* Category 2: Technical & Assembly */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <FaWrench className="text-purple-500 text-xl" />
                            <h2 className="text-2xl font-bold text-white">Montaje e Ingeniería</h2>
                        </div>
                        <div className="bg-carbon-black rounded-xl p-6 border border-white/5">
                            <FaqItem 
                                question="¿Cuánto tiempo tardáis en entregar el equipo?"
                                answer="Nuestro ciclo estándar es de 10 a 15 días laborables. Esto incluye: adquisición de componentes (3-5 días), ensamblaje artesanal (1 día) y validación de estrés de 24h (1-2 días). No sacrificamos la calidad por la velocidad."
                            />
                            <FaqItem 
                                question="¿Qué pasa si un componente no está disponible?"
                                answer="Debido a la volatilidad del mercado High-End, a veces ocurre. Si una pieza específica falta, te contactaremos inmediatamente para proponerte una alternativa de igual o superior rendimiento/calidad. Nunca sustituimos piezas sin tu aprobación."
                            />
                            <FaqItem 
                                question="¿Entregáis el PC con Windows instalado?"
                                answer="Sí. Instalamos Windows 11 Pro (o Linux bajo petición) y optimizamos la BIOS, drivers y curvas de ventilación. El equipo llega 'Turn-Key': enchufar y trabajar."
                            />
                        </div>
                    </section>

                    {/* Category 3: Warranty & Shipping */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <FaShieldAlt className="text-neon-green text-xl" />
                            <h2 className="text-2xl font-bold text-white">Garantía y Envíos</h2>
                        </div>
                        <div className="bg-carbon-black rounded-xl p-6 border border-white/5">
                            <FaqItem 
                                question="¿Es seguro el envío de un PC tan caro?"
                                answer="Utilizamos transporte asegurado y un embalaje de grado industrial. El interior del PC se protege con espuma expansiva (Instapak) que inmoviliza la tarjeta gráfica y el disipador para evitar daños por vibración."
                            />
                            <FaqItem 
                                question="¿Cómo funciona la garantía de 3 años?"
                                answer="Ofrecemos Garantía Premium Directa. Si tu equipo falla, no tienes que pelearte con el fabricante de la pieza. Nos contactas a nosotros, diagnosticamos el problema y tramitamos la sustitución. Nosotros somos tu único punto de contacto."
                            />
                        </div>
                    </section>

                </div>

                {/* Final CTA */}
                <div className="text-center mt-20">
                    <p className="text-gray-400 mb-6">¿No encuentras tu respuesta?</p>
                    <Button to="/contacto" color="neoncyan" variant="outline">
                        Contactar con Soporte
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default FaqPage;