/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontSize: {
        'medium': '10px',
        'small': '8px',
      },
      colors: {
        'brand': {
          'primary': '#6366f1',    // El morado del icono activo
          'secondary': '#94a3b8',  // El gris de los iconos inactivos
          'light': '#eef2ff',      // El fondo celeste suave del icono activo
          'navbar': '#ffffff',     // El blanco del fondo del navbar
          'off-white': '#F9FAFF',
        }
      }
    },
  },
  plugins: [],
}

