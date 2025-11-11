// js/future.js
//code helped by chatgpt
(function () {
  "use strict";

  const form = document.getElementById("tv-opinion-form");
  const messageEl = document.getElementById("form-message");
  const submitBtn = document.getElementById("submitBtn");

  // Replace with your real endpoint when ready:
  const POST_URL = "https://example.com/submit"; // <-- replace or set to null to skip network

  function showMessage(text, isError = false) {
    messageEl.textContent = text;
    messageEl.style.color = isError ? "#b30000" : "#1b5e20";
  }

  function validateEmail(email) {
    // Simple but safe email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    messageEl.textContent = "";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const opinion = form.opinion.value.trim();
    const wantEmail = form.wantEmail.checked;

    if (!name || name.length < 2) {
      showMessage("Please enter your name (at least 2 characters).", true);
      form.name.focus();
      return;
    }

    if (!validateEmail(email)) {
      showMessage("Please enter a valid email address.", true);
      form.email.focus();
      return;
    }

    // Build payload
    const payload = {
      name: name,
      email: email,
      opinion: opinion,
      wantEmail: wantEmail,
      submittedAt: new Date().toISOString(),
      page: window.location.pathname
    };

    // If you have a real endpoint, you can POST. This example checks POST_URL.
    if (POST_URL && POST_URL.indexOf("example.com") === -1) {
      // Uncomment to actually send (ensure your endpoint allows CORS if hosted on another origin)
      /*
      submitBtn.disabled = true;
      fetch(POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(r => {
        if (!r.ok) throw new Error("Network response was not ok");
        return r.json();
      })
      .then(() => {
        showMessage("Thanks — your opinion was submitted!");
        form.reset();
      })
      .catch(err => {
        console.error(err);
        showMessage("Submission failed. Please try again later.", true);
      })
      .finally(() => submitBtn.disabled = false);
      */
      showMessage("Demo mode: ready to send to server (POST_URL is set).", false);
    } else {
      // Demo local behavior: show JSON to user and clear form
      console.log("Form payload:", payload);
      showMessage("Thanks — your opinion was recorded (demo).", false);
      form.reset();
    }
  });

  // Accessibility: clear messages on input
  form.addEventListener("input", () => {
    if (messageEl.textContent) messageEl.textContent = "";
  });
})();
