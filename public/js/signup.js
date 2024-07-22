// public/js/signup.js
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#login").addEventListener("click", function () {
    window.location.href = "/login"; // Redirect to login page
  });
});

document
  .getElementById("signUpForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const signUpName = document.getElementById("create-name").value.trim();
    const signUpEmail = document.getElementById("create-email").value.trim();
    const signUpPassword = document
      .getElementById("create-password")
      .value.trim();
    const reEnter = document.getElementById("re-enter-password").value.trim();
    const errorMessage = document.getElementById("displayError");

    if (signUpPassword.length < 8) {
      errorMessage.textContent = "Password must be at least 8 characters";
      errorMessage.classList.remove("visually-hidden");
      return;
    }

    if (reEnter !== signUpPassword) {
      errorMessage.textContent = "Passwords do not match";
      errorMessage.classList.remove("visually-hidden");
      return;
    }

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      const data = await response.json();
      errorMessage.textContent = data.message || "Failed to create an account!";
      errorMessage.classList.remove("visually-hidden");
    }
  });
