/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
     "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {
       colors: {
        'spanish-gray': '#999999',
        'sonic-silver': '#787878',
        'eerie-black': '#212121',
        'salmon-pink': '#ff8f9c',
        'sandy-brown': '#f6a355',
        'bittersweet': '#ff6666',
        'ocean-green': '#46c389',
        'davys-gray': '#545454',
        'cultured': '#ededed',
        'white': '#ffffff',
        'onyx': '#454545',
      },
      container: {
        center:true
      }
    },
  },
  plugins: [
      require('flowbite/plugin')
  ],
}

