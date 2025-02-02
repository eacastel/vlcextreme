import React, { useState } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Squash as Hamburger } from 'hamburger-react'

export default function Header({ logo }) {
  const [isOpen, setOpen] = useState(false)

  // Updated nav items without "Inicio"
  const navItems = [
    { name: "PCs Gaming & Streaming", path: "/gaming" },
    { name: "Workstations IA", path: "/workstations" },
    { name: "Sobre VLCExtreme", path: "/about" },
    { name: "Contacto", path: "/contact" },
  ]

  return (
    <header className="bg-carbon-black/85 backdrop-blur-md sticky top-0 z-50 border-b border-dark-gray">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with constrained size */}
          <Link 
            to="/" 
            className="z-50 flex-shrink-0" 
            style={{ width: '160px' }} // Constrain logo container width
          >
            <GatsbyImage
              image={logo}
              alt="VLCExtreme Logo"
              className="h-12 w-auto" // Reduced height
              imgStyle={{
                objectFit: 'contain',
                maxWidth: '200px' // Proper max-width for logo
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-6 xl:gap-x-8 flex-1 justify-end">
            <div className="flex items-center gap-x-4 xl:gap-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-light-gray hover:text-neon-cyan transition-colors font-medium text-sm xl:text-base whitespace-nowrap"
                  activeClassName="text-neon-cyan"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="ml-4">
              <Link
                to="/configure"
                className="bg-neon-cyan text-carbon-black px-5 py-2 rounded-md font-bold hover:bg-[#00a4c4] transition-colors text-sm xl:text-base whitespace-nowrap"
              >
                Configura tu PC
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              size={24}
              color="#EAEAEA"
              rounded
            />
          </div>

          {/* Mobile Navigation */}
          <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden absolute top-full left-0 right-0 bg-carbon-black z-40`}>
            <ul className="flex flex-col items-center py-4 space-y-4">
              {navItems.map((item) => (
                <li key={item.path} className="w-full text-center">
                  <Link
                    to={item.path}
                    className="block text-light-gray hover:text-neon-cyan py-2 px-4 transition-colors font-medium"
                    activeClassName="text-neon-cyan"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="mt-4">
                <Link
                  to="/configure"
                  className="bg-neon-cyan text-carbon-black px-8 py-2 rounded-md font-bold hover:bg-[#00a4c4] transition-colors inline-block"
                >
                  Configura tu PC
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}