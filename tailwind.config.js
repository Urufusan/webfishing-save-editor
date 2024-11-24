/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
      display: ['Accidental Presidency', 'sans-serif'],
      mono: ['Fira Code VF', 'monospace']
    },
    extend: {
      colors: {
        cream: '#ffeed5',
        content: '#d5aa73',
        ui: '#5e3a18',
        accent: '#5a755a',
        'accent-highlight': '#9c914a',
        normal: '#d5aa73',
        shining: '#d5aa73',
        glistening: '#a49d9c',
        opulent: '#008583',
        radiant: '#e69d00',
        alpha: '#cd0462'
      },
      spacing: {
        '1/7': '14.2857%'
      }
    },
  },
  plugins: [],
}

