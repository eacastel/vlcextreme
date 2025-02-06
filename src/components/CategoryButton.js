import React from 'react';

const CategoryButton = ({
  categoryKey,
  label,
  isActive,
  onClick,
  variant = 'solid',
  color = 'neoncyan',
  activeClass = '', // custom active class provided by the parent
  className = ''
}) => {
  // Base styles for the button
  const baseStyles = 'inline-block px-4 py-2 text-sm font-bold text-center transition-all rounded-xl shadow-lg mb-6';

  // Variant definitions for solid and outline buttons
  const variants = {
    solid: {
      neoncyan: 'bg-neon-cyan text-carbon-black hover:bg-[#00a4c4] hover:shadow-neon-cyan',
      vividred: 'bg-vivid-red text-light-gray hover:bg-[#e03600] hover:shadow-vivid-red',
      neongreen: 'bg-neon-green text-carbon-black hover:bg-[#00e07a] hover:shadow-neon-green',
      neonyellow: 'bg-neon-yellow text-carbon-black hover:bg-[#e6c500] hover:shadow-neon-yellow',
    },
    outline: {
      neoncyan: 'border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-neon-cyan',
      vividred: 'border-2 border-vivid-red text-vivid-red hover:bg-vivid-red/10 hover:shadow-vivid-red',
      neongreen: 'border-2 border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-neon-green',
      neonyellow: 'border-2 border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10 hover:shadow-neon-yellow',
      neonorange: 'border-2 border-neon-orange text-neon-orange hover:bg-neon-orange/10 hover:shadow-neon-orange',
    },
  };

  // Determine the variant class based on the provided variant and color
  const variantClass = variants[variant]?.[color.toLowerCase()] || variants.solid.black;
  
  // If the button is active, apply the custom active class provided
  const computedActiveClass = isActive ? activeClass : '';

  return (
    <button
      onClick={() => onClick(categoryKey)}
      className={`${baseStyles} ${variantClass} ${computedActiveClass} ${className}`}
    >
      {label}
    </button>
  );
};

export default CategoryButton;
