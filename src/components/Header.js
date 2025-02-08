import React, { useState } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Squash as Hamburger } from 'hamburger-react'

export default function Header() {
  const [isOpen, setOpen] = useState(false)

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
  `)

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
          {/* Logo */}
          <Link to="/" className="z-50 flex-shrink-0" style={{ width: '160px' }}>
            <GatsbyImage
              image={data.logo.childImageSharp.gatsbyImageData}
              alt="VLCExtreme Logo"
              className="h-12 w-auto"
              imgStyle={{
                objectFit: 'contain',
                maxWidth: '200px'
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
                to="/configuraciones"
                className="bg-neon-cyan text-carbon-black px-5 py-2 rounded-md font-bold text-sm xl:text-base whitespace-nowrap
                transition-all duration-200 ease-in-out hover:bg-[#00A4C4] hover:shadow-[0_0_10px_#00A4C4]"
              >
                Configuraciones
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
                  to="/configuraciones"
                  className="bg-neon-cyan text-carbon-black px-8 py-2 rounded-md font-bold text-sm xl:text-base whitespace-nowrap
                  transition-all duration-200 ease-in-out hover:bg-[#00A4C4] hover:shadow-[0_0_10px_#00A4C4]"
                >
                  Configuraciones
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
