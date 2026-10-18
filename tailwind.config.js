export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: '#0A0806',
        ink: '#120E0A',
        coal: '#1B1510',
        umber: '#2A2119',
        gold: '#C8A26B',
        'gold-soft': '#E3C79A',
        'gold-deep': '#8C6A3C',
        butter: '#E9B872',
        champagne: '#F3E6CF',
        cream: '#F3E9D8',
        smoke: '#A39684',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin 24s linear infinite',
        'float-slow': 'float 7s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
