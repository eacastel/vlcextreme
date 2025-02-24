import React from "react";
import { Link } from "gatsby";
import PaymentMethods from "./PaymentMethods";

const slugify = (text) => {
  return text
    .normalize("NFD") // Decomposes accented characters
    .replace(/[\u0300-\u036f]/g, "") // Removes diacritics
    .toLowerCase()
    .replace(/\s+/g, "-"); // Converts spaces to hyphens
};

export default function Footer() {
  const quickLinks = [
    "Configuraciones",
    "Condiciones de Venta y Garantía",
    "Privacidad",
    "Términos y Condiciones",
  ];

  const socialLinks = {
    Twitter: "https://twitter.com/vlcextreme",
    Instagram: "https://instagram.com/vlcextreme",
    YouTube: "https://youtube.com/vlcextreme",
  };

  return (
    <footer className="bg-footer-gray text-light-gray border-t border-dark-gray">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">VLCExtreme</h3>
            <p className="text-medium-gray">
              Especializados en PCs personalizados, ensamblados a mano para
              máximo rendimiento en gaming, streaming y desarrollo de IA.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${slugify(link)}`}
                    className="text-medium-gray hover:text-neon-cyan transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Payment Methods */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <a
              href="mailto:support@vlcextreme.com"
              className="text-medium-gray hover:text-neon-cyan transition-colors block mb-2"
            >
              info@vlcextreme.com
            </a>

            {/* Payment Methods */}
            <h4 className="text-lg font-semibold mt-6">Métodos de Pago</h4>
            <ul className="space-y-1 text-medium-gray">
              <li>Tarjeta de Crédito/Débito (Visa, MasterCard, Amex), Transferencia Bancaria (IBAN España), PayPal, ₿ Bitcoin (BTC), Ξ Ethereum (ETH)</li>
            </ul>
            <PaymentMethods />
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              {Object.entries(socialLinks).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medium-gray hover:text-neon-cyan transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-gray mt-8 pt-8 text-center text-medium-gray">
          <p>© {new Date().getFullYear()} VLCExtreme. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
