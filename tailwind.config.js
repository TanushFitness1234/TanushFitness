/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Navy / Steel Palette (Pages 1-3: Home, About, Equipment)
        navy: {
          DEFAULT: '#0F1B28',
          bg: '#0F1B28',
          surface: '#142436',
          surfaceHover: '#1B2F46',
          card: '#F5F3EE',
          cardHover: '#EDE9E0',
          heading: '#F5F3EE',
          muted: '#8B96A2',
          mutedDark: '#677380',
          cardHeading: '#0F1B28',
          cardBody: '#5F5E5A',
          border: 'rgba(245, 243, 238, 0.12)',
        },
        steel: {
          DEFAULT: '#E8E8E8',
          accent: '#E8E8E8',
          hover: '#737C87',
          light: '#8E97A2',
          border: 'rgba(94, 101, 110, 0.3)',
          subtle: '#212A34',
        },

        // Charcoal / Orange Palette (Pages 4-6: Manpower, Services, Contact)
        charcoal: {
          DEFAULT: '#2B2B2B',
          bg: '#2B2B2B',
          surface: '#343434',
          surfaceHover: '#3F3F3F',
          card: '#F3EFE8',
          cardHover: '#EBE6DC',
          heading: '#F3EFE8',
          muted: '#B8B4AA',
          mutedDark: '#8E8A80',
          cardHeading: '#2B2B2B',
          cardBody: '#5F5E5A',
          border: 'rgba(243, 239, 232, 0.12)',
        },
        orange: {
          DEFAULT: '#C05C2E',
          accent: '#C05C2E',
          hover: '#A84E25',
          light: '#E27443',
          subtle: 'rgba(192, 92, 46, 0.15)',
          glow: 'rgba(192, 92, 46, 0.3)',
        },

        // Backward-compatible color references
        obsidian: {
          DEFAULT: '#0F1B28',
          950: '#0A121B',
          900: '#0F1B28',
          850: '#142436',
          800: '#1B2F46',
          700: '#263C54',
          600: '#344E6D',
        },
        terracotta: {
          DEFAULT: '#C05C2E',
          400: '#D26539',
          500: '#C05C2E',
          600: '#A84E25',
        },
      },
      fontFamily: {
        sans: ['General Sans', 'Plus Jakarta Sans', 'Montserrat', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        satoshi: ['Monument Extended', 'Unbounded', 'Syne', 'Clash Display', 'Satoshi', 'sans-serif'],
        display: ['Monument Extended', 'Unbounded', 'Syne', 'Clash Display', 'sans-serif'],
        heading: ['Monument Extended', 'Unbounded', 'Syne', 'Clash Display', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '3xl': '18px',
        '2xl': '14px',
        'xl': '10px',
        'lg': '8px',
        'md': '6px',
      },
      boxShadow: {
        'navy-card': '0 12px 30px -8px rgba(0, 0, 0, 0.45)',
        'charcoal-card': '0 12px 30px -8px rgba(0, 0, 0, 0.55)',
        'orange-glow': '0 0 25px rgba(192, 92, 46, 0.35)',
        'steel-glow': '0 0 20px rgba(94, 101, 110, 0.25)',
      }
    },
  },
  plugins: [],
}
