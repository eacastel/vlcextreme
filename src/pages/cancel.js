import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const CancelPage = () => (
  <Layout>
    <div className="min-h-screen bg-carbon-black text-light-gray flex items-center justify-center">
      <div className="text-center max-w-lg px-6 py-10 bg-dark-gray border border-gray-700 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-neon-red mb-4">Pago Cancelado</h1>
        <p className="text-lg text-medium-gray mb-6">
          No se completó tu compra. Si hubo un problema, intenta nuevamente o 
          <span className="text-neon-cyan font-semibold"> contáctanos </span> para obtener ayuda.
        </p>
        <Link to="/" className="mt-6 inline-block bg-neon-cyan text-carbon-black px-6 py-3 rounded-md font-bold text-lg transition-all duration-200 hover:bg-neon-cyan/90">
          Volver al Inicio
        </Link>
      </div>
    </div>
  </Layout>
);

export default CancelPage;
