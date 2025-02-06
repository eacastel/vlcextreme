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
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
