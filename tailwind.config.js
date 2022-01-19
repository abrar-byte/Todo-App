module.exports = {
  mode: 'jit',
  purge: {
    enable: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [],
}