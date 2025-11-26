import React, { useState, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaWhatsapp, FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';

export default function HeaderLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Detect Scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "vlcextreme-logo-header.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 180
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90 
          )
        }
      }
    }
  `);

  // Anchor links specific to this landing page
  const landingLinks = [
    { name: "Protocolo de Trabajo", target: "#process" },
    { name: "Preguntas Frequentes", target: "#faq" },
  ];

  const whatsappUrl = "https://wa.me/34963594092?text=Hola%20VLCExtreme...";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${
        isScrolled 
          ? 'bg-carbon-black/95 backdrop-blur-md border-white/10 py-3 shadow-2xl' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* LEFT: Pure VLCExtreme Logo */}
          <Link to="/" className="flex-shrink-0 block" aria-label="Volver al inicio">
            <GatsbyImage
              image={data.logo.childImageSharp.gatsbyImageData}
              alt="VLCExtreme Logo"
              className="w-32 md:w-40"
              imgStyle={{ objectFit: 'contain' }}
            />
          </Link>

          {/* CENTER: Focused Navigation (Anchors) */}
          <div className="hidden md:flex items-center gap-8">
            {landingLinks.map((link) => (
              <a 
                key={link.name}
                href={link.target}
                className="text-sm font-bold text-gray-300 hover:text-white hover:tracking-wide transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* RIGHT: Call to Action */}
          <div className="flex items-center gap-4">
            {/* Subtle 'Home' link for navigation safety */}
            <Link 
              to="#top" 
              className="hidden lg:flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-white transition-colors mr-2"
            >
              <FaArrowLeft /> Volver
            </Link>

            {/* Main Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-neon-green/10 border border-neon-green/50 text-white px-5 py-2 rounded hover:bg-neon-green hover:text-carbon-black transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              <FaWhatsapp className="text-lg" />
              <span className="text-sm font-bold tracking-wide">Consulta Técnica</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white text-2xl focus:outline-none"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-carbon-black border-b border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
           <div className="flex flex-col p-6 gap-4 text-center">
              {landingLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.target}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-neon-green text-lg font-bold"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/10 my-2"/>
              <a
                href={whatsappUrl}
                className="flex items-center justify-center gap-2 bg-neon-green text-carbon-black py-3 rounded font-bold"
              >
                <FaWhatsapp /> Hablar con un Técnico
              </a>
           </div>
        </div>

      </nav>
    </header>
  )
}