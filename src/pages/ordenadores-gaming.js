import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Seo from '../components/Seo';
import SelectConfigureCarouselSections from "../components/SelectConfigureCarouselSections";
import { 
  FaTachometerAlt, 
  FaThermometerEmpty, 
  FaGamepad, 
  FaBolt 
} from 'react-icons/fa';
import { 
  SiNvidia, 
  SiSteam, 
  SiUnrealengine, 
  SiDiscord 
} from "react-icons/si";

const GamingPage = ({ data }) => {
  const heroImage = getImage(data.hero);
  const comparisonImage = getImage(data.comparison);

  return (
    <Layout>
      <Seo 
        title="PCs Gaming Extremos | RTX 5090 & Sim Racing | VLCExtreme"
        description="Ingeniería de competición aplicada al gaming. Ordenadores optimizados para 4K, Ray Tracing y Sim Racing en Valencia. Latencia mínima, FPS máximos."
        image="/og-pc-gaming.jpg"
        pathname="/ordenadores-gaming"
      />

      {/* 🔹 HERO: The Starting Grid */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-carbon-black">
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage 
              image={heroImage} 
              alt="F1 Concept Art merging with Gaming PC aesthetics" 
              className="w-full h-full object-cover opacity-50" 
            />
            {/* Gradient: Dark at bottom, transparent at top to let the F1 car shine */}
            <div className="absolute inset-0 bg-gradient-to-t from-carbon-black via-carbon-black/60 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <span className="text-neon-green font-bold tracking-[0.2em] text-xs uppercase border border-neon-green/30 px-3 py-1 rounded bg-neon-green/10 mb-6 inline-block animate-pulse">
              Competition Grade Hardware
            </span>
            
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              La velocidad no es un accidente.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-500">
                Es Ingeniería.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl font-light">
              Construimos máquinas para quienes la diferencia entre 144 FPS y 240 FPS no es un número, es una ventaja competitiva. 
              <strong> Latencia cero. 4K nativo. Inmersión total.</strong>
            </p>
            
            <div className="flex flex-wrap gap-4">
                <Button to="#models" color="neongreen" variant="solid" className="shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                    Configurar mi máquina
                </Button>
                <Button to="/contacto" color="white" variant="outline">
                    Consultar proyecto Sim Racing
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 TECHNICAL DEEP DIVE: The "Telemetry" Section */}
      <section className="py-24 bg-dark-gray border-y border-white/5">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                
                {/* Text: Motorsport Analogy */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Afinado como un <br/>
                        <span className="text-neon-green">motor de competición.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                        Cualquiera puede montar piezas caras. Nosotros ajustamos la "telemetría" de tu equipo.
                        Optimizamos voltajes, curvas de ventilación y timings de RAM para extraer hasta el último frame de tu GPU.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="bg-carbon-black p-4 rounded border border-white/5 group hover:border-neon-green/30 transition-colors">
                            <FaBolt className="text-neon-green text-2xl mb-2"/>
                            <h4 className="text-white font-bold">Frame Pacing</h4>
                            <p className="text-xs text-gray-500">Estabilidad milimétrica. Eliminamos el micro-stuttering en juegos competitivos.</p>
                        </div>
                        <div className="bg-carbon-black p-4 rounded border border-white/5 group hover:border-neon-green/30 transition-colors">
                            <FaThermometerEmpty className="text-neon-green text-2xl mb-2"/>
                            <h4 className="text-white font-bold">Thermal Velocity</h4>
                            <p className="text-xs text-gray-500">Refrigeración líquida calculada para mantener el boost clock al máximo indefinidamente.</p>
                        </div>
                    </div>
                </div>

                {/* Visual: The Globe (Immersion) */}
                <div className="relative">
                    {/* Floating Badge */}
                    <div className="absolute -top-6 -right-6 bg-carbon-black border border-neon-green/30 p-4 rounded-lg shadow-xl z-20 hidden md:block">
                        <div className="flex items-center gap-3">
                            <FaTachometerAlt className="text-neon-green text-xl"/>
                            <div>
                                <span className="block text-xs font-mono text-gray-400">SYSTEM STATUS</span>
                                <span className="text-sm font-bold text-white">OVERCLOCK STABLE</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(34,197,94,0.15)] relative z-10">
                         {comparisonImage && <GatsbyImage image={comparisonImage} alt="Inmersión total gaming world VLCExtreme" />}
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* 🔹 THE GAMING ECOSYSTEM (Interactive Stack) */}
      <section className="py-20 bg-carbon-black">
        <div className="container mx-auto px-6 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-12">
                Optimizado para tecnologías Next-Gen
            </p>
            
            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                {[
                    { 
                        icon: <SiNvidia />, 
                        name: "NVIDIA Reflex / DLSS 3.5", 
                        msg: "NVIDIA%20Reflex%20y%20DLSS", 
                        color: "group-hover:text-[#76B900]" 
                    },
                    { 
                        icon: <SiUnrealengine />, 
                        name: "Unreal Engine 5 Lumen", 
                        msg: "juegos%20en%20Unreal%20Engine%205", 
                        color: "group-hover:text-[#ffffff]" 
                    },
                    { 
                        icon: <SiSteam />, 
                        name: "Steam / Big Picture", 
                        msg: "mi%20biblioteca%20de%20Steam", 
                        color: "group-hover:text-[#1b2838] group-hover:text-blue-400" 
                    },
                    { 
                        icon: <FaGamepad />, 
                        name: "Sim Racing / VR", 
                        msg: "Simuladores%20y%20Realidad%20Virtual", 
                        color: "group-hover:text-[#ff0055]" 
                    },
                    { 
                        icon: <SiDiscord />, 
                        name: "Streaming / Discord", 
                        msg: "streaming%20sin%20lag", 
                        color: "group-hover:text-[#5865F2]" 
                    },
                ].map((tool, index) => (
                    <a
                        key={index}
                        href={`https://wa.me/34963594092?text=Hola%20VLCExtreme%2C%20quiero%20un%20PC%20optimizado%20para%20*${tool.msg}*%20y%20alto%20rendimiento.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-2"
                    >
                        {/* ICON */}
                        <div className={`text-5xl text-gray-600 transition-all duration-300 group-hover:scale-110 ${tool.color}`}>
                            {tool.icon}
                        </div>
                        
                        {/* LABEL */}
                        <span className="text-xs font-bold text-gray-600 group-hover:text-white tracking-wide transition-colors duration-300">
                            {tool.name}
                        </span>
                    </a>
                ))}
            </div>
            
            <div className="mt-16 max-w-3xl mx-auto border-t border-white/5 pt-8">
                <p className="text-sm text-gray-500 leading-relaxed">
                    * Todos los equipos se entregan con BIOS actualizada, perfil XMP/EXPO activado y drivers de GPU optimizados para latencia mínima.
                </p>
            </div>
        </div>
      </section>

      {/* 🔹 CAROUSEL SECTION */}
      <section className="py-24 bg-dark-gray" id="models">
        <div className="container mx-auto px-6">
           <SelectConfigureCarouselSections category="gaming" />
        </div>
      </section>

      {/* 🔹 CTA: The Checkered Flag */}
      <section className="py-24 bg-gradient-to-b from-carbon-black to-dark-gray border-t border-white/5 text-center relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-neon-green/5 blur-3xl pointer-events-none"></div>
          
          <div className="container mx-auto px-6 max-w-3xl relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Tu setup merece un motor V12.
              </h2>
              <p className="text-gray-400 mb-10 text-lg">
                  Deja de sacrificar resolución. Juega por fin al máximo nivel y sumérgete en cada mundo tal como sus desarrolladores lo diseñaron.
              </p>
              <Button to="/contacto" color="neongreen" variant="solid" className="px-12 py-5 text-xl shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_50px_rgba(34,197,94,0.7)]">
                  Entrar en Pista
              </Button>
          </div>
      </section>

    </Layout>
  );
};

export const query = graphql`
  query GamingPageQuery {
    hero: file(relativePath: { eq: "f1-concept.png" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    comparison: file(relativePath: { eq: "bespoke-3.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
  }
`;

export default GamingPage;