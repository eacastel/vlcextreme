import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const MarketDisclaimer = () => {
  return (
    <div className="bg-dark-gray border-l-4 border-neon-yellow p-4 my-8 rounded-r-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex items-start gap-3">
        <FaInfoCircle className="text-neon-yellow text-xl mt-1 flex-shrink-0" />
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">
            Aviso de Volatilidad de Mercado
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Debido a la fluctuación diaria del mercado de semiconductores, los precios mostrados son 
            <strong> estimaciones base</strong>. 
            En VLCExtreme cotizamos los componentes en tiempo real el día de tu solicitud para garantizar 
            el mejor precio posible y el lote de fabricación más reciente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketDisclaimer;