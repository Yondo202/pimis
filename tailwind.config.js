module.exports = {
  prefix: 'tw-',
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '8.5': '34px',
      },
      inset: {
        '13': '52px',
      },
      fontSize: {
        '15px': '15px',
        '13px': '13px',
      }
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
      borderWidth: ['first', 'last'],
    },
  },
  plugins: [],
}