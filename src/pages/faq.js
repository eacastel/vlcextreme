import React, { useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { 
    FaChevronDown, 
    FaChevronUp, 
    FaSearch, 
    FaWrench, 
    FaTruck, 
    FaMoneyBillWave 
} from 'react-icons/fa';

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
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
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
                        Transparencia total sobre cómo trabajamos, cómo pagas y cómo protegemos tu inversión.
                    </p>
                </div>
            </section>

            <div className="bg-dark-gray py-16 px-4">
                <div className="max-w-4xl mx-auto space-y-16">
                    
                    {/* Category 1: Logic & Commission */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <FaSearch className="text-neon-cyan text-xl" />
                            <h2 className="text-2xl font-bold text-white">Protocolo de Encargo</h2>
                        </div>
                        <div className="bg-carbon-black rounded-xl p-6 border border-white/5">
                            <FaqItem 
                                question="¿Por qué debo pagar por adelantado?"
                                answer="Operamos bajo un modelo de 'Ingeniería Bajo Pedido'. No almacenamos componentes antiguos en estanterías. Tu pago asegura la compra inmediata del silicio más fresco (último lote de fabricación) en el mercado global. Esto garantiza que tu garantía empieza el día que recibes el PC, no meses antes."
                            />
                            <FaqItem 
                                question="¿Qué incluye el precio final?"
                                answer="El presupuesto incluye: Hardware, Montaje Artesanal, Optimización de BIOS/Curvas de Ventilación, Test de Estrés de 24h, Licencia de Sistema Operativo, Embalaje de Seguridad y Envío Asegurado (o Entrega Personal en Valencia)."
                            />
                            <FaqItem 
                                question="¿Puedo devolver el equipo si cambio de opinión?"
                                answer="Al ser bienes confeccionados conforme a las especificaciones del consumidor y claramente personalizados (Art. 103 Ley Defensa Consumidores), no se aplica el derecho de desistimiento estándar. Sin embargo, cubrimos cualquier defecto de funcionamiento con nuestra garantía."
                            />
                        </div>
                    </section>

                    {/* Category 2: Payment Methods */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <FaMoneyBillWave className="text-neon-green text-xl" />
                            <h2 className="text-2xl font-bold text-white">Pagos y Facturación</h2>
                        </div>
                        <div className="bg-carbon-black rounded-xl p-6 border border-white/5">
                            <FaqItem 
                                question="¿Qué métodos de pago aceptáis?"
                                answer="Aceptamos Transferencia Bancaria (Recomendado para agilizar trámites de alto valor), Tarjeta de Crédito/Débito y Criptomonedas (Bitcoin/Ethereum bajo consulta). Emitimos factura oficial con IVA desglosado para empresas y autónomos."
                            />
                            <FaqItem 
                                question="¿Ofrecéis financiación?"
                                answer="Actualmente no gestionamos financiación directa. Recomendamos consultar con tu entidad bancaria habitual antes de realizar el encargo para obtener las mejores condiciones de crédito personal."
                            />
                        </div>
                    </section>

                    {/* Category 3: Technical & OS */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <FaWrench className="text-purple-500 text-xl" />
                            <h2 className="text-2xl font-bold text-white">Técnica y Software</h2>
                        </div>
                        <div className="bg-carbon-black rounded-xl p-6 border border-white/5">
                            <FaqItem 
                                question="¿Qué Sistema Operativo instaláis?"
                                answer="Tú eliges. Por defecto instalamos Windows 11 Pro con licencia oficial, limpio de bloatware y optimizado. Si eres desarrollador o científico de datos, podemos entregar el equipo con Linux (Ubuntu/Rocky) o en configuración Dual Boot. Especifícalo al realizar el pedido."
                            />
                            <FaqItem 
                                question="¿Hacéis Overclocking?"
                                answer="Aplicamos optimizaciones de estabilidad (XMP/EXPO, PBO, Undervolting) para maximizar el rendimiento térmico. No realizamos overclocking extremo que comprometa la vida útil de los componentes o la garantía del fabricante."
                            />
                        </div>
                    </section>

                    {/* Category 4: Shipping & Warranty */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <FaTruck className="text-yellow-500 text-xl" />
                            <h2 className="text-2xl font-bold text-white">Logística y Seguridad</h2>
                        </div>
                        <div className="bg-carbon-black rounded-xl p-6 border border-white/5">
                            <FaqItem 
                                question="¿Es seguro el envío de un PC con una RTX 4090?"
                                answer="Totalmente. Utilizamos espuma expansiva interna (Instapak) que se amolda a los componentes, inmovilizando la tarjeta gráfica y el disipador para que no sufran vibraciones durante el transporte. El equipo viaja como un bloque sólido."
                            />
                            <FaqItem 
                                question="¿Entregáis en mano en Valencia?"
                                answer="Sí. En la Comunidad Valenciana ofrecemos un servicio de 'Entrega VIP' donde un técnico te lleva el equipo personalmente y te ayuda con la puesta en marcha inicial para asegurar que todo llega perfecto."
                            />
                            <FaqItem 
                                question="¿Cómo funciona la garantía?"
                                answer="Ofrecemos 3 años de garantía oficial en componentes y 1 año de soporte técnico directo sobre el montaje. Si tienes un problema, no llamas a un call center, hablas directamente con el técnico que montó tu máquina."
                            />
                        </div>
                    </section>

                </div>

                {/* Final CTA */}
                <div className="text-center mt-20">
                    <p className="text-gray-400 mb-6">¿Tienes una duda específica?</p>
                    <Button to="/contacto" color="neoncyan" variant="outline">
                        Hablar con un Especialista
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default FaqPage;