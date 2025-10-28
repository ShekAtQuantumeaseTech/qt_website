// QuantumEase main JS

document.addEventListener("DOMContentLoaded", () => {
  console.log("QuantumEase site loaded");

  // Typing effect (safe-guarded)
  const textElement = document.getElementById("changing-text");
  if (textElement) {
    const services = [
      "EDGE AI SYSTEMS",
      "AUTONOMOUS ROBOTICS",
      "DEFENCE INTEGRATION",
      "SMART SURVEILLANCE",
      "CYBERSECURITY SOLUTIONS",
      "CLOUD ANALYTICS"
    ];

    let index = 0;
    let charIndex = 0;
    let currentText = "";
    let deleting = false;

    function typeEffect() {
      currentText = services[index];

      if (!deleting) {
        textElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length + 6) deleting = true;
      } else {
        textElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex === 0) {
          deleting = false;
          index = (index + 1) % services.length;
        }
      }

      setTimeout(typeEffect, deleting ? 60 : 120);
    }

    typeEffect();
  }

  // MOBILE MENU TOGGLE (safe-guarded)
  const toggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown > a");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
      toggle.classList.toggle("active");
    });
  }

  dropdowns.forEach((dropdownLink) => {
    dropdownLink.addEventListener("click", (e) => {
      const parent = dropdownLink.parentElement;
      if (window.innerWidth <= 900) {
        e.preventDefault();
        if (parent) parent.classList.toggle("open");
      }
    });
  });
});

