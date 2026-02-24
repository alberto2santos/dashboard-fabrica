/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      // ── Cores ──────────────────────────────────────────────
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a5f',
          950: '#172554',
        },
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        success: {
          DEFAULT: '#10b981',
          light:   '#34d399',
          dark:    '#059669',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light:   '#fcd34d',
          dark:    '#d97706',
        },
        danger: {
          DEFAULT: '#ef4444',
          light:   '#f87171',
          dark:    '#dc2626',
        },
        sensor: {
          temp:     '#f97316',
          humidity: '#3b82f6',
          pressure: '#a855f7',
        },
      },

      // ── Tipografia ─────────────────────────────────────────
      fontFamily: {
        sans:    ['Inter',         'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono','monospace'],
        display: ['Inter',         'system-ui', 'sans-serif'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },

      // ── Espaçamento extra ──────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '88':  '22rem',
        '92':  '23rem',
        '96':  '24rem',
        '100': '25rem',
        '104': '26rem',
      },

      // ── Border radius ──────────────────────────────────────
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // ── Sombras ────────────────────────────────────────────
      boxShadow: {
        'glow-brand':   '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-warning': '0 0 20px rgba(245, 158, 11, 0.15)',
        'glow-danger':  '0 0 20px rgba(239, 68, 68, 0.20)',
        'glow-sensor':  '0 0 16px rgba(249, 115, 22, 0.15)',
        'card':         '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        'card-hover':   '0 4px 20px rgba(0,0,0,0.5)',
        'drawer':       '-8px 0 32px rgba(0,0,0,0.5)',
        'toast':        '0 8px 32px rgba(0,0,0,0.6)',
        'inner-dark':   'inset 0 2px 4px rgba(0,0,0,0.3)',
      },

      // ── Animações ──────────────────────────────────────────
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)'   },
        },
        'fade-in-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to:   { opacity: '1', transform: 'translateX(0)'    },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to:   { opacity: '1', transform: 'translateX(0)'     },
        },
        'pulse-ring': {
          '0%':   { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.4)'  },
          '70%':  { boxShadow: '0 0 0 8px rgba(239, 68, 68, 0)'  },
          '100%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)'    },
        },
        'pulse-ring-warning': {
          '0%':   { boxShadow: '0 0 0 0 rgba(245, 158, 11, 0.4)' },
          '70%':  { boxShadow: '0 0 0 8px rgba(245, 158, 11, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(245, 158, 11, 0)'   },
        },
        'blink': {
          '0%, 100%': { opacity: '1'   },
          '50%':      { opacity: '0.3' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)'   },
          to:   { transform: 'rotate(360deg)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)'    },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },

      animation: {
        'fade-in':            'fade-in 0.2s ease-out forwards',
        'fade-in-up':         'fade-in-up 0.3s ease-out forwards',
        'fade-in-down':       'fade-in-down 0.3s ease-out forwards',
        'slide-in-right':     'slide-in-right 0.25s ease-out forwards',
        'slide-in-left':      'slide-in-left 0.25s ease-out forwards',
        'pulse-ring':         'pulse-ring 2s ease-in-out infinite',
        'pulse-ring-warning': 'pulse-ring-warning 2s ease-in-out infinite',
        'blink':              'blink 1.2s ease-in-out infinite',
        'spin-slow':          'spin-slow 3s linear infinite',
        'scale-in':           'scale-in 0.2s ease-out forwards',
        'shimmer':            'shimmer 2s linear infinite',
      },

      // ── Backdrop blur extra ────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },

      // ── Z-index semântico ──────────────────────────────────
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
      },

      // ── Transições ─────────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
      },

      // ── Grid ───────────────────────────────────────────────
      gridTemplateColumns: {
        'auto-fill-card': 'repeat(auto-fill, minmax(280px, 1fr))',
        'dashboard':      'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },

  plugins: [],
}