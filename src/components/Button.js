import React from 'react';
import { Link } from 'gatsby';

const Button = ({ to, onClick, children, color = 'neoncyan', variant = 'solid', className = '', disabled = false }) => {
  const baseStyles = 'inline-block px-8 py-3 text-sm font-semibold text-center transition-all rounded-md shadow-lg cursor-pointer';

  const variants = {
    solid: {
      neoncyan: `bg-neon-cyan text-carbon-black hover:bg-[#00a4c4] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]`,
      vividred: `bg-vivid-red text-light-gray hover:bg-[#e03600] hover:shadow-[0_0_20px_rgba(255,69,0,0.6)]`,
      neongreen: `bg-neon-green text-carbon-black hover:bg-[#00e07a] hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]`,
      neonyellow: `bg-neon-yellow text-carbon-black hover:bg-[#e6c500] hover:shadow-[0_0_20px_rgba(255,255,0,0.6)]`,
      purple: `bg-purple-500 text-white hover:bg-[#9333ea] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]`,
    },
    outline: {
      neoncyan: `border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]`,
      vividred: `border-2 border-vivid-red text-vivid-red hover:bg-vivid-red/10 hover:shadow-[0_0_15px_rgba(255,69,0,0.4)]`,
      neongreen: `border-2 border-neon-green text-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]`,
      neonyellow: `border-2 border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10 hover:shadow-[0_0_15px_rgba(255,255,0,0.4)]`,
      purple: `border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]`,
    },
  };

  const variantClass = variants[variant]?.[color] || variants.solid.neoncyan;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={`${baseStyles} ${variantClass} ${className}`}>
      {children}
    </Link>
  );
};

export default Button;
