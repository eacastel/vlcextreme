import React from 'react'
import Header from './Header'
import ManufacturerLogos from "./ManufacturerLogos";
import Footer from './Footer'

export default function Layout({ children }) {


  return (
    <div className="min-h-screen flex flex-col bg-carbon-black">
      <Header />
      <main className="flex-grow">{children}</main>
      <ManufacturerLogos />
      <Footer />
    </div>
  )
}