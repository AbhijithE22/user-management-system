tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2563EB", // Blue
        primaryHover: "#1D4ED8", // Darker Blue for hover
        background: "#F9FAFB", // Very subtle gray background
        surface: "#FFFFFF", // White card
        textMain: "#111827", // Dark gray for main text
        textMuted: "#6B7280", // Medium gray for muted text
        border: "#E5E7EB", // Light gray for borders
      },
    },
  },
};


window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});
