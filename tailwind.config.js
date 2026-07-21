/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFF8F0',
        pearl: '#FBF6EE',
        champagne: '#F3E5D3',
        cream: '#F6EEE0',
        gold: {
          light: '#E4C98B',
          DEFAULT: '#C6A15B',
          deep: '#9C7A3C',
        },
        rosegold: '#E3BFB6',
        maroon: '#5A1A2B',
        royalgreen: '#1F3D2B',
        luxblack: '#161210',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        eyebrow: ['"Cinzel"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-sheen': 'linear-gradient(120deg, #9C7A3C 0%, #E4C98B 45%, #C6A15B 55%, #9C7A3C 100%)',
        'ivory-fade': 'radial-gradient(circle at 50% 20%, #FFF8F0 0%, #F3E5D3 60%, #E9D9C2 100%)',
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(156, 122, 60, 0.35)',
        glass: '0 8px 32px 0 rgba(90, 26, 43, 0.12)',
      },
      letterSpacing: {
        widest2: '0.35em',
      },
    },
  },
  plugins: [],
}
