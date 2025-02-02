import React from 'react'
import { Link } from 'gatsby'

const Button = ({ to, children, color = 'neon-cyan', variant = 'solid', className = '' }) => {
  const baseStyles = 'inline-block px-8 py-3 text-sm font-semibold text-center transition-colors rounded-md'
  
  const variants = {
    solid: {
      neoncyan: `bg-neon-cyan text-carbon-black hover:bg-[#00a4c4]`,
      vividred: `bg-vivid-red text-light-gray hover:bg-[#e03600]`,
    },
    outline: `border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10`,
  }

  const variantClass = variant === 'outline' 
    ? variants.outline 
    : variants.solid[color]

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