import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Button from "../components/Button";


const WorkstationsProfesionalesPage = ({ data }) => {
    const heroImage = getImage(data.hero);
    const paraQuienImage = getImage(data.paraQuien);
    const diferencialesImage = getImage(data.comparison);
    const whatsappUrl =
        "https://wa.me/34963594092?text=Hola%20VLCExtreme%2C%20quiero%20asesor%C3%ADa%20para%20una%20workstation%20profesional%20(desde%202500%E2%82%AC).";

    return (
        <Layout>
            <Seo
                title="Workstations profesionales a medida en València | VLCExtreme"
                description="Estaciones de trabajo y PCs de alto rendimiento diseñados a medida para 3D, render, edición de vídeo e IA. Montaje artesanal, componentes premium y soporte cercano en València. Desde 2.500 €."
                pathname="/workstations-profesionales-valencia"
            />

            <main className="bg-carbon-black text-light-gray">
                {/* 🔹 Hero Section */}
                <section
                    className="relative pt-20 pb-40 md:pt-24 md:pb-40 flex items-center overflow-hidden"
                    aria-labelledby="workstations-hero-title"
                >
                    {heroImage && (
                        <div className="absolute inset-0 w-full h-full">
                            <GatsbyImage
                                image={heroImage}
                                alt="Workstation profesional de alto rendimiento para 3D, render e IA"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-carbon-black/80" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1
                                id="workstations-hero-title"
                                className="text-3xl md:text-5xl lg:text-4xl font-bold text-light-gray mb-5 leading-tight"
                            >
                                ¿Hasta qué extremo quieres llegar?
                            </h1>

                            <p className="text-lg md:text-2xl text-light-gray mb-3">
                                Workstations de alto rendimiento diseñadas en València a medida
                                para quienes buscan algo más que un PC genérico.
                            </p>

                            <p className="text-base md:text-lg text-medium-gray mb-3">
                                Potencia, estabilidad silencio y tranquilidad para proyectos exigentes, edición, 3D, IA o simplemente trabajar sin cuellos de botella.
                            </p>

                            <p className="text-xs md:text-sm text-medium-gray mb-6">
                                Proyectos a partir de <strong>2.500&nbsp;€</strong> para profesionales
                                que viven de su equipo.
                            </p>

                            <Button to="/configuraciones?category=production" variant="outline" color="neongreen">
                                Configura tu Workstation
                            </Button>
                        </div>
                    </div>

                    {/* Scroll cue + roadmap */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                        <div className="bg-carbon-black/80 border border-dark-gray/70 px-3 py-2 rounded-full text-[10px] md:text-xs text-medium-gray flex items-center gap-2">
                            <span className="font-semibold text-light-gray hidden sm:inline">
                                En esta página:
                            </span>
                            <span>Proceso de trabajo</span>
                            <span>· Rangos de inversión</span>
                            <span className="hidden sm:inline">· Caso real de cliente</span>
                        </div>
                        <div className="mt-2 text-center text-[9px] uppercase tracking-[0.2em] text-medium-gray">
                            Sigue bajando
                            <div aria-hidden="true" className="mt-1 animate-bounce text-base leading-none">
                                ▾
                            </div>
                        </div>
                    </div>
                </section>

                {/* PARA QUIÉN */}
                <section className="bg-dark-gray py-16 px-4">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                        {/* Image LEFT */}
                        {paraQuienImage && (
                            <div className="order-1">
                                <GatsbyImage
                                    image={paraQuienImage}
                                    alt="Profesional creativo trabajando en una workstation VLCExtreme"
                                    className="rounded-2xl shadow-lg"
                                />
                            </div>
                        )}

                        {/* Text RIGHT */}
                        <div className="order-2">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                ¿Para quién son estas workstations?
                            </h2>
                            <p className="text-medium-gray mb-6">
                                En VLCExtreme trabajamos con profesionales que viven de su
                                ordenador y no pueden permitirse cuellos de botella, equipos ruidosos
                                ni equipos genéricos de tienda.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-medium-gray text-sm md:text-base">
                                {/* bullets… */}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* DIFERENCIALES */}
                <section className="bg-carbon-black py-16 px-4">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                        {/* Copy */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Qué hace diferente una workstation VLCExtreme
                            </h2>
                            <p className="text-medium-gray mb-6">
                                No vendemos cajas estándar ni &quot;ofertas de catálogo&quot;.
                                Cada estación de trabajo se diseña como un proyecto técnico completo,
                                pensado para tu forma real de trabajar.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-medium-gray text-sm md:text-base">
                                <li><strong>Diseño a medida:</strong> partimos de tus programas y de tus escenas reales.</li>
                                <li><strong>Silencio y estabilidad:</strong> prioridad en refrigeración y fuentes de calidad.</li>
                                <li><strong>Optimización del sistema:</strong> BIOS, drivers y sistema operativo afinados.</li>
                                <li><strong>Entrega lista para producir:</strong> llega probado y listo para abrir tus proyectos.</li>
                                <li><strong>Soporte cercano en València:</strong> acompañamiento antes y después de la compra.</li>
                            </ul>
                        </div>

                        {/* Image */}
                        {diferencialesImage && (
                            <div className="hidden md:block">
                                <GatsbyImage
                                    image={diferencialesImage}
                                    alt="Workstation VLCExtreme configurada para producción profesional"
                                    className="rounded-2xl shadow-lg"
                                />
                            </div>
                        )}
                    </div>
                </section>
                {/* PROCESO */}
                <section className="bg-dark-gray py-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Cómo trabajamos tu proyecto</h2>
                        <ol className="space-y-4 text-medium-gray">
                            <li>
                                <strong>1 · Comunicación inicial (online o en València):</strong>{" "}
                                revisamos tu trabajo real: software, tipo de proyectos, plazos,
                                presupuesto y expectativas.
                            </li>
                            <li>
                                <strong>2 · Propuesta técnica y rango de inversión:</strong> te
                                presentamos una propuesta clara con opciones dentro de un rango
                                desde 2.500&nbsp;€ en adelante, explicando el porqué de cada
                                decisión.
                            </li>
                            <li>
                                <strong>3 · Montaje y optimización:</strong> montaje a mano,
                                cableado limpio, refrigeración optimizada y pruebas de estrés
                                con tus casos de uso en mente.
                            </li>
                            <li>
                                <strong>4 · Entrega y acompañamiento:</strong> entrega en
                                València con puesta en marcha básica y soporte postventa para
                                ajustes, ampliaciones o dudas.
                            </li>
                        </ol>

                        <div className="mt-8">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-neon-cyan text-carbon-black font-semibold hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-neon-cyan/70"
                            >
                                Empezar ahora por WhatsApp
                            </a>
                        </div>
                    </div>
                </section>

                <section className="bg-carbon-black py-10 px-4">
                    <div className="max-w-5xl mx-auto bg-dark-gray/80 border border-dark-gray rounded-2xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-medium-gray text-sm md:text-base">
                            ¿Ves tu forma de trabajar reflejada aquí? Cuéntanos en qué punto estás y diseñamos una propuesta clara desde 2.500&nbsp;€.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-neon-cyan text-carbon-black font-semibold text-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-neon-cyan/70"
                        >
                            Hablar ahora por WhatsApp
                        </a>
                    </div>
                </section>

                {/* PRECIOS */}
                <section className="bg-carbon-black py-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Inversión y rangos de precios</h2>
                        <p className="text-medium-gray mb-6">
                            Trabajamos con los mejores componentes e ingeniería y nos dedicamos al 100%
                            a cada proyecto. No te ofrecemos la opción más barata, sino la mejor opción diseñada para ti, tus requerimientos y necesidades.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-dark-gray rounded-lg p-5">
                                <h3 className="text-xl font-semibold mb-2">
                                    Workstations profesionales
                                </h3>
                                <p className="text-medium-gray text-sm mb-2">
                                    Diseño, desarrollo, edición avanzada y multitarea exigente.
                                </p>
                                <p className="font-semibold text-neon-cyan">
                                    Rango habitual: 2.500 € – 3.500 €.
                                </p>
                            </div>

                            <div className="bg-dark-gray rounded-lg p-5">
                                <h3 className="text-xl font-semibold mb-2">
                                    Workstations 3D y render
                                </h3>
                                <p className="text-medium-gray text-sm mb-2">
                                    Escenas complejas, motores de render CPU/GPU y proyectos
                                    pesados.
                                </p>
                                <p className="font-semibold text-neon-cyan">
                                    Rango habitual: 3.500 € – 6.000 €.
                                </p>
                            </div>

                            <div className="bg-dark-gray rounded-lg p-5">
                                <h3 className="text-xl font-semibold mb-2">
                                    Workstations para IA
                                </h3>
                                <p className="text-medium-gray text-sm mb-2">
                                    GPUs de gama alta, grandes cantidades de RAM y almacenamiento
                                    ultrarrápido.
                                </p>
                                <p className="font-semibold text-neon-cyan">
                                    Rango habitual: desde 5.000 €.
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-medium-gray mt-4">
                            Si tu presupuesto está por debajo de 2.500 €, probablemente un
                            equipo genérico de tienda encaje mejor que una solución a medida
                            como la nuestra.
                        </p>
                    </div>
                </section>

                {/* REVIEW + CASE STUDY */}
                <section className="bg-dark-gray py-16 px-4">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">

                        {/* LEFT: GOOGLE REVIEW */}
                        <div className="bg-carbon-black/60 border border-dark-gray rounded-2xl p-6">
                            {/* Google logo */}
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src="/google-logo.png"
                                    alt="Google logo"
                                    className="w-6 h-6"
                                />
                                <span className="text-light-gray font-semibold text-lg">Reseña verificada</span>
                            </div>

                            {/* Stars */}
                            <div className="flex text-neon-green text-xl mb-4">
                                <span>★★★★★</span>
                            </div>

                            {/* Review text */}
                            <blockquote className="text-medium-gray italic leading-relaxed">
                                “Desde el primer contacto, el trato fue impecable. Se tomaron el tiempo de
                                entender exactamente qué necesitaba y me recomendaron la configuración
                                perfecta. El rendimiento ha superado todas mis expectativas: rápido,
                                silencioso, potente y optimizado al detalle. El servicio postventa demuestra
                                un compromiso real con el cliente.”
                            </blockquote>
                        </div>

                        {/* RIGHT: CASE STUDY */}
                        <div className="bg-carbon-black/60 border border-dark-gray rounded-2xl p-6">
                            <h3 className="text-2xl font-bold text-light-gray mb-3">
                                Caso real: Workstation profesional para proyectos 3D y render avanzado
                            </h3>

                            <p className="text-medium-gray mb-4">
                                Un diseñador de escenarios virtuales en València necesitaba un equipo capaz de
                                mover proyectos complejos en 3ds Max, AutoCAD y Photoshop sin cuelgues ni
                                esperas eternas. Su estación de trabajo personalizada fue optimizada para
                                escenas pesadas, renderizado GPU y flujo de trabajo continuo.
                            </p>

                            <ul className="text-medium-gray list-disc pl-5 space-y-2">
                                <li>Rendimiento estable incluso con escenas de millones de polígonos.</li>
                                <li>Silencio absoluto gracias a refrigeración avanzada.</li>
                                <li>Optimización de BIOS, drivers y energía según su software.</li>
                                <li>Entrega lista para producir desde el minuto uno.</li>
                            </ul>
                        </div>

                    </div>
                </section>


                {/* FAQ + CTA FINAL */}
                <section className="bg-carbon-black py-16 px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Preguntas frecuentes</h2>
                        <div className="space-y-4 text-medium-gray mb-10">
                            <div>
                                <h3 className="font-semibold">
                                    ¿Trabajáis solo con clientes en València?
                                </h3>
                                <p>
                                    No, pero nuestra prioridad son clientes en València y
                                    alrededores, porque nos permite ofrecer un servicio más
                                    cercano y una mejor experiencia de entrega.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold">
                                    ¿Puedo traer mi propia lista de componentes?
                                </h3>
                                <p>
                                    Sí, podemos revisarla juntos. Si algo no encaja con la
                                    estabilidad o el equilibrio del equipo, te propondremos
                                    alternativas.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold">¿Incluís sistema operativo?</h3>
                                <p>
                                    Podemos entregar el equipo con Windows 11 Pro configurado o
                                    con una distribución Linux optimizada, según tus necesidades.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold">
                                    ¿Qué pasa si quiero ampliar más adelante?
                                </h3>
                                <p>
                                    Diseñamos las configuraciones pensando también en futuras
                                    ampliaciones de RAM, almacenamiento o GPU.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">
                                ¿Listo para diseñar tu próxima workstation?
                            </h2>
                            <p className="text-medium-gray mb-6">
                                Cuéntanos en qué trabajas, qué programas utilizas y qué
                                problemas quieres resolver. A partir de ahí, diseñamos una
                                estación de trabajo pensada exclusivamente para ti.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-neon-cyan text-carbon-black font-semibold hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-neon-cyan/70"
                                >
                                    Escribir por WhatsApp (respuesta rápida)
                                </a>
                                <Button to="/contacto/" color="neongreen">
                                    Enviar formulario de proyecto
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};


/* 🔹 GraphQL Query for Workstation Images */
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
    editingWorkstation: file(relativePath: { eq: "vlcextreme-editing-workstation.png" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
    renderingWorkstation: file(relativePath: { eq: "vlcextreme-rendering-workstation.png" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
      }
    }
  }
`

export default WorkstationsProfesionalesPage;
