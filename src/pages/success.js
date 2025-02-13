import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const SuccessPage = () => (
  <Layout>
    <div className="min-h-screen bg-carbon-black text-light-gray flex items-center justify-center">
      <div className="text-center max-w-lg px-6 py-10 bg-dark-gray border border-gray-700 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-neon-cyan mb-4">¡Pago Exitoso!</h1>
        <p className="text-lg text-medium-gray mb-6">
          Gracias por tu compra. Recibirás un correo de confirmación en breve.
        </p>
        <Link to="/" className="mt-6 inline-block bg-neon-cyan text-carbon-black px-6 py-3 rounded-md font-bold text-lg transition-all duration-200 hover:bg-neon-cyan/90">
          Volver al Inicio
        </Link>
      </div>
    </div>
  </Layout>
);

export default SuccessPage;
