module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'login-bg': 'linear-gradient(#121315, #3E3E3F)',
        'login-button-bg': 'linear-gradient(#7EE249, #F2F047)',
        'blue-button-bg': 'linear-gradient(#52D9FC, #3B6DD9)',
      },
    }
  },
  plugins: [],
}
