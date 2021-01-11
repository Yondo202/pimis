module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

    },
  },
  variants: {
    extend: {
      backgroundColor: ['odd', 'even', 'active'],
      borderRadius: ['first', 'last'],
      textColor: ['active'],
      borderColor: ['active'],
      boxShadow: ['active'],
    },
  },
  plugins: [
    // require('@tailwindcss/forms')
  ]
}
