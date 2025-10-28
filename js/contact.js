document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("success-modal");
  const closeModal = document.getElementById("close-modal");
  const scrollButton = document.getElementById("scroll-to-contact");
  const contactSection = document.querySelector(".contact-section");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (modal) modal.style.display = "flex";
      form.reset();
    });
  }

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Close on click outside
  window.addEventListener("click", (e) => {
    if (modal && e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Smooth scroll to contact form
  if (scrollButton && contactSection) {
    scrollButton.addEventListener("click", () => {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});
