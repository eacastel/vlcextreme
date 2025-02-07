module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./gatsby-config.js",
  ],
  theme: {
    extend: {
      colors: {
        'carbon-black': '#0D0D0D',
        'light-gray': '#EAEAEA',
        'medium-gray': '#B3B3B3',
        'neon-cyan': '#00A8CF', 
        'vivid-red': '#FF450A', 
        'neon-green': '#00E472', 
        'neon-yellow': '#FFD000', 
        'dark-gray': '#232323',
        'footer-gray': '#1A1A1A',
        'neon-orange': '#FF8C00'
      },
    },
  },
  safelist: [
    'top-[265px]',
    '-right-2', 
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'text-white',
    'text-black',
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
