/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': {
          DEFAULT: '#0B0C10',
          50: '#1A1B2F',
        },
        'industrial-steel': {
          DEFAULT: '#1F2833',
          50: '#2A3542',
        },
        'lexis-gold': {
          DEFAULT: '#F2A900',
          50: '#F4B820',
        },
        'photon-blue': {
          DEFAULT: '#00D2FF',
          50: '#33DDFF',
        },
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'photon-travel': 'photon-travel 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'scan-line': 'scan-line 2.5s infinite',
        'beacon-pulse': 'beacon-pulse 2s infinite',
      },
      keyframes: {
        'photon-travel': {
          '0%, 100%': { left: '10%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '50%': { left: '90%', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 210, 255, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(0, 210, 255, 0.6), 0 0 120px rgba(0, 210, 255, 0.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'scan-line': {
          '0%': { top: '-2px', opacity: '1' },
          '100%': { top: '100%', opacity: '0.3' },
        },
        'beacon-pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, #0B0C10, #1F2833)',
        'gold-gradient': 'linear-gradient(135deg, #F2A900 0%, #FFD700 100%)',
        'blue-gradient': 'linear-gradient(135deg, #00D2FF 0%, #33DDFF 100%)',
      },
    },
  },
  plugins: [],
}
