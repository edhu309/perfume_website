export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        luxuryBg: '#0F172A',
        luxuryBgDark: '#020617',
        luxurySurface: '#1E293B',
        luxuryText: '#E2E8F0',
        luxuryMuted: '#94A3B8',
        luxurySilver: '#C0C0C0',
        luxuryGlow: '#38BDF8',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'silver-glow': '0 0 32px 0 #C0C0C055',
        'blue-glow': '0 0 48px 0 #38BDF822',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #0F172A 0%, #020617 100%)',
        'luxury-radial': 'radial-gradient(ellipse at 60% 40%, #38BDF822 0%, #0F172A 80%)',
      },
    },
  },
  plugins: [],
};
