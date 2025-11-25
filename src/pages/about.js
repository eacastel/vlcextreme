import React from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';

const AboutPage = ({ data }) => {
  const workshopImage = getImage(data.workshop);
  const stressTestImage = getImage(data.stressTest);
  const heroImage = getImage(data.ahero);

  return (
    <Layout>
      <Seo 
        title="Sobre VLCExtreme | Ordenadores Gaming y Workstations de Alto Rendimiento en Valencia"
        description="Descubre VLCExtreme: expertos en ordenadores de alto rendimiento en Valencia. PCs personalizados para gaming, creación de contenido e inteligencia artificial."
        pathname="/nosotros"
      />

      {/* 🔹 Hero Section with Background Image */}
      <section className="relative min-h-[70vh] flex items-center text-center text-light-gray">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <GatsbyImage 
            image={heroImage} 
            alt="Fondo tecnológico con ordenador de alto rendimiento"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark Overlay for Contrast */}
        <div className="absolute inset-0 bg-carbon-black/80" />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Más que un PC, una Revolución Tecnológica
          </h1>
          <p className="text-xl text-medium-gray mt-4">
            “La tecnología solo tiene sentido cuando nos libera, cuando nos da más posibilidades, no cuando nos limita.”
          </p>
        </div>
      </section>

      {/* 🔹 Historia */}
<section className="py-20 bg-carbon-black text-left text-lg">
  <div className="container mx-auto px-6">
    <h2 className="text-center text-3xl md:text-4xl font-bold text-light-gray mb-6">Nuestra Historia</h2>
    <p className="text-medium-gray max-w-3xl mx-auto">
      Como apasionados del gaming, la productividad y la IA, nos frustraba la rápida obsolescencia de los portátiles.
      Queríamos una solución que ofreciese máxima potencia, personalización y durabilidad. Así nació <strong>VLCExtreme</strong>, 
      desde Valencia, un emergente hub tecnológico en Europa.
    </p>
    <p className="text-medium-gray max-w-3xl mx-auto mt-4">
      Valencia no solo es nuestra casa, es el <strong>epicentro</strong> de innovación en España. 
      Desde aquí, trabajamos con los mejores fabricantes y tenemos acceso a los últimos avances en hardware personalizado.
    </p>
    <div className="mt-8 text-center">
      <GatsbyImage image={workshopImage} alt="Taller de ensamblaje VLCExtreme" className="rounded-lg mx-auto shadow-lg"/>
    </div>
  </div>
</section>
      {/* 🔹 Calidad y Pruebas */}
      <section className="py-20  text-left bg-dark-gray text-lg">
  <div className="container mx-auto px-6">
    <h2 className=" text-center  text-3xl md:text-4xl font-bold text-light-gray mb-6">Nuestro Compromiso con la Calidad</h2>
    <p className="text-medium-gray max-w-3xl mx-auto">
      Cada <strong>VLCExtreme</strong> pasa por  <strong>pruebas de estrés, ajustes de BIOS y optimización térmica</strong> antes de salir de nuestro taller.
    </p>
    <p className="text-medium-gray max-w-3xl mx-auto mt-4">
      Desde Valencia, estamos rodeados por un ecosistema tecnológico vibrante que nos permite colaborar con los mejores 
      especialistas en hardware, garantizar las configuraciones más avanzadas y ofrecer ordenadores de <strong>rendimiento extremo </strong> 
      sin limitaciones.
    </p>
    <div className="mt-8 text-center">
      <GatsbyImage image={stressTestImage} alt="Test de estrés en VLCExtreme" className="rounded-lg mx-auto shadow-lg"/>
    </div>
  </div>
</section>
    
      {/* 🔹 Call to Action */}
      <section className="py-20 bg-carbon-black text-center text-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-light-gray mb-6">Únete a la Experiencia VLCExtreme</h2>
          <p className="text-medium-gray max-w-3xl mx-auto">
            Si buscas el mejor rendimiento para gaming, IA o producción, un <strong>VLCExtreme</strong> está diseñado para <strong>potencia sin límites</strong>.
          </p>
          <a href="/contacto" className="mt-8 inline-block bg-neon-cyan text-carbon-black px-6 py-3 text-lg font-bold rounded-lg transition hover:opacity-80">
            Contáctanos para diseñar tu PC
          </a>
        </div>
      </section>

    </Layout>
  );
};

/* 🔹 GraphQL Query for Images */
export const query = graphql`
  query AboutPageQuery {
      ahero: file(relativePath: { eq: "about-hero-vlcextreme-bg.png" }) {
      childImageSharp { gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90) }
    }
    workshop: file(relativePath: { eq: "vlcextreme-workshop.png" }) {
      childImageSharp { gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90) }
    }
    stressTest: file(relativePath: { eq: "pc-ensamblaje-vlcextreme.png" }) {
      childImageSharp { gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90) }
    }
  }
`;

export default AboutPage;
