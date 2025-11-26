import React, { useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import LayoutLanding from "../components/LayoutLanding";
import Seo from "../components/Seo";
import Button from "../components/Button";
import { 
    FaWhatsapp, 
    FaCheckCircle, 
    FaMicrochip, 
    FaBolt, 
    FaStopwatch, 
    FaChevronDown, 
    FaChevronUp,
    FaStar
} from 'react-icons/fa';
import { 
    SiAutodesk, 
    SiUnrealengine, 
    SiBlender, 
    SiPytorch, 
    SiDavinciresolve 
} from "react-icons/si";

/* 🔹 HELPER COMPONENT: FAQ ACCORDION */
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left py-6 flex justify-between items-center focus:outline-none group"
            >
                <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-neon-green' : 'text-white group-hover:text-neon-green/80'}`}>
                    {question}
                </span>
                <span className="text-neon-green ml-4">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                }`}
            >
                <p className="text-gray-400 leading-relaxed text-sm md:text-base pr-8">
                    {answer}
                </p>
            </div>
        </div>
    );
};

/* 🔹 MAIN PAGE COMPONENT */
const WorkstationsProfesionalesPage = ({ data }) => {
    const heroImage = getImage(data.hero);
    // Note: Assuming 'comparison' is the image you used for the technical section
    const technicalImage = getImage(data.comparison); 
    const paraQuienImage = getImage(data.paraQuien); // Used for Case Study/Review section if needed
    
    // 💡 STRATEGY: Forces them to admit they want to BUY, filtering out free-loaders.
    const whatsappUrl =
        "https://wa.me/34963594092?text=Hola%20VLCExtreme%2C%20estoy%20interesado%20en%20adquirir%20una%20Workstation.%20Mi%20uso%20principal%20ser%C3%A1%20...%20y%20tengo%20un%20presupuesto%20estimado%20de...";

    return (
        <LayoutLanding hideNavigation={true}> 
            <Seo
                title="Workstations Profesionales en València | VLCExtreme"
                description="Ingeniería informática artesanal. Workstations para 3D, IA y Arquitectura. Montaje manual en València. Soporte directo."
                pathname="/workstations-profesionales-valencia"
            />

            <main className="bg-carbon-black text-light-gray font-sans selection:bg-neon-green selection:text-carbon-black">
                
                {/* 1. HERO SECTION: High Impact, Low Noise */}
                <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                    {heroImage && (
                        <div className="absolute inset-0 w-full h-full">
                            <GatsbyImage
                                image={heroImage}
                                alt="Workstation profesional VLCExtreme"
                                className="w-full h-full object-cover opacity-40" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-carbon-black via-carbon-black/90 to-transparent" />
                        </div>
                    )}

                    <div className="container mx-auto px-6 relative z-10 pt-20">
                        <div className="max-w-2xl">
                            <div className="inline-block bg-neon-green/10 border border-neon-green/30 px-3 py-1 rounded-full text-neon-green text-xs md:text-sm font-bold tracking-wider mb-6">
                                INGENIERÍA ARTESANAL EN VALÈNCIA
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Potencia extrema.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                                    Silencio absoluto.
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                                Deja de perder horas renderizando. Diseñamos estaciones de trabajo de grado servidor para <strong>Arquitectura, 3D e IA</strong>. Sin cuellos de botella. Sin componentes genéricos.
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button 
                                        to={whatsappUrl} 
                                        external 
                                        color="neongreen" 
                                        className="flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                    >
                                        <FaWhatsapp className="text-xl" />
                                        Hablar con un Técnico
                                    </Button>

                                    <Button 
                                        to="/contacto" 
                                        variant="outline" 
                                        color="white"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        Solicitar Presupuesto Formal
                                    </Button>
                                </div>
                                <p className="text-[10px] md:text-xs text-gray-500 mt-2 max-w-lg">
                                    * Servicio exclusivo para <strong>proyectos completos</strong>. 
                                    No vendemos componentes sueltos ni asesoramos sobre montajes externos.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. TRUST BAR (Interactive Software Triggers) */}
                <section className="border-y border-white/5 bg-dark-gray/50 py-10">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-8">
                            Componentes originales de las mejores marcas
                        </p>
                        
                        {/* Software Icons */}
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-8">
                            {[
                                { icon: <SiAutodesk />, name: "Autodesk (Revit/CAD)", msg: "Autodesk%20(Revit%2FAutoCAD)" },
                                { icon: <SiUnrealengine />, name: "Unreal Engine", msg: "Unreal%20Engine" },
                                { icon: <SiDavinciresolve />, name: "DaVinci Resolve", msg: "DaVinci%20Resolve" },
                                { icon: <SiBlender />, name: "Blender 3D", msg: "Blender" },
                                { icon: <SiPytorch />, name: "PyTorch / AI", msg: "Inteligencia%20Artificial" },
                            ].map((tool, index) => (
                                <a
                                    key={index}
                                    href={`https://wa.me/34963594092?text=Hola%20VLCExtreme%2C%20trabajo%20principalmente%20con%20*${tool.msg}*%20y%20busco%20una%20workstation%20optimizada.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="text-4xl text-gray-600 group-hover:text-neon-cyan transition-colors duration-300">
                                        {tool.icon}
                                    </div>
                                    <span className="text-[10px] font-semibold text-gray-600 group-hover:text-white transition-colors duration-300 uppercase tracking-wider hidden md:block">
                                        {tool.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                        
                        <p className="text-[10px] text-neon-cyan/80">
                            * Haz clic en tu software para iniciar una consulta técnica específica por WhatsApp.
                        </p>
                    </div>
                </section>

                {/* 3. TECHNICAL LOGIC (The "How" - Anti-Supermarket) */}
                <section className="bg-carbon-black py-24 px-4 border-b border-white/5">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        
                        {/* Left: Text & Icons */}
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                Ingeniería de Sistemas,
                            </h2>
                            <h3 className="text-2xl font-bold text-gray-600 mb-8">
                                no ensamblaje rápido.
                            </h3>
                            
                            <div className="space-y-8">
                                {/* Feature 1: ESD */}
                                <div className="flex gap-5">
                                    <div className="shrink-0 bg-dark-gray border border-white/10 p-4 rounded-xl h-min text-neon-green">
                                        <FaBolt size={24}/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg mb-1">Protección Antiestática (ESD)</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Montamos en banco técnico con pulseras de descarga a tierra. Cuidamos la electrónica a nivel microscópico.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2: Component Architecture */}
                                <div className="flex gap-5">
                                    <div className="shrink-0 bg-dark-gray border border-white/10 p-4 rounded-xl h-min text-neon-green">
                                        <FaMicrochip size={24}/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg mb-1">Arquitectura de Componentes</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Seleccionamos combinaciones de Placa Base + RAM certificadas para estabilidad máxima. Sin cuellos de botella.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3: Validation */}
                                <div className="flex gap-5">
                                    <div className="shrink-0 bg-dark-gray border border-white/10 p-4 rounded-xl h-min text-neon-green">
                                        <FaCheckCircle size={24}/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg mb-1">Validación de 24h</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            Test de estrés (CPU+GPU) de día completo antes del envío. Garantizamos que el equipo llega listo para producir.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: The Image with "De-Gaming" Filter */}
                        {technicalImage && (
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-neon-green/5 blur-2xl rounded-full opacity-50"></div>
                                {/* 💡 FIX: Grayscale filter makes the Red PC look industrial/professional by default */}
                                <div className="grayscale-[0.6] hover:grayscale-0 transition-all duration-700 ease-in-out">
                                    <GatsbyImage
                                        image={technicalImage}
                                        alt="Interior de workstation con cableado perfecto"
                                        className="rounded-2xl border border-white/10 shadow-2xl relative z-10"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 4. PROCESS SECTION (How we work) */}
                <section className="bg-dark-gray py-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold mb-10 text-center">Protocolo de Trabajo</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: "01", title: "Análisis", text: "Revisamos tu software y flujo de trabajo real." },
                                { step: "02", title: "Diseño", text: "Propuesta técnica detallada y justificada." },
                                { step: "03", title: "Montaje", text: "Ensamblaje manual y gestión de cableado." },
                                { step: "04", title: "Entrega", text: "Envío asegurado y puesta en marcha." }
                            ].map((item, i) => (
                                <div key={i} className="bg-carbon-black p-6 rounded-lg border border-white/5">
                                    <div className="text-4xl font-bold text-neon-cyan/20 mb-3">{item.step}</div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. PRICING TIERS */}
                <section className="bg-carbon-black py-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Inversión Profesional</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Diseñado para quienes amortizan su equipo con su trabajo. 
                                Componentes de grado industrial y soporte local prioritario.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Tier 1 */}
                            <div className="bg-dark-gray border border-white/5 rounded-2xl p-8 hover:border-neon-green/50 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-2">Creative Pro</h3>
                                <p className="text-sm text-gray-500 mb-6 h-10">Edición 4K, Diseño Gráfico y CAD ligero.</p>
                                <div className="text-3xl font-bold text-neon-green mb-1">2.500 €</div>
                                <div className="text-xs text-gray-500 mb-6">Precio base estimado</div>
                                <ul className="text-sm text-gray-300 space-y-3 mb-8">
                                    <li className="flex gap-2"><FaCheckCircle className="text-neon-green/50"/> Ryzen 9 / Core i7</li>
                                    <li className="flex gap-2"><FaCheckCircle className="text-neon-green/50"/> 64GB DDR5 RAM</li>
                                    <li className="flex gap-2"><FaCheckCircle className="text-neon-green/50"/> NVIDIA RTX 4070 Ti Super</li>
                                </ul>
                            </div>

                            {/* Tier 2 - HIGHLIGHTED */}
                            <div className="bg-dark-gray border border-neon-cyan rounded-2xl p-8 transform md:-translate-y-4 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-cyan text-carbon-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                                    Más Vendido
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">3D & Motion</h3>
                                <p className="text-sm text-gray-500 mb-6 h-10">Renderizado GPU pesado, Cinema4D, Unreal Engine.</p>
                                <div className="text-3xl font-bold text-neon-cyan mb-1">4.200 €</div>
                                <div className="text-xs text-gray-500 mb-6">Precio base estimado</div>
                                <ul className="text-sm text-gray-300 space-y-3 mb-8">
                                    <li className="flex gap-2"><FaCheckCircle className="text-neon-cyan"/> Ryzen 9 7950X / i9</li>
                                    <li className="flex gap-2"><FaCheckCircle className="text-neon-cyan"/> 96GB - 128GB DDR5</li>
                                    <li className="flex gap-2"><FaCheckCircle className="text-neon-cyan"/> NVIDIA RTX 4090 24GB</li>
                                </ul>
                            </div>

                            {/* Tier 3 */}
                            <div className="bg-dark-gray border border-white/5 rounded-2xl p-8 hover:border-purple-500/50 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-2">AI & Deep Learning</h3>
                                <p className="text-sm text-gray-500 mb-6 h-10">Entrenamiento de modelos LLM, Data Science.</p>
                                <div className="text-3xl font-bold text-purple-400 mb-1">Let's talk</div>
                                <div className="text-xs text-gray-500 mb-6">Proyectos Enterprise</div>
                                <ul className="text-sm text-gray-300 space-y-3 mb-8">
                                    <li className="flex gap-2"><FaCheckCircle className="text-purple-500/50"/> Dual GPU Configurations</li>
                                    <li className="flex gap-2"><FaCheckCircle className="text-purple-500/50"/> 192GB+ ECC RAM</li>
                                    <li className="flex gap-2"><FaCheckCircle className="text-purple-500/50"/> Threadripper PRO</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. SOCIAL PROOF (Review + Case Study) */}
                <section className="bg-dark-gray py-16 px-4">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
                        {/* Google Review */}
                        <div className="bg-carbon-black/60 border border-white/5 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-light-gray font-semibold text-lg">Google Reviews</span>
                            </div>
                            <div className="flex text-neon-green text-xl mb-4">★★★★★</div>
                            <blockquote className="text-gray-400 italic leading-relaxed">
                                “Desde el primer contacto, el trato fue impecable. Se tomaron el tiempo de
                                entender exactamente qué necesitaba. El rendimiento ha superado todas mis expectativas: rápido, silencioso y potente.”
                            </blockquote>
                        </div>

                        {/* Case Study */}
                        <div className="bg-carbon-black/60 border border-white/5 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-light-gray mb-3">
                                Caso real: Workstation 3D
                            </h3>
                            <p className="text-gray-400 mb-4 text-sm">
                                Un diseñador de escenarios virtuales en València necesitaba un equipo para 3ds Max y Unreal. Su estación fue optimizada para renderizado GPU ininterrumpido.
                            </p>
                            <ul className="text-gray-500 list-disc pl-5 space-y-1 text-sm">
                                <li>Renderizado estable de escenas complejas.</li>
                                <li>Silencio absoluto en carga media.</li>
                                <li>Entrega lista para producir en 11 días.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 7. MANIFESTO (The Vacuum Story - Pure Emotion/Philosophy) */}
                <section className="bg-carbon-black py-24 px-4 border-t border-white/5">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-8 text-neon-green/50">
                            <FaStar className="text-xl animate-pulse" />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Tu trabajo no es un electrodoméstico. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                                Tu equipo tampoco debería serlo.
                            </span>
                        </h2>
                        
                        <div className="text-lg text-gray-400 leading-relaxed space-y-6 max-w-3xl mx-auto">
                            <p>
                                En las grandes superficies, verás ordenadores expuestos literalmente al lado de 
                                aspiradoras y lavadoras. Para ellos, un PC es solo una caja más en el inventario.
                            </p>
                            <p>
                                En <strong>VLCExtreme</strong>, tratamos tu workstation como un instrumento de precisión. 
                                Sin bloatware, sin componentes genéricos y <span className="text-white font-medium">jamás verás un aspirador doméstico cerca de tu placa base.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* 8. FAQ SECTION (Handling Objections) */}
                <section className="bg-dark-gray py-20 px-4" id="faq">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
                            Preguntas Frecuentes
                        </h2>

                        <div className="bg-carbon-black rounded-2xl p-6 md:p-10 border border-white/5 shadow-2xl">
                            
                            <FaqItem 
                                question="¿Vendéis componentes sueltos o asesoráis sobre montajes caseros?"
                                answer="No. Somos una firma de ingeniería de sistemas. Nuestro valor reside en el diseño, montaje, validación y garantía de equipos completos 'llave en mano'. No comercializamos componentes sueltos."
                            />

                            <FaqItem 
                                question="¿Por qué elegir VLCExtreme y no comprar en PcComponentes o Amazon?"
                                answer="Las grandes tiendas son excelentes para piezas sueltas, pero no para soluciones profesionales. Nosotros no solo ensamblamos; validamos. Tu inversión incluye: asesoramiento técnico real, selección de componentes para evitar cuellos de botella y gestión profesional del cableado. Recibes una máquina lista para trabajar, no un puzle de piezas."
                            />

                            <FaqItem 
                                question="Soy una empresa/autónomo, ¿entregáis factura con IVA?"
                                answer="Por supuesto. Todos nuestros equipos se entregan con factura oficial española con IVA desglosado (21%) para que puedas deducirte el gasto. Trabajamos habitualmente con estudios de arquitectura y productoras."
                            />

                            <FaqItem 
                                question="¿Cuánto tiempo tardáis en entregar el equipo?"
                                answer="Nuestro plazo estándar es de 10 a 15 días laborables. Preferimos pedir los componentes específicos para tu build (no usamos stock antiguo) y dedicamos un día entero al montaje y otro al testeo de calidad (24h)."
                            />

                            <FaqItem 
                                question="¿Qué incluye la garantía de 3 años?"
                                answer="Ofrecemos Gestión Integral de Garantía. El hardware tiene 3 años de garantía oficial. Si algo falla, nosotros nos encargamos de todo: diagnosticamos el problema, tramitamos el cambio con el fabricante y volvemos a montar la pieza. Tú no tienes que pelearte con servicios técnicos externos."
                            />

                            <FaqItem 
                                question="Vivo fuera de València, ¿enviais equipos?"
                                answer="Sí, enviamos a toda la península. Utilizamos un servicio de transporte asegurado. El equipo viaja con protecciones internas (espuma expansiva) para evitar que la tarjeta gráfica sufra daños."
                            />
                        </div>
                    </div>
                </section>

                {/* 9. FINAL CTA (The Close) */}
                <section className="bg-carbon-black py-24 px-4 border-t border-white/5">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            ¿Empezamos tu proyecto?
                        </h2>
                        <p className="text-gray-400 mb-10 text-lg">
                            Tienes dos formas de avanzar. Elige la que mejor se adapte a ti.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Option A: Fast */}
                            <div className="bg-dark-gray p-8 rounded-xl border border-white/5 hover:border-neon-green/30 transition-colors flex flex-col items-center">
                                <h3 className="text-white font-bold mb-2 text-xl">Consulta Rápida</h3>
                                <p className="text-sm text-gray-500 mb-6 text-center">
                                    Ideal si tienes dudas técnicas o no sabes qué componentes elegir.
                                </p>
                                <Button 
                                    to={whatsappUrl} 
                                    external 
                                    color="neongreen"
                                    fullWidth
                                    className="shadow-lg shadow-neon-green/10"
                                >
                                    <FaWhatsapp className="mr-2 inline text-lg"/> Chat WhatsApp
                                </Button>
                            </div>

                            {/* Option B: Formal */}
                            <div className="bg-dark-gray p-8 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors flex flex-col items-center">
                                <h3 className="text-white font-bold mb-2 text-xl">Presupuesto Formal</h3>
                                <p className="text-sm text-gray-500 mb-6 text-center">
                                    Ideal si necesitas una factura proforma o propuesta por email.
                                </p>
                                <Button 
                                    to="/contacto" 
                                    variant="outline" 
                                    color="white"
                                    fullWidth
                                >
                                    Formulario Email
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </LayoutLanding>
    );
};

export const query = graphql`
  query WorkstationsPageQuery {
    hero: file(relativePath: { eq: "movie-production.png" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    paraQuien: file(relativePath: { eq: "para-quien6.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    comparison: file(relativePath: { eq: "workstation-comparison.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
  }
`

export default WorkstationsProfesionalesPage;