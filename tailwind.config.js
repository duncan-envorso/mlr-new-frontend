/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colors from the guide
        navy: '#002B5C',      // Primary navy
        green: '#64B246',     // Brand green
        'ice-blue': '#C6DAE7', // Ice blue
        'light-grey': '#EBEBEB', // Light grey
        grey: '#808285',      // Grey
        
        // Semantic colors
        primary: {
          DEFAULT: '#002B5C',    // Navy as primary
          foreground: '#FFFFFF',  // Adding white as primary foreground
        },
        secondary: '#64B246',  // Green as secondary
        accent: '#C6DAE7',     // Ice blue as accent
       
      },
      fontFamily: {
        // Brand fonts
        'road-rage': ['Road Rage', 'sans-serif'],  // Hero/display font
        'industry-ultra': ['Industry Ultra', 'sans-serif'],
        'industry-demi': ['Industry Demi', 'sans-serif'],
        'industry-book': ['Industry Book', 'sans-serif'],
        'industry-ultra-italic': ['Industry Ultra Italic', 'sans-serif'],
      },
      // Custom spacing or sizing
      spacing: {
        'rugby-field': '56.25%', // 16:9 aspect ratio
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}