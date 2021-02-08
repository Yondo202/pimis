module.exports = {
  prefix: 'tw-',
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: theme => ({
        '8.5': '34px',
      })
    },
  },
  variants: {
    extend: {
      backgroundColor: ['odd', 'even', 'active'],
      borderRadius: ['first', 'last'],
      textColor: ['active'],
      borderColor: ['active'],
      boxShadow: ['active'],
      visibility: ['hover'],
    },
  },
  plugins: [],
}
