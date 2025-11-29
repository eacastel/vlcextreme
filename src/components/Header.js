import React, { useState, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Effect to handle body scrolling when the menu is open
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
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

            {/* Desktop Dropdown: Sistemas */}
            <div className="relative group h-full flex items-center">
              <button
                className="flex items-center gap-1 text-sm font-bold text-gray-300 hover:text-neon-cyan transition-colors py-2 focus:outline-none focus:text-neon-cyan"
                aria-haspopup="true"
                aria-label="Menú Sistemas" // ADDED: Explicit label for the dropdown trigger
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
                      className={`block px-4 py-3 rounded-lg text-sm font-bold transition-colors ${item.highlight
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

            {/* Standard Links */}
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

          {/* Mobile Toggle (LINE 205 AREA) - ARIA-LABEL is key here */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white text-2xl focus:outline-none z-50"
            aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"} // ENSURED label is present and detailed
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* ---------------- OFF-CANVAS MOBILE MENU ---------------- */}
        <div
          className={`
                lg:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm
                bg-carbon-black border-l border-white/10 shadow-2xl z-40
                transform transition-transform duration-500 ease-in-out
                ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                flex flex-col overflow-y-auto
            `}
        >
          <div className="p-6 pt-20 flex flex-col gap-8">

            {/* 1. Sistemas Group */}
            <div className="pb-4 border-b border-white/10">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Sistemas VLCExtreme</span>
              <div className="flex flex-col gap-2">
                {productLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 px-3 rounded-lg text-base font-bold transition-colors 
                        ${item.highlight
                        ? "text-purple-400 bg-purple-500/10 hover:bg-purple-500/20"
                        : "text-white hover:text-neon-cyan hover:bg-white/5"
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Main Links */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 block">Información</span>
              {mainLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg text-base font-bold text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition-colors"
                  activeClassName="!text-neon-cyan"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* 3. CTA Button (Large and prominent) */}
            <div className="mt-4">
              <Link
                to="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="block bg-neon-cyan text-carbon-black px-8 py-3 rounded-md font-bold text-lg text-center w-full transition-all hover:bg-[#00A4C4] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                Iniciar Proyecto
              </Link>
            </div>

          </div>
        </div>

        {/* MOBILE MENU OVERLAY (Clickable backdrop to close menu - ACCESSIBILITY CORRECTED) */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          // Fixes a11y warnings by allowing keyboard navigation (Enter/Space)
          role="button"
          tabIndex={0}
          // ADDED: aria-label to satisfy the 'control-has-associated-label' rule
          aria-label="Cerrar menú"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setMobileMenuOpen(false);
            }
          }}
          className={`
    lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-500
    ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
  `}
        />

      </nav>
    </header>
  );
}