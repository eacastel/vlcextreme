import React from 'react'
import { Link } from 'gatsby'

const Button = ({ to, children, color = 'neon-cyan', variant = 'solid', className = '' }) => {
  const baseStyles = 'inline-block px-8 py-3 text-sm font-semibold text-center transition-colors rounded-md'

  const variants = {
    solid: {
      neoncyan: `bg-neon-cyan text-carbon-black hover:bg-[#00a4c4]`,
      vividred: `bg-vivid-red text-light-gray hover:bg-[#e03600]`,
      neongreen: `bg-neon-green text-carbon-black hover:bg-[#00e07a]`,
    },
    outline: {
      neoncyan: `border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan`,
      vividred: `border-2 border-vivid-red text-vivid-red hover:bg-vivid-red/10 hover:border-vivid-red`,
      neongreen: `border-2 border-neon-green text-neon-green hover:bg-neon-green/10 hover:border-neon-green`,
    },
  }

  // Ensure the variant exists, otherwise fallback to neon cyan solid
  const variantClass = variants[variant]?.[color] || variants.solid.neoncyan;

  return (
    <Link
      to={to}
      className={`${baseStyles} ${variantClass} ${className}`}
    >
      {children}
    </Link>
  )
}

export default Button
