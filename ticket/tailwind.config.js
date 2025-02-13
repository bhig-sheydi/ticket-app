/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        backgroundImage: {
          'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        },
  
        fontFamily: {
          jeju: ['"Jeju Myeongjo"', 'serif'], // ✅ Add space inside the font name
        },
      },
    },
    plugins: [],
  };
  