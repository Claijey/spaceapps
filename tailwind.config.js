/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
        '6': '6px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        'game-sky': '#1E1B4B',
        'game-skyLight': '#312E81',
        'game-cream': '#FFFDF7',
        'game-creamDark': '#F5EFE6',
        'game-yellow': '#FBBF24',
        'game-yellowDark': '#D97706',
        'game-blue': '#38BDF8',
        'game-blueDark': '#0284C7',
        'game-mint': '#34D399',
        'game-mintDark': '#059669',
        'game-coral': '#FB7185',
        'game-coralDark': '#E11D48',
        'game-purple': '#A855F7',
        'game-purpleDark': '#7E22CE',
        'game-ink': '#0F172A',
        'game-inkMuted': '#475569',
        game: {
          sky: '#1E1B4B',       // vibrant deep twilight indigo
          skyLight: '#312E81',  // twilight purple-indigo
          cream: '#FFFDF7',     // warm high-contrast card background
          creamDark: '#F5EFE6', // subtle card border / shadow
          yellow: '#FBBF24',    // sunny chunky button
          yellowDark: '#D97706',
          blue: '#38BDF8',      // bright sky blue
          blueDark: '#0284C7',
          mint: '#34D399',      // joyful mint green
          mintDark: '#059669',
          coral: '#FB7185',     // playful energetic coral
          coralDark: '#E11D48',
          purple: '#A855F7',
          purpleDark: '#7E22CE',
          ink: '#0F172A',       // ultra-legible cartoon comic text
          inkMuted: '#475569',
        },
      },
      fontFamily: {
        heading: ['Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
        body: ['Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'chunky-sm': '0 4px 0 rgba(15, 23, 42, 0.25)',
        'chunky': '0 6px 0 rgba(15, 23, 42, 0.25)',
        'chunky-lg': '0 8px 0 rgba(15, 23, 42, 0.3)',
        'pop': '0 12px 30px -5px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
