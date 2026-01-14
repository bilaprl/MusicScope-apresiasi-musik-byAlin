/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-rose-pink',
    'bg-cyan-500',
    'bg-emerald-500',
    'bg-orange-500',
    // Tambahkan warna lain yang sering tidak muncul
  ],
  theme: {
    extend: {
      colors: {
        'rose-pink': '#f43f5e', // Pastikan HEX didefinisikan eksplisit
      },
    },
  },
  plugins: [],
}
