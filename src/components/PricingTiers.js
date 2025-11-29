import React from 'react';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import Button from '../components/Button'; // ✅ Using your component

const PricingTiers = () => {

    const waBase = "https://wa.me/34963594092?text=";

    const linkCreative = `${waBase}Hola%20VLCExtreme%2C%20quiero%20usar%20la%20arquitectura%20*Creative%20Pro*%20como%20base%20para%20mi%20workstation...`;
    const link3D = `${waBase}Hola%20VLCExtreme%2C%20estoy%20interesado%20en%20la%20configuraci%C3%B3n%20*3D%20%26%20Motion*...`;
    const linkAI = `${waBase}Hola%20VLCExtreme%2C%20necesito%20asesor%C3%ADa%20para%20una%20workstation%20de%20*IA%20%2F%20Deep%20Learning*...`;

    return (
        <section className="bg-carbon-black py-20 px-4" id="pricing">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-white">Inversión Profesional</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Pensado para quienes viven de su ordenador. Equipos que se amortizan en horas de trabajo, no en años.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* ---------------- TIER 1: Creative Pro ---------------- */}
                    <div className="bg-dark-gray border border-white/5 rounded-2xl p-8 hover:border-neon-green/50 transition-colors flex flex-col relative group">
                        
                        {/* 👻 Ghost Link (Makes full card clickable) */}
                        <a href={linkCreative} target="_blank" rel="noopener noreferrer" 
                           className="absolute inset-0 z-10" aria-label="Ver Creative Pro">
                        </a>

                        <div className="flex-grow relative z-20 pointer-events-none">
                            <h3 className="text-xl font-bold text-white mb-2">Creative Pro</h3>
                            <p className="text-sm text-gray-500 mb-6 min-h-[50px]">Edición 4K, diseño gráfico, fotografía avanzada y CAD moderado.</p>
                            <div className="text-3xl font-bold text-neon-green mb-1">2.500 €</div>
                            <div className="text-xs text-gray-500 mb-6">Precio base estimado</div>

                            <ul className="text-sm text-gray-300 space-y-3 mb-8">
                                <li className="flex gap-2"><FaCheckCircle className="text-neon-green/50" /> Ryzen 9 / Core i7</li>
                                <li className="flex gap-2"><FaCheckCircle className="text-neon-green/50" /> 64GB DDR5 RAM</li>
                                <li className="flex gap-2"><FaCheckCircle className="text-neon-green/50" /> RTX 4070 Ti Super</li>
                            </ul>
                        </div>

                        {/* Button Component (Z-30 puts it on top of the ghost link) */}
                        <div className="mt-auto pt-6 border-t border-white/5 relative z-30">
                            <Button
                                to={linkCreative}
                                external={true}
                                color="neongreen"
                                variant="outline" // ✅ Restored Outline
                                className="w-full flex justify-center items-center gap-2"
                            >
                                <FaWhatsapp /> Personalizar Base
                            </Button>
                        </div>
                    </div>

                    {/* ---------------- TIER 2: 3D & Motion (Best Seller) ---------------- */}
                    <div className="bg-dark-gray border border-neon-cyan rounded-2xl p-8 transform md:-translate-y-4 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative flex flex-col group">
                        
                        {/* 👻 Ghost Link */}
                        <a href={link3D} target="_blank" rel="noopener noreferrer" 
                           className="absolute inset-0 z-10" aria-label="Ver 3D Motion">
                        </a>

                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-cyan text-carbon-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-neon-cyan/50 z-20">
                            Más Vendido
                        </div>

                        <div className="flex-grow relative z-20 pointer-events-none">
                            <h3 className="text-xl font-bold text-white mb-2">3D & Motion</h3>
                            <p className="text-sm text-gray-500 mb-6 min-h-[50px]">Renderizado GPU intenso, Cinema 4D, Unreal Engine.</p>
                            <div className="text-3xl font-bold text-neon-cyan mb-1">4.200 €</div>
                            <div className="text-xs text-gray-500 mb-6">Precio base estimado</div>
                            <ul className="text-sm text-gray-300 space-y-3 mb-8">
                                <li className="flex gap-2"><FaCheckCircle className="text-neon-cyan" /> Ryzen 9 7950X / i9</li>
                                <li className="flex gap-2"><FaCheckCircle className="text-neon-cyan" /> 96GB - 128GB DDR5</li>
                                <li className="flex gap-2"><FaCheckCircle className="text-neon-cyan" /> RTX 4090 24GB</li>
                            </ul>
                        </div>

                        {/* Button Component */}
                        <div className="mt-auto pt-6 border-t border-white/5 relative z-30">
                            <Button
                                to={link3D}
                                external={true}
                                color="neoncyan"
                                variant="solid" // Kept solid for Best Seller (Change to outline if you prefer)
                                className="w-full flex justify-center items-center gap-2 shadow-lg shadow-neon-cyan/20"
                            >
                                <FaWhatsapp /> Quiero esta Workstation
                            </Button>
                        </div>
                    </div>

                    {/* ---------------- TIER 3: AI & Deep Learning ---------------- */}
                    <div className="bg-dark-gray border border-white/5 rounded-2xl p-8 hover:border-purple-500/50 transition-colors flex flex-col relative group">
                        
                        {/* 👻 Ghost Link */}
                        <a href={linkAI} target="_blank" rel="noopener noreferrer" 
                           className="absolute inset-0 z-10" aria-label="Ver AI Workstation">
                        </a>

                        <div className="flex-grow relative z-20 pointer-events-none">
                            <h3 className="text-xl font-bold text-white mb-2">AI & Deep Learning</h3>
                            <p className="text-sm text-gray-500 mb-6 min-h-[50px]">Entrenamiento de modelos, IA generativa, data science.</p>
                            <div className="text-3xl font-bold text-purple-400 mb-1">Let's Talk</div>
                            <div className="text-xs text-gray-500 mb-6">Proyectos Enterprise</div>
                            <ul className="text-sm text-gray-300 space-y-3 mb-8">
                                <li className="flex gap-2"><FaCheckCircle className="text-purple-500/50" /> Dual GPU Configs</li>
                                <li className="flex gap-2"><FaCheckCircle className="text-purple-500/50" /> 192GB+ ECC RAM</li>
                                <li className="flex gap-2"><FaCheckCircle className="text-purple-500/50" /> Threadripper PRO</li>
                            </ul>
                        </div>

                        {/* Button Component */}
                        <div className="mt-auto pt-6 border-t border-white/5 relative z-30">
                            <Button
                                to={linkAI}
                                external={true}
                                color="purple"
                                variant="outline" // ✅ Restored Outline
                            >
                                Agendar Consulta IA
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PricingTiers;