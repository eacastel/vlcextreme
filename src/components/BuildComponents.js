import React from 'react';

const calculateTotal = (components) => {
  return Object.values(components).reduce((total, comp) => total + (comp.price || 0), 0);
};

const BuildComponents = ({ builds }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {builds.map((build, idx) => (
        <div key={idx} className="bg-carbon-black p-6 rounded-lg">
          <h3 className="text-neon-cyan text-xl mb-4">
            {build.tier} Build
          </h3>

          {Object.entries(build.mainComponents).map(([category, component]) => (
            <div key={category} className="mb-4">
              <h4 className="text-light-gray font-bold">{category}</h4>
              <div className="text-medium-gray text-neon-green">
                {component.name} - {component.price.toLocaleString()}€
              </div>
            </div>
          ))}

          <div className="mt-4 border-t border-dark-gray pt-4">
            <div className="flex justify-between text-light-gray">
              <span>Total:</span>
              <span className="text-neon-cyan">
                {calculateTotal(build.mainComponents).toLocaleString()}€
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuildComponents;
