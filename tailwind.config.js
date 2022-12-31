/**
 * @type {import('tailwindcss').Config}
 * */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      gray: '#242424',
      dark: '#0a0a0a',
      lime: '#a4ff65',
      red: '#F96666',
      green: '#03c39a'
    },
    extend: {
      fontFamily: {
        urbanist: ['Urbanist'],
        protomoOutline: ['ProtomoOutline']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
