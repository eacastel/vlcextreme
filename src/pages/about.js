

import React from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import { FaFingerprint, FaMicrochip, FaStopwatch, FaSearch } from 'react-icons/fa';

const AboutPage = ({ data }) => {
  // We re-use the available images but frame them differently
  // If you have a close-up of a hand holding a chip or a screwdriver, use that for 'stressTest'
  const stressTestImage = getImage(data.stressTest);
  const heroImage = getImage(data.ahero);

  return (
    <Layout>
      <Seo
        title="Nuestra filosofía | Ingeniería artesanal en València | VLCExtreme"
        description="No somos un almacén, somos un laboratorio. En VLCExtreme diseñamos workstations y ordenadores de alto rendimiento bajo demanda, con componentes seleccionados específicamente para ti."
        pathname="/nosotros"
      />

      {/* 🔹 HERO: Focus on Philosophy */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center text-light-gray overflow-hidden">

        {/* Background Image & Overlay */}
        <div className="absolute inset-0 w-full h-full">
          {heroImage && (
            <GatsbyImage
              image={heroImage}
              alt="Ingeniería de hardware VLCExtreme"
              // 1. INCREASED OPACITY: Changed from opacity-30 to opacity-60
              className="w-full h-full object-cover opacity-60"
            />
          )}

          {/* 2. SOFTENED GRADIENT: 
               - 'from-carbon-black/90' (Dark top for navbar)
               - 'via-carbon-black/40' (See-through middle for image visibility)
               - 'to-carbon-black' (Seamless blend into next section) 
           */}
          <div className="absolute inset-0 bg-gradient-to-b from-carbon-black/90 via-carbon-black/40 to-carbon-black" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          {/* Added a subtle text shadow to ensure readability against the brighter image */}
          <div className="drop-shadow-xl">
            <p className="text-neon-cyan tracking-[0.2em] uppercase text-sm font-bold mb-4">
              Manifiesto VLCExtreme
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              No somos un almacén.<br />
              <span className="text-gray-200">Somos un laboratorio.</span>
            </h1>
            <p className="text-xl text-gray-100 font-medium leading-relaxed">
              La informática de alto rendimiento no se basa en apilar cajas.
              Se basa en entender la electrónica, la termodinámica y tu ambición.
            </p>
          </div>
        </div>
      </section>

      {/* 🔹 SECTION 1: The "Boutique" Logic (Honesty about the process) */}
      <section className="py-20 bg-carbon-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Text Side */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                El valor de lo <span className="text-neon-cyan">hecho a medida</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  Todo empezó por una frustración personal: ver cómo ordenadores “premium” fallaban por montar componentes genéricos o stock antiguo.
                  VLCExtreme nace de una obsesión por la electrónica y por el hardware bien hecho.
                </p>
                <p>
                  <strong>Nuestra verdad es simple:</strong> no tenemos estanterías llenas de cajas acumulando polvo.
                  Trabajamos con un modelo <em>boutique</em>, centrado en cada proyecto, no en el volumen.
                </p>
                <p className="border-l-4 border-neon-cyan pl-4 text-white italic">
                  “Cuando nos encargas un equipo, adquirimos los componentes específicamente para tu unidad.
                  Así te aseguras la última revisión de fabricación, sin piezas que llevan años en un almacén.”
                </p>
              </div>
            </div>

            {/* Visual/Icon Side (Replaces the fake workshop image with strong iconography/concepts) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-dark-gray p-6 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors">
                <FaFingerprint className="text-4xl text-neon-cyan mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Huella única</h3>
                <p className="text-sm text-gray-400">
                  Tu ordenador no existe hasta que lo diseñamos juntos. No es el “modelo X” del catálogo, es tu herramienta de trabajo.
                </p>
              </div>
              <div className="bg-dark-gray p-6 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors">
                <FaStopwatch className="text-4xl text-neon-cyan mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Componentes frescos</h3>
                <p className="text-sm text-gray-400">
                  Cero stock antiguo. Trabajamos con lotes recientes para maximizar estabilidad y vida útil.
                </p>
              </div>
              <div className="bg-dark-gray p-6 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors">
                <FaMicrochip className="text-4xl text-neon-cyan mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Selección manual</h3>
                <p className="text-sm text-gray-400">
                  Elegimos marca y modelo exactos de cada pieza. Nada de “o similar” escondido en la factura.
                </p>
              </div>
              <div className="bg-dark-gray p-6 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-colors">
                <FaSearch className="text-4xl text-neon-cyan mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Transparencia</h3>
                <p className="text-sm text-gray-400">
                  Hablamos claro. Si una configuración no te conviene, te lo diremos, aunque sea la opción más barata.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🔹 SECTION 2: The Process/Validation (Using the 'stressTest' image if real, or generic tech vibe) */}
      <section className="py-20 bg-dark-gray border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Side - Ideally a close up of assembly or testing */}
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-neon-cyan/20 blur-3xl rounded-full opacity-20"></div>
              <GatsbyImage
                image={stressTestImage}
                alt="Proceso de ensamblaje manual y validación"
                className="rounded-lg shadow-2xl relative z-10 border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="text-xs text-center mt-3 text-gray-500 font-mono">
                * Montaje y validación manual en nuestras instalaciones en Valencia.
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-white mb-6">Obsesión por la estabilidad</h2>
              <p className="text-gray-400 mb-6 text-lg">
                Un ordenador profesional es un sistema. Rendimiento, energía y refrigeración deben trabajar en equilibrio para que todo funcione con elegancia y precisión.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-neon-cyan rounded-full mr-4 shrink-0"></span>
                  <p className="text-gray-300">
                    <strong>Validación de 24&nbsp;h:</strong> probamos tu equipo a fondo para garantizar que llega afinado, estable y listo para trabajar desde el primer minuto.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-neon-cyan rounded-full mr-4 shrink-0"></span>
                  <p className="text-gray-300">
                    <strong>Curvas de ventilación a medida:</strong> ajustamos la BIOS y los perfiles de ventilación para que el PC sea silencioso cuando trabajas
                    y eficiente cuando renderizas o haces simulaciones.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 bg-neon-cyan rounded-full mr-4 shrink-0"></span>
                  <p className="text-gray-300">
                    <strong>Soporte local real:</strong> si nos llamas, hablas con el técnico que montó tu equipo, no con un call center perdido en un script.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 CTA: Honest Close */}
      <section className="py-24 bg-carbon-black text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl md:text-5xl  font-bold text-white mb-6 !leading-tight">
            ¿Buscas una máquina, <br /> o buscas <span className="text-neon-cyan">tu máquina</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
  Construir algo excelente lleva tiempo. Si valoras la precisión por encima de la inmediatez, probablemente seamos tu equipo.
</p>

          <a
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-carbon-black transition-all duration-200 bg-neon-cyan rounded-lg hover:bg-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-cyan focus:ring-offset-carbon-black"
          >
            Iniciar consulta técnica
          </a>
        </div>
      </section>

    </Layout>
  );
};

export const query = graphql`
  query AboutPageQuery {
      ahero: file(relativePath: { eq: "about-hero-vlcextreme-bg.png" }) {
      childImageSharp { gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90) }
    }
    stressTest: file(relativePath: { eq: "pc-ensamblaje-vlcextreme-amd-threadripper.png" }) {
      childImageSharp { 
        gatsbyImageData(width: 800, aspectRatio: 1, transformOptions: { cropFocus: CENTER }, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90) 
      }
    }
  }
`;

export default AboutPage;