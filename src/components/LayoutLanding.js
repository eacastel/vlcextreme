import React from 'react'
import HeaderLanding from './HeaderLanding'
import ManufacturerLogos from "./ManufacturerLogos";
import Footer from './Footer'

export default function LayoutLanding({ children }) {


  return (
    <div className="min-h-screen flex flex-col bg-carbon-black">
      <HeaderLanding />
      <main className="flex-grow">{children}</main>
      <ManufacturerLogos />
      <Footer />
    </div>
  )
}