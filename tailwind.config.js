/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,svelte,ts}'],
  theme: {
    cursor: {
      default: 'url("/cursors/webfishing_arrow.cur"), default',
      pointer: 'url("/cursors/webfishing_link.cur"), pointer',
      text: 'url("/cursors/webfishing_beam.cur"), text',
      'not-allowed': 'url("/cursors/webfishing_unavailable.cur"), not-allowed',
    },
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
        cancel: "#a90038",
        normal: '#d5aa73',
        shining: '#d5aa73',
        glistening: '#a49d9c',
        opulent: '#008583',
        radiant: '#e69d00',
        alpha: '#cd0462'
      }
    },
  },
  plugins: [],
}

