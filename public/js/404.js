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
function handleGoHome(event) {
  // Prevent default behavior if we are just mocking the transition
  // In a real app, you would let the link navigate normally
  event.preventDefault();

  const btn = event.currentTarget;
  const originalHTML = btn.innerHTML;

  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Redirecting...`;
  btn.classList.add("opacity-75", "cursor-not-allowed");

  setTimeout(() => {
    // Show mock notification before theoretical redirect
    showNotification("Returning to dashboard...");

    setTimeout(() => {
      // Reset button
      btn.innerHTML = originalHTML;
      btn.classList.remove("opacity-75", "cursor-not-allowed");

      // window.location.href = 'home.html';
    }, 1000);
  }, 500);
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-[-100%] opacity-0 flex items-center z-50";
  notification.innerHTML = `
                <i class="fa-solid fa-circle-info mr-3 text-blue-400"></i>
                <span class="font-medium text-sm">${message}</span>
            `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.remove("translate-y-[-100%]", "opacity-0");
  }, 10);

  setTimeout(() => {
    notification.classList.add("translate-y-[-100%]", "opacity-0");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}
