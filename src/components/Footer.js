import React from "react";
import { Link } from "gatsby";
import PaymentMethods from "./PaymentMethods";
import horchataLogo from "../images/horchata-logo.svg";

const slugify = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

export default function Footer() {
  // 1. Main Navigation (Matching your Header)
  const mainLinks = [
    { name: "Gaming Élite", path: "/ordenadores-gaming" },
    { name: "Creadores Extrem", path: "/ordenadores-creadores-streamers" },
    { name: "Workstations IA", path: "/ordenadores-inteligencia-artificial" },
    { name: "Configuraciones", path: "/configuraciones" },
    { name: "Blog", path: "/blog" },
    { name: "Quiénes somos", path: "/about" },
    { name: "Contacto", path: "/contacto" },
    { name: "FAQ", path: "/faq" },
  ];

  // 2. Legal Links (Moved to Bottom)
  const legalLinks = [
    "Condiciones de Venta y Garantía",
    "Condiciones de Uso",
    "Privacidad",
    "Cookies"
  ];

  const socialLinks = {
    Twitter: "https://twitter.com/vlcextreme",
    Instagram: "https://instagram.com/vlcextreme",
    YouTube: "https://youtube.com/@VLCExtreme",
  };

  return (
    <footer
      className="bg-footer-gray text-light-gray border-t border-dark-gray"
      aria-label="Pie de página de VLCExtreme"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <meta itemProp="name" content="VLCExtreme" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">

          {/* ------------------------------------------------------- */}
          {/* COL 1 & 2: Brand, About & Address/Map (Kept as is)      */}
          {/* ------------------------------------------------------- */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">VLCExtreme</h3>
            <p className="text-medium-gray mb-6">
              Especializados en PCs personalizados, ensamblados a mano para
              máximo rendimiento en gaming, streaming y estaciones de trabajo de IA.
            </p>

            <h4 className="text-lg font-semibold mb-3">Dónde estamos</h4>
            <p className="text-medium-gray mb-3">
              (Atención en Valencia <strong>solo con cita previa</strong>).
            </p>
            <address
              className="not-italic text-medium-gray mb-2"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <span className="block">
                <span itemProp="streetAddress">C/ de Dalt, 37, 2do bajo derecha</span>,{" "}
                <span itemProp="addressLocality"> Ciutat Vella, València</span>{" "}
                <span itemProp="postalCode">46003</span>
              </span>

              <span className="block">
                <span itemProp="addressRegion">Comunitat Valenciana</span>,{" "}
                <span itemProp="addressCountry">España</span>
              </span>
            </address>

            <div className="relative w-full md:w-4/5 overflow-hidden rounded-xl border border-dark-gray">
              {/* Map iframe */}
              <iframe
                title="Mapa de ubicación VLCExtreme en C/ de Dalt, València"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24630.466536031196!2d-0.4194819644473506!3d39.49624269909675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f44c5e3b53b%3A0xd864f11aa29a0f37!2sVLCExtreme!5e0!3m2!1sen!2ses!4v1763035261475!5m2!1sen!2ses"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                style={{ height: 180 }}
                aria-label="Mapa de Google con la ubicación de VLCExtreme en C/ de Dalt, València"
              />


              {/* Dark overlay (does not block clicks) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/15 pointer-events-none rounded-xl" />

            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=C%2F+Alta%2C+37%2C+46003+Val%C3%A8ncia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-medium-gray hover:text-neon-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan/60 rounded"
              aria-label="Abrir ubicación en Google Maps"
            >
              Cómo llegar en Google Maps
            </a>
          </div>

          {/* ------------------------------------------------------- */}
          {/* COL 3: Main Navigation (UPDATED)                        */}
          {/* ------------------------------------------------------- */}
          <nav aria-label="Enlaces rápidos y redes sociales">
            <h4 className="text-lg font-semibold mb-4">Explorar</h4>
            <ul className="space-y-2 mb-6">
              {mainLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-medium-gray hover:text-neon-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan/60 rounded block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div
              className="flex flex-wrap gap-4"
              role="navigation"
              aria-label="Redes sociales"
            >
              {Object.entries(socialLinks).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medium-gray hover:text-neon-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-neon-cyan/60 rounded"
                  aria-label={`Visitar el perfil de VLCExtreme en ${name}`}
                >
                  {name}
                </a>
              ))}
            </div>
          </nav>

          {/* ------------------------------------------------------- */}
          {/* COL 4: Contact & Payment (Kept as is)                   */}
          {/* ------------------------------------------------------- */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <a
              href="mailto:info@vlcextreme.com"
              className="text-medium-gray hover:text-neon-cyan transition-colors block mb-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan/60 rounded"
              itemProp="email"
            >
              info@vlcextreme.com
            </a>

            <a
              href="https://wa.me/34963594092"
              target="_blank"
              rel="noopener noreferrer"
              className="text-medium-gray hover:text-neon-cyan transition-colors block mb-2 focus:outline-none focus:ring-2 focus:ring-neon-cyan/60 rounded"
              aria-label="Contactar por WhatsApp con VLCExtreme"
            >
              WhatsApp: +34 963 594 092
            </a>

            <h4 className="text-lg font-semibold mt-6">Métodos de Pago</h4>
            <ul className="space-y-1 text-medium-gray">
              <li>
                Tarjeta de Crédito/Débito (Visa, MasterCard, Amex),
                Transferencia Bancaria (IBAN España), PayPal, ₿ Bitcoin (BTC),
                Ξ Ethereum (ETH)
              </li>
            </ul>
            <PaymentMethods />
          </div>
        </div>

        {/* ------------------------------------------------------- */}
        {/* BOTTOM BAR: Updated with SVG Logo                       */}
        {/* ------------------------------------------------------- */}
        <div className="border-t border-dark-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          {/* LEFT SIDE: Copyright & Dev Credit */}
          <div className="flex flex-col gap-2">
            
            <p className="text-sm text-medium-gray">
              © {new Date().getFullYear()} <span itemProp="name">VLCExtreme</span>.
              Todos los derechos reservados.
            </p>

            <p className="text-xs text-gray-500 flex items-center justify-center md:justify-start gap-1 ml-2">
              Desarrollo digital por{' '}
              <a 
                href="https://horchatalabs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-gray-400 hover:text-neon-cyan transition-colors duration-300 flex items-center gap-1 group"
                aria-label="Visitar Horchata Labs, desarrolladores del sitio"
              >
                {/* 👇 2. LOGO IMPLEMENTATION */}
                <img 
                    src={horchataLogo} 
                    alt="Horchata Labs Logo" 
                    className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 -mt-[4px]"
                />
                Horchata Labs
              </a>
            </p>
          </div>

          {/* RIGHT SIDE: Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            {legalLinks.map((link) => (
                <Link 
                    key={link} 
                    to={`/${slugify(link)}`} 
                    className="text-sm text-medium-gray hover:text-neon-cyan transition-colors"
                >
                    {link}
                </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}