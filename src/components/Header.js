import React, { useState, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 1. Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // 2. Handle scroll for header styling
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
          gatsbyImageData(width: 200, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
        }
      }
    }
  `);

  const productLinks = [
    { name: "Gaming Élite", path: "/ordenadores-gaming" },
    { name: "Creadores Extrem", path: "/ordenadores-creadores-streamers" },
    { name: "Workstations IA", path: "/ordenadores-inteligencia-artificial", highlight: true },
  ];

  const mainLinks = [
    { name: "Configuraciones", path: "/configuraciones" },
    { name: "Blog", path: "/blog" },
    { name: "Quiénes somos", path: "/about" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    // ✅ WRAPPER: We use a Fragment to allow multiple root elements
    <>
      {/* ================================================================== */}
      {/* MAIN HEADER BAR (Z-50)                                             */}
      {/* ================================================================== */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-carbon-black/95 backdrop-blur-md border-white/10 shadow-lg' 
            : 'bg-carbon-black border-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            
            <Link to="/" className="flex-shrink-0 z-50 block" aria-label="Inicio">
              <GatsbyImage
                image={data.logo.childImageSharp.gatsbyImageData}
                alt="VLCExtreme Logo"
                className="h-12 w-auto"
                imgStyle={{ objectFit: 'contain', maxWidth: '200px' }}
              />
            </Link>

            {/* ---------------- DESKTOP NAVIGATION ---------------- */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              
              {/* Desktop Dropdown */}
              <div className="relative group h-full flex items-center">
                <button 
                  className="flex items-center gap-1 text-sm font-bold text-gray-300 hover:text-neon-cyan transition-colors py-2 focus:outline-none focus:text-neon-cyan"
                  aria-haspopup="true"
                  aria-label="Menú Sistemas"
                >
                  Sistemas 
                  <FaChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div 
                  className="absolute top-full left-0 w-64 pt-2 transition-all duration-200 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto"
                  aria-label="Submenú Sistemas"
                >
                  <div className="bg-dark-gray border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2 flex flex-col gap-1">
                    {productLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                          item.highlight 
                            ? "text-purple-400 hover:bg-purple-500/10" 
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Links */}
              {mainLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-bold text-gray-300 hover:text-neon-cyan transition-colors duration-200 tracking-wide whitespace-nowrap"
                  activeClassName="!text-neon-cyan"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block pl-4">
              <Link
                to="/contacto"
                className="bg-neon-cyan text-carbon-black px-6 py-2 rounded-md font-bold text-sm hover:bg-[#00A4C4] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
              >
                Contacto
              </Link>
            </div>

            {/* Mobile Toggle Button (Only visible when menu is CLOSED) */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white text-2xl focus:outline-none z-50 p-2"
              aria-label="Abrir menú principal"
            >
              <FaBars />
            </button>
          </div>
        </nav>
      </header>

      {/* ================================================================== */}
      {/* MOBILE MENU SYSTEM (OUTSIDE THE HEADER TAG)                        */}
      {/* This ensures it is always fixed to the VIEWPORT, not the header    */}
      {/* ================================================================== */}

      {/* 1. BACKDROP OVERLAY (Z-55) */}
      <div 
        onClick={() => setMobileMenuOpen(false)}
        role="button"
        tabIndex={0}
        aria-label="Cerrar menú"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setMobileMenuOpen(false);
        }}
        className={`
          lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]
          transition-opacity duration-300
          ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      />

      {/* 2. SLIDING DRAWER MENU (Z-60) */}
      <div 
          className={`
              lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm
              bg-carbon-black border-l border-white/10 shadow-2xl z-[60]
              transform transition-transform duration-300 ease-out
              ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              flex flex-col
          `}
      >
        {/* Drawer Header (Close Button) */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Menú</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-neon-cyan transition-colors p-2"
              aria-label="Cerrar menú"
            >
              <FaTimes size={24} />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {/* Sistemas Group */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
              Sistemas VLCExtreme
            </span>
            <div className="flex flex-col gap-2">
              {productLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg text-lg font-bold transition-all 
                      ${item.highlight 
                          ? "text-purple-400 bg-purple-500/10 border border-purple-500/20" 
                          : "text-white bg-white/5 hover:bg-white/10 hover:text-neon-cyan"
                      }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Links */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">
              Navegación
            </span>
            {mainLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-2 text-lg font-medium text-gray-300 hover:text-neon-cyan border-b border-transparent hover:border-neon-cyan/30 transition-all"
                activeClassName="!text-neon-cyan font-bold"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-white/10 bg-carbon-black">
          <Link
            to="/contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="block bg-neon-cyan text-carbon-black py-4 rounded-xl font-bold text-xl text-center w-full transition-all hover:bg-[#00A4C4] hover:shadow-lg shadow-neon-cyan/20"
          >
            Iniciar Proyecto
          </Link>
        </div>

      </div>
    </>
  );
}