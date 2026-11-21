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
/**
 * Toggles the visibility of a password field
 * @param {string} inputId - The ID of the input field
 * @param {string} iconId - The ID of the icon to toggle
 */
function togglePassword(inputId, iconId) {
  const passwordInput = document.getElementById(inputId);
  const toggleIcon = document.getElementById(iconId);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  }
}


// Real-time password confirmation validation
document.getElementById("confirmPassword").addEventListener("input", function () {
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");

    if (this.value !== password) {
        passwordError.classList.remove("hidden");
        this.classList.add(
            "border-red-500",
            "focus:border-red-500",
            "focus:ring-red-500"
        );
    } else {
        passwordError.classList.add("hidden");
        this.classList.remove(
            "border-red-500",
            "focus:border-red-500",
            "focus:ring-red-500"
        );
    }
});