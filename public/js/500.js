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
function handleRetry(event) {
  const btn = event.currentTarget;
  const originalHTML = btn.innerHTML;

  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Retrying...`;
  btn.classList.add("opacity-75", "cursor-not-allowed");
  btn.disabled = true;

  setTimeout(() => {
    showNotification(
      "Still unable to connect. Please try again later.",
      "error",
    );

    setTimeout(() => {
      // Reset button
      btn.innerHTML = originalHTML;
      btn.classList.remove("opacity-75", "cursor-not-allowed");
      btn.disabled = false;
    }, 1000);
  }, 1500);
}

function handleGoHome(event) {
  event.preventDefault();

  const btn = event.currentTarget;
  const originalHTML = btn.innerHTML;

  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2 text-gray-400"></i> Redirecting...`;
  btn.classList.add("opacity-75", "cursor-not-allowed");

  setTimeout(() => {
    showNotification("Returning to dashboard...", "info");

    setTimeout(() => {
      // Reset button (in a real app, page would redirect)
      btn.innerHTML = originalHTML;
      btn.classList.remove("opacity-75", "cursor-not-allowed");
    }, 1000);
  }, 500);
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");

  let bgClass = "bg-gray-900";
  let iconClass = "fa-circle-info text-blue-400";

  if (type === "error") {
    bgClass = "bg-red-600";
    iconClass = "fa-triangle-exclamation text-white";
  }

  notification.className = `fixed top-4 right-4 ${bgClass} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-[-100%] opacity-0 flex items-center z-50`;
  notification.innerHTML = `
                <i class="fa-solid ${iconClass} mr-3"></i>
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
