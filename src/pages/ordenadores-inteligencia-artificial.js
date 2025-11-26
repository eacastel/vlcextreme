import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Seo from '../components/Seo'
import SelectConfigureCarouselSections from "../components/SelectConfigureCarouselSections";
import { 
  FaBrain, 
  FaServer, 
  FaNetworkWired, 
  FaTemperatureHigh, 
  FaMicrochip, 
  FaDocker 
} from 'react-icons/fa';
import { SiPytorch, SiTensorflow, SiNvidia, SiLinux } from "react-icons/si";

const WorkstationsPage = ({ data }) => {
  const heroImage = getImage(data.hero)
  const comparisonImage = getImage(data.comparison)

  return (
    <Layout>
      <Seo
        title="Workstations IA & Deep Learning | NVIDIA H100 & Threadripper | VLCExtreme"
        description="Infraestructura de cómputo para Inteligencia Artificial en Valencia. Servidores y Workstations optimizados para entrenamiento LLM, Data Science y Machine Learning con soporte CUDA nativo."
        image="/og-pc-ia.jpg"
        pathname="/ordenadores-inteligencia-artificial"
      />

      {/* 🔹 HERO: Industrial Compute */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-carbon-black">
        {heroImage && (
          <div className="absolute inset-0 w-full h-full">
            <GatsbyImage
              image={heroImage}
              alt="Centro de datos AI VLCExtreme"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-carbon-black via-carbon-black/90 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-6 relative z-10 pt-10">
          <div className="max-w-3xl">
            <span className="text-purple-500 font-bold tracking-[0.2em] text-xs uppercase border border-purple-500/30 px-3 py-1 rounded bg-purple-500/10 mb-6 inline-block">
              AI Infrastructure Division
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Infraestructura para la<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Era de la Inteligencia.
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl font-light">
              Desde <strong>Inferencia Local</strong> hasta <strong>Entrenamiento de LLMs</strong> a gran escala. 
              Diseñamos clusters y estaciones de trabajo validadas para operar 24/7 bajo cargas AVX-512 y CUDA intensivas.
            </p>
            <div className="flex flex-wrap gap-4">
                <Button to="#models" color="purple" variant="solid" className="shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    Ver Arquitecturas
                </Button>
                <Button to="/contacto" color="white" variant="outline">
                    Consultoría de Hardware
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 THE TECHNICAL PROBLEM (Why custom?) */}
      <section className="py-24 bg-dark-gray border-y border-white/5">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        El cuello de botella <br/>
                        <span className="text-purple-400">es la VRAM.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                        En el entrenamiento de modelos (LLMs) y Ciencia de Datos, la velocidad del procesador es secundaria. 
                        El límite real es la memoria de vídeo.
                    </p>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                        Un PC convencional no puede cargar un modelo <strong>Llama-3 70B</strong> en memoria. 
                        Nuestras arquitecturas <strong>Multi-GPU</strong> están diseñadas específicamente para sumar VRAM (NVLink / PCIe p2p), 
                        permitiendo cargar datasets masivos que harían colapsar a un equipo estándar.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="bg-carbon-black p-4 rounded border border-white/5">
                            <FaNetworkWired className="text-purple-500 text-2xl mb-2"/>
                            <h4 className="text-white font-bold">PCIe Lanes</h4>
                            <p className="text-xs text-gray-500">Threadripper PRO ofrece 128 líneas PCIe para alimentar 4 GPUs a velocidad x16 real.</p>
                        </div>
                        <div className="bg-carbon-black p-4 rounded border border-white/5">
                            <FaTemperatureHigh className="text-purple-500 text-2xl mb-2"/>
                            <h4 className="text-white font-bold">Thermal Velocity</h4>
                            <p className="text-xs text-gray-500">Refrigeración calculada para cargas del 100% durante semanas de entrenamiento.</p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    {/* Diagram Placeholder - Visualizes Multi-GPU connectivity */}
                     
                    <div className="rounded-xl overflow-hidden border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                         {comparisonImage && <GatsbyImage image={comparisonImage} alt="Laboratorio de IA VLCExtreme" />}
                    </div>
                </div>
            </div>
        </div>
      </section>

    {/* 🔹 SOFTWARE STACK (Interactive Lead Gen) */}
      <section className="py-20 bg-carbon-black">
        <div className="container mx-auto px-6 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-12">
                Entornos Validados & Optimizados
            </p>
            
            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                {[
                    { 
                        icon: <SiPytorch />, 
                        name: "PyTorch", 
                        msg: "PyTorch%20y%20Deep%20Learning", 
                        color: "group-hover:text-[#EE4C2C]" // Official PyTorch Orange
                    },
                    { 
                        icon: <SiTensorflow />, 
                        name: "TensorFlow", 
                        msg: "TensorFlow", 
                        color: "group-hover:text-[#FF6F00]" // Official TF Orange
                    },
                    { 
                        icon: <SiNvidia />, 
                        name: "CUDA / TensorRT", 
                        msg: "librer%C3%ADas%20CUDA%20y%20TensorRT", 
                        color: "group-hover:text-[#76B900]" // Official NVIDIA Green
                    },
                    { 
                        icon: <FaDocker />, 
                        name: "Docker", 
                        msg: "contenedores%20Docker%20y%20Kubernetes", 
                        color: "group-hover:text-[#2496ED]" // Official Docker Blue
                    },
                    { 
                        icon: <SiLinux />, 
                        name: "Ubuntu / Rocky", 
                        msg: "Linux%20Enterprise%20(Ubuntu%2FRocky)", 
                        color: "group-hover:text-[#FCC624]" // Linux Gold
                    },
                ].map((tool, index) => (
                    <a
                        key={index}
                        href={`https://wa.me/34963594092?text=Hola%20VLCExtreme%2C%20busco%20hardware%20optimizado%20para%20*${tool.msg}*%20y%20cargas%20de%20IA.`}
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
                    * Haz clic en tu tecnología para consultar compatibilidad. Entregamos equipos con el stack pre-configurado (Drivers, CUDA Toolkit, Docker NVIDIA Runtime) bajo petición.
                </p>
            </div>
        </div>
      </section>

      {/* 🔹 EDUCATIONAL SECTION (SEO + Authority) */}
      <section className="py-20 bg-dark-gray border-t border-white/5">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-10 text-center">Diccionario de Hardware IA</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Concept 1 */}
                    <div className="bg-carbon-black p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                        <FaBrain className="text-purple-500 text-2xl mb-4" />
                        <h3 className="text-white font-bold mb-2">Entrenamiento vs Inferencia</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            El <strong>Entrenamiento</strong> requiere masiva VRAM y computación FP32/FP16 (GPUs H100/4090). 
                            La <strong>Inferencia</strong> (ejecutar el modelo) es más ligera y puede optimizarse con cuantización (INT8).
                        </p>
                    </div>

                    {/* Concept 2 */}
                    <div className="bg-carbon-black p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                        <FaServer className="text-purple-500 text-2xl mb-4" />
                        <h3 className="text-white font-bold mb-2">VRAM Pooling</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Los modelos LLM grandes (70B+) no caben en una sola tarjeta. Usamos NVLink o PCIe paralelo para dividir el modelo entre múltiples GPUs como si fuera una sola memoria gigante.
                        </p>
                    </div>

                    {/* Concept 3 */}
                    <div className="bg-carbon-black p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                        <FaMicrochip className="text-purple-500 text-2xl mb-4" />
                        <h3 className="text-white font-bold mb-2">Tensor Cores</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Núcleos especializados en las GPUs NVIDIA que aceleran las operaciones matriciales masivas, el corazón de cualquier red neuronal moderna.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 🔹 CAROUSEL SECTION */}
      <section className="py-24 bg-carbon-black" id="models">
        <div className="container mx-auto px-6">
           <SelectConfigureCarouselSections category="ai" />
        </div>
      </section>

      {/* 🔹 CTA CONSULTATION */}
      <section className="py-20 bg-gradient-to-b from-dark-gray to-carbon-black border-t border-white/5 text-center">
          <div className="container mx-auto px-6 max-w-3xl">
              <h2 className="text-3xl font-bold text-white mb-6">¿Proyecto de Investigación o Enterprise?</h2>
              <p className="text-gray-400 mb-8 text-lg">
                  Las necesidades de cómputo varían drásticamente según el modelo y el dataset. 
                  No adivines. Habla con nuestros ingenieros para dimensionar tu cluster correctamente.
              </p>
              <Button to="/contacto" color="purple" variant="solid" className="px-10 py-4 text-lg">
                  Agendar Sesión de Ingeniería
              </Button>
          </div>
      </section>

    </Layout>
  )
}

/* 🔹 Updated Query */
export const query = graphql`
  query WorkstationsPageQuery {
    hero: file(relativePath: { eq: "workstations-hero.png" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    comparison: file(relativePath: { eq: "ai-lab.png" }) {
      childImageSharp {
        gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
  }
`

export default WorkstationsPage