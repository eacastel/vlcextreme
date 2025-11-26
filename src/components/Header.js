import React, { useState, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Detect scroll
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
            width: 200
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90 
          )
        }
      }
    }
  `);

  // 1. The Product Dropdown Links
  const productLinks = [
    { name: "Gaming Élite", path: "/ordenadores-gaming" },
    { name: "Creadores Extrem", path: "/ordenadores-creadores-streamers" },
    { name: "Workstations IA", path: "/ordenadores-inteligencia-artificial", highlight: true },
  ];

  // 2. The Main Top-Level Links
  const mainLinks = [
    { name: "Configuraciones", path: "/configuraciones" },
    { name: "Blog", path: "/blog" },
    { name: "Quiénes somos", path: "/about" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-carbon-black/95 backdrop-blur-md border-white/10 shadow-lg' 
          : 'bg-carbon-black border-transparent'
      }`}
    >
      {/* ✅ RESTORED: py-3 for tighter height */}
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* ✅ RESTORED: Original Logo Sizing Logic */}
          <Link to="/" className="flex-shrink-0 z-50 block" aria-label="Inicio">
            <GatsbyImage
              image={data.logo.childImageSharp.gatsbyImageData}
              alt="VLCExtreme Logo"
              className="h-12 w-auto" // Height 12 (48px), Width Auto matches aspect ratio
              imgStyle={{ 
                objectFit: 'contain', 
                maxWidth: '200px' // Ensure it doesn't blow up
              }}
            />
          </Link>

          {/* ---------------- DESKTOP NAVIGATION ---------------- */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            
            {/* DROPDOWN: Sistemas */}
            <div 
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-bold text-gray-300 hover:text-neon-cyan transition-colors py-2">
                Sistemas <FaChevronDown className={`text-xs transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* The Dropdown Menu */}
              <div className={`absolute top-full left-0 w-64 pt-2 transition-all duration-200 ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
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

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white text-2xl focus:outline-none z-50"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* ---------------- MOBILE MENU (Full Screen) ---------------- */}
        <div 
            className={`lg:hidden fixed inset-0 bg-carbon-black z-40 flex flex-col justify-center px-8 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}
        >
           <ul className="flex flex-col gap-6 text-left">
              
              {/* Mobile Products Group */}
              <li className="border-b border-white/10 pb-4 mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 block">Sistemas</span>
                <div className="flex flex-col gap-4 pl-2">
                  {productLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-bold ${item.highlight ? "text-purple-400" : "text-white"}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </li>

              {/* Standard Links */}
              {mainLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xl font-bold text-gray-300 hover:text-neon-cyan"
                    activeClassName="text-neon-cyan"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              <li className="mt-6">
                <Link
                  to="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block bg-neon-cyan text-carbon-black px-8 py-4 rounded font-bold text-center text-lg w-full"
                >
                  Contacto
                </Link>
              </li>
           </ul>
        </div>

      </nav>
    </header>
  );
}