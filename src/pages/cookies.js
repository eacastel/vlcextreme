import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const PoliticaDeCookies = () => {
  return (
    <Layout>
      <Seo
        title="Política de Cookies | VLCExtreme"
        description="Consulta nuestra Política de Cookies y gestiona tus preferencias en VLCExtreme."
        pathname="/cookies"
      />
      <div className="mx-auto max-w-screen-lg px-4 md:px-8 lg:px-16">
        <section className="container mx-auto px-6 py-16 text-light-gray">
          <div className="container mx-auto px-6 py-10 text-light-gray">
            <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>

            <p>
              En <strong>VLCExtreme</strong>, utilizamos cookies para mejorar tu experiencia de navegación y ofrecerte contenido relevante.
              Puedes cambiar tus preferencias de cookies en cualquier momento haciendo clic en el botón de configuración de cookies.
            </p>

            <h2 className="text-2xl font-bold mt-6">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto almacenados en tu dispositivo cuando visitas nuestro sitio web.
              Nos permiten recordar tus preferencias y mejorar el rendimiento del sitio.
            </p>

            <h2 className="text-2xl font-bold mt-6">2. Cómo Gestionar y Eliminar Cookies</h2>
            <p>
              Puedes cambiar la configuración de tu navegador para bloquear o eliminar las cookies.
              A continuación, te dejamos los enlaces a las guías oficiales de los navegadores más utilizados:
            </p>

            <ul className="list-disc list-inside">
              <li>
                <strong>Chrome:</strong>
                <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer" className="underline"> Gestión de Cookies en Chrome</a>
              </li>
              <li>
                <strong>Safari:</strong>
                <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline"> Configuración de Cookies en Safari</a>
              </li>
              <li>
                <strong>Firefox:</strong>
                <a href="https://support.mozilla.org/es/kb/limpiar-cookies-y-datos-de-sitios-en-firefox" target="_blank" rel="noopener noreferrer" className="underline"> Eliminar Cookies en Firefox</a>
              </li>
              <li>
                <strong>Internet Explorer:</strong>
                <a href="https://support.microsoft.com/es-es/topic/c%C3%B3mo-eliminar-archivos-de-cookies-en-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc" target="_blank" rel="noopener noreferrer" className="underline"> Eliminar Cookies en Internet Explorer</a>
              </li>
            </ul>

            <p>
              Si utilizas otro navegador, consulta la documentación de soporte oficial de tu navegador.
            </p>

            <h2 className="text-2xl font-bold mt-6">3. Tipos de Cookies que Utilizamos</h2>
            <ul className="list-disc list-inside">
              <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento del sitio.</li>
              <li><strong>Cookies de Análisis:</strong> Nos ayudan a mejorar la experiencia del usuario mediante datos anónimos.</li>
              <li><strong>Cookies de Publicidad:</strong> Utilizadas por terceros para mostrar anuncios personalizados.</li>
            </ul>

            <h2 className="text-2xl font-bold mt-6">4. Configuración de Cookies</h2>
            <p>
              Puedes cambiar tus preferencias de cookies en cualquier momento a través del botón de configuración en nuestro sitio.
            </p>

          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PoliticaDeCookies;
