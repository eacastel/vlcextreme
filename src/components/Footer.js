import React from 'react'
import { Link } from 'gatsby'

export default function Footer() {
  return (
    <footer className="bg-footer-gray text-light-gray border-t border-dark-gray">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">VLCExtreme</h3>
            <p className="text-medium-gray">
              Especializados en PCs personalizados, ensamblados a mano para máximo rendimiento en gaming, streaming y desarrollo de IA.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {['Configurador', 'Preguntas Frecuentes', 'Tiempos de entrega', 'Política de garantía'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-medium-gray hover:text-neon-cyan transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-medium-gray mb-2">support@vlcextreme.com</p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'YouTube'].map((social) => (
                <a 
                  key={social}
                  href={`https://${social}.com/vlcextreme`}
                  className="text-medium-gray hover:text-neon-cyan transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-dark-gray mt-8 pt-8 text-center text-medium-gray">
          <p>© {new Date().getFullYear()} VLCExtreme. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}