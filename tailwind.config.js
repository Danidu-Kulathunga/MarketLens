/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#19C37D',
          dark: '#128C59',
          light: '#E8F8F1',
        },
        sidebar: {
          bg: '#FFFFFF',
          border: '#E5E7EB',
          active: '#F3F4F6',
          text: '#4B5563',
          heading: '#9CA3AF',
        },
        card: {
          DEFAULT: '#FFFFFF',
          border: '#E5E7EB',
          subtle: '#F9FAFB',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
