import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Seo from '../components/Seo'
import SelectConfigureCarouselSections from "../components/SelectConfigureCarouselSections";
import { 
  FaVolumeMute, 
  FaHdd 
} from 'react-icons/fa';
import { 
  SiAdobe, 
  SiDavinciresolve, 
  SiObsstudio, 
  SiBlender, 
  SiUnrealengine 
} from "react-icons/si";

const ProductionWorkstationsPage = ({ data }) => {
  const heroImage = getImage(data.hero)
  const comparisonImage = getImage(data.comparison)

  return (
    <Layout>
      <Seo
        title="Workstations Edición 8K & Streaming | VLCExtreme Studio"
        description="PCs optimizados para DaVinci Resolve, Premiere Pro y OBS. Silencio absoluto para estudios de grabación, renderizado 3D y streaming profesional en Valencia."
        image="/og-pc-creadores.jpg"
        pathname="/ordenadores-creadores-streamers"
      />

      {/* 🔹 HERO: The Flow State */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-carbon-black">
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage
              image={heroImage}
              alt="Estudio de edición profesional con workstation VLCExtreme"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-carbon-black via-carbon-black/90 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-6 relative z-10 pt-10">
          <div className="max-w-3xl">
            <span className="text-neon-cyan font-bold tracking-[0.2em] text-xs uppercase border border-neon-cyan/30 px-3 py-1 rounded bg-neon-cyan/10 mb-6 inline-block">
              Studio Grade Engineering
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Renderiza en Tiempo Real.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-500">
                Transmite sin Cortes.
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl font-light">
              Elimina la fricción entre tu idea y el resultado final. 
              Workstations diseñadas para <strong>scrubbing de timeline 8K</strong> fluido, <strong>compilación de shaders</strong> instantánea y acústica de estudio.
            </p>
            <div className="flex flex-wrap gap-4">
                <Button to="#models" color="neoncyan" variant="solid" className="shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    Ver Configuraciones de Estudio
                </Button>
                <Button to="/contacto" color="white" variant="outline">
                    Consultar Proyecto
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 TECHNICAL DEEP DIVE: Silence & Speed */}
      <section className="py-24 bg-dark-gray border-y border-white/5">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        El silencio es <br/>
                        <span className="text-neon-cyan">una especificación técnica.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                        Para un streamer o productor musical, el ruido del ventilador es el enemigo. 
                        No basta con poner componentes potentes; hay que domar la termodinámica.
                    </p>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                        Nuestras Workstations de la serie <strong>Studio</strong> utilizan curvas de ventilación personalizadas en BIOS y chasis con aislamiento acústico para garantizar que tu micrófono solo capte tu voz, no tu PC.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="bg-carbon-black p-4 rounded border border-white/5 group hover:border-neon-cyan/30 transition-colors">
                            <FaVolumeMute className="text-neon-cyan text-2xl mb-2"/>
                            <h4 className="text-white font-bold">Acoustic Tuning</h4>
                            <p className="text-xs text-gray-500">Operación sub-30dB en cargas medias. Silencio absoluto en grabación.</p>
                        </div>
                        <div className="bg-carbon-black p-4 rounded border border-white/5 group hover:border-neon-cyan/30 transition-colors">
                            <FaHdd className="text-neon-cyan text-2xl mb-2"/>
                            <h4 className="text-white font-bold">Gen5 Storage</h4>
                            <p className="text-xs text-gray-500">NVMe de 12.000 MB/s. Scrubbing de 8K RAW sin proxys.</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    {/* Showcase Image - Ideally showing soundproofing or clean build */}
                    <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                         {comparisonImage && <GatsbyImage image={comparisonImage} alt="Interior Workstation Silenciosa VLCExtreme" />}
                    </div>
                    {/* Optional: Floating Badge */}
                    <div className="absolute -bottom-6 -left-6 bg-carbon-black border border-neon-cyan/30 p-4 rounded-lg shadow-xl hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                            <span className="text-xs font-mono text-neon-cyan">NVENC AV1 ENCODING: ACTIVE</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* 🔹 CREATIVE SOFTWARE STACK (Interactive) */}
      <section className="py-20 bg-carbon-black">
        <div className="container mx-auto px-6 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-12">
                Optimizado para tu Flujo de Trabajo
            </p>
            
            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                {[
                    { 
                        icon: <SiDavinciresolve />, 
                        name: "DaVinci Resolve", 
                        msg: "DaVinci%20Resolve%20Color%20Grading", 
                        color: "group-hover:text-[#ffffff] group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" // DaVinci branding is colorful, white glow works best
                    },
                    { 
                        icon: <SiAdobe />, 
                        name: "Adobe Creative Cloud", 
                        msg: "Adobe%20Premiere%20y%20After%20Effects", 
                        color: "group-hover:text-[#FF0000]" // Adobe Red
                    },
                    { 
                        icon: <SiUnrealengine />, 
                        name: "Unreal Engine 5", 
                        msg: "Unreal%20Engine%205%20y%20Virtual%20Production", 
                        color: "group-hover:text-[#ffffff]" // Unreal White/Black
                    },
                    { 
                        icon: <SiObsstudio />, 
                        name: "OBS / Streaming", 
                        msg: "Streaming%20profesional%20con%20OBS", 
                        color: "group-hover:text-[#ffffff]" 
                    },
                    { 
                        icon: <SiBlender />, 
                        name: "Blender 3D", 
                        msg: "Blender%20Cycles%20Rendering", 
                        color: "group-hover:text-[#EA7600]" // Blender Orange
                    },
                ].map((tool, index) => (
                    <a
                        key={index}
                        href={`https://wa.me/34963594092?text=Hola%20VLCExtreme%2C%20necesito%20un%20equipo%20optimizado%20para%20*${tool.msg}*.`}
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
                    * Validamos la compatibilidad de drivers (NVIDIA Studio vs Game Ready) según tu software principal para garantizar estabilidad absoluta en renders largos.
                </p>
            </div>
        </div>
      </section>

      {/* 🔹 CAROUSEL SECTION */}
      <section className="py-24 bg-dark-gray" id="models">
        <div className="container mx-auto px-6">
           <SelectConfigureCarouselSections category="production" />
        </div>
      </section>

      {/* 🔹 CTA CONSULTATION */}
      <section className="py-20 bg-gradient-to-b from-carbon-black to-dark-gray border-t border-white/5 text-center">
          <div className="container mx-auto px-6 max-w-3xl">
              <h2 className="text-3xl font-bold text-white mb-6">¿Tu estudio tiene requisitos especiales?</h2>
              <p className="text-gray-400 mb-8 text-lg">
                  Desde <strong>Rackmounts 4U</strong> para salas de servidores hasta torres <strong>SFF (Small Form Factor)</strong> para escritorios minimalistas.
                  Diseñamos el hardware que tu espacio necesita.
              </p>
              <Button to="/contacto" color="neoncyan" variant="outline" className="px-10 py-4 text-lg">
                  Hablar con un especialista
              </Button>
          </div>
      </section>

    </Layout>
  )
}

export const query = graphql`
  query WorkstationsPageQuery {
    hero: file(relativePath: { eq: "movie-production.png" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    comparison: file(relativePath: { eq: "workstations-valencia-alta-gama.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
  }
`

export default ProductionWorkstationsPage