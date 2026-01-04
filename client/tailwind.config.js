/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#020617",
        reflect: {
          text: "#F8FAFC",
          muted: "#94A3B8",
          border: "rgba(255, 255, 255, 0.06)",
          glass: "rgba(255, 255, 255, 0.02)",
        },
        brand: {
          primary: "#3B82F6",
          secondary: "#8B5CF6",
          accent: "#06B6D4",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
        "accent-gradient": "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
        grid: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        aurora:
          "radial-gradient(circle at 50% -20%, rgba(59, 130, 246, 0.15), transparent 80%)",
      },
      backgroundSize: {
        "grid-sm": "24px 24px",
        "grid-md": "40px 40px",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        reflect:
          "0 0 0 1px rgba(255, 255, 255, 0.05), 0 20px 50px -12px rgba(0, 0, 0, 0.5)",
        glow: "0 0 30px rgba(59, 130, 246, 0.2)",
      },
    },
  },
  plugins: [],
};
