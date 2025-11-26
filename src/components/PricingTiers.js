import React from 'react';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import Button from '../components/Button'; // ✅ Import your custom button

const PricingTiers = () => {

    // 🔹 Strategy: Pre-filled WhatsApp messages for instant context
    const waBase = "https://wa.me/34963594092?text=";

    const linkCreative =
        `${waBase}Hola%20VLCExtreme%2C%20quiero%20usar%20la%20arquitectura%20*Creative%20Pro*%20como%20base%20para%20mi%20workstation.%20Mi%20uso%20principal%20es...%20y%20mi%20presupuesto%20aproximado%20es%20de...`;


    const link3D =
        `${waBase}Hola%20VLCExtreme%2C%20estoy%20interesado%20en%20la%20configuraci%C3%B3n%20*3D%20%26%20Motion*.%20Mi%20tipo%20de%20trabajo%20principal%20es...%20y%20mi%20presupuesto%20aproximado%20es%20de...`;


    const linkAI =
        `${waBase}Hola%20VLCExtreme%2C%20necesito%20asesor%C3%ADa%20para%20una%20workstation%20de%20*IA%20%2F%20Deep%20Learning*.%20Mi%20caso%20de%20uso%20es...%20y%20mi%20presupuesto%20aproximado%20es%20de...`;


    return (
        <section className="bg-carbon-black py-20 px-4" id="pricing">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-white">Inversión Profesional</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Pensado para quienes viven de su ordenador o quieren una experiencia de uso al nivel de un superdeportivo.
                        Equipos que se amortizan en horas de trabajo, no en años.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Tier 1: Creative Pro */}
                    <div className="bg-dark-gray border border-white/5 rounded-2xl p-8 hover:border-neon-green/50 transition-colors flex flex-col relative group">
                        <div className="flex-grow">
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

                        {/* ✅ BUTTON ADDED */}
                        <div className="mt-auto pt-6 border-t border-white/5">
                            <Button
                                to={linkCreative}
                                external={true} // Assuming your Button supports external links or just use <a> logic inside
                                color="neongreen"
                                variant="outline"
                                className="w-full flex justify-center items-center gap-2"
                            >
                                <FaWhatsapp /> Personalizar Base
                            </Button>
                        </div>
                    </div>

                    {/* Tier 2: 3D & Motion (Highlighted) */}
                    <div className="bg-dark-gray border border-neon-cyan rounded-2xl p-8 transform md:-translate-y-4 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative flex flex-col">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-cyan text-carbon-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-neon-cyan/50">
                            Más Vendido
                        </div>

                        <div className="flex-grow">
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

                        {/* ✅ BUTTON ADDED (More prominent) */}
                        <div className="mt-auto pt-6 border-t border-white/5">
                            <Button
                                to={link3D}
                                external={true}
                                color="neoncyan"
                                variant="solid"
                                className="w-full flex justify-center items-center gap-2 shadow-lg shadow-neon-cyan/20"
                            >
                                <FaWhatsapp /> Quiero esta Workstation
                            </Button>
                        </div>
                    </div>

                    {/* Tier 3: AI & Deep Learning */}
                    <div className="bg-dark-gray border border-white/5 rounded-2xl p-8 hover:border-purple-500/50 transition-colors flex flex-col">
                        <div className="flex-grow">
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

                        {/* ✅ BUTTON ADDED */}
                        <div className="mt-auto pt-6 border-t border-white/5">
                            <Button
                                to={linkAI}
                                external={true}
                                color="purple"
                                variant="outline"
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