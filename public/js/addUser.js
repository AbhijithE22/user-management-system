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
 * Toggles the visibility of the password field
 */
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("toggleIcon");

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

/**
 * Simulates saving the user data
 */
function handleSaveUser() {
  const btn = document.getElementById("saveBtn");
  const fullName = document.getElementById("fullName").value;
  const originalHTML = btn.innerHTML;

  // Visual feedback for loading state
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Saving...`;
  btn.classList.add("opacity-75", "cursor-not-allowed");

  // Simulate network request
  setTimeout(() => {
    // Reset button state
    btn.disabled = false;
    btn.innerHTML = originalHTML;
    btn.classList.remove("opacity-75", "cursor-not-allowed");

    // Show success message
    showNotification(
      `User ${fullName} has been successfully added.`,
      "success",
    );

    // Reset form after a brief delay
    setTimeout(() => {
      document.getElementById("addUserForm").reset();
      // In a real application, you might redirect back to the dashboard here:
      // window.location.href = 'admin-dashboard.html';
    }, 1500);
  }, 1200);
}

/**
 * Handles the cancel action
 */
function handleCancel() {
  // Confirm if fields are filled (basic UX enhancement)
  const fullName = document.getElementById("fullName").value;
  
    if (fullName.trim() !== "") {
        const confirmLeave = confirm(
            "You have unsaved changes. Are you sure you want to leave?"
        );

        if (!confirmLeave) return;
    }

    window.location.href = "/admin/dashboard";
  // Simulate navigation back to dashboard
  setTimeout(() => {
    showNotification(
      "In a real app, this redirects to admin-dashboard.html",
      "info",
    );
  }, 500);
}

/**
 * Handles the logout action with visual feedback
 */
function handleLogout() {
  const btn = document.getElementById("logoutBtn");
  const originalHTML = btn.innerHTML;

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin sm:mr-2"></i> <span class="hidden sm:inline">Logging out...</span>`;
  btn.classList.add("opacity-75", "cursor-not-allowed", "text-gray-900");

  setTimeout(() => {
    showNotification("Admin session closed securely.", "info");
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalHTML;
      btn.classList.remove("opacity-75", "cursor-not-allowed", "text-gray-900");
    }, 1000);
  }, 800);
}

/**
 * Shows a temporary notification message
 * @param {string} message - The message to display
 * @param {string} type - 'success', 'info', or 'error'
 */
function showNotification(message, type = "success") {
  const notification = document.createElement("div");

  let bgClass = "bg-gray-900";
  let iconClass = "fa-check-circle text-green-400";

  if (type === "error") {
    bgClass = "bg-red-600";
    iconClass = "fa-triangle-exclamation text-white";
  } else if (type === "info") {
    iconClass = "fa-circle-info text-blue-400";
  }

  notification.className = `fixed bottom-4 right-4 ${bgClass} text-white px-6 py-3 rounded-xl shadow-xl transform transition-all duration-300 translate-y-[100%] opacity-0 flex items-center z-50`;
  notification.innerHTML = `
                <i class="fa-solid ${iconClass} mr-3"></i>
                <span class="font-medium text-sm">${message}</span>
            `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.remove("translate-y-[100%]", "opacity-0");
  }, 10);

  setTimeout(() => {
    notification.classList.add("translate-y-[100%]", "opacity-0");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}
