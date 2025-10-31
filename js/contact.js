document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("success-modal");
  const closeModal = document.getElementById("close-modal");
  const scrollButton = document.getElementById("scroll-to-contact");
  const contactSection = document.querySelector(".contact-section");
  const teamStack = document.querySelector(".team-stack");
  const teamCards = teamStack ? Array.from(teamStack.querySelectorAll(".team-card")) : [];

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

  if (teamCards.length > 1) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stackedLayoutMedia = window.matchMedia("(max-width: 768px)");
    let currentIndex = teamCards.findIndex((card) => card.classList.contains("active"));
    if (currentIndex < 0) currentIndex = 0;

    let rotationTimer = null;
    let isHoverExpanded = false;
    const maxVisibleLayers = Math.min(teamCards.length - 1, 3);

    const stopRotation = () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
        rotationTimer = null;
      }
    };

    const startRotation = () => {
      if (
        rotationTimer ||
        prefersReducedMotion.matches ||
        stackedLayoutMedia.matches ||
        isHoverExpanded
      ) {
        return;
      }
      rotationTimer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % teamCards.length;
        setActiveCard(nextIndex);
      }, 6000);
    };

    const updateCollapsedStack = () => {
      if (stackedLayoutMedia.matches) {
        teamCards.forEach((card, idx) => {
          card.classList.add("active");
          card.classList.toggle("selected", idx === currentIndex);
          card.style.opacity = "";
          card.style.transform = "";
          card.style.zIndex = "";
          card.style.order = "";
          card.style.pointerEvents = "auto";
          card.setAttribute("aria-hidden", "false");
        });
        return;
      }

      if (isHoverExpanded) {
        updateExpandedState();
        return;
      }

      const stackStyles = window.getComputedStyle(teamStack);
      const offsetValue = parseFloat(stackStyles.getPropertyValue("--stack-offset")) || 24;
      const scaleStep = parseFloat(stackStyles.getPropertyValue("--stack-scale-step")) || 0.035;

      teamCards.forEach((card, idx) => {
        const relative = (idx - currentIndex + teamCards.length) % teamCards.length;
        const isHidden = relative > maxVisibleLayers;
        const layer = Math.min(relative, maxVisibleLayers);
        const isTop = relative === 0;
        const translate = (isHidden ? maxVisibleLayers + 1 : layer) * offsetValue;
        const scale = Math.max(0.75, 1 - layer * scaleStep);
        const opacity = isTop ? 1 : isHidden ? 0 : Math.max(0, 0.82 - layer * 0.14);

        card.classList.toggle("active", isTop);
        card.classList.remove("selected");
        card.style.transform = `translateX(${translate}px) scale(${scale})`;
        card.style.opacity = opacity <= 0 ? "0" : opacity.toFixed(2);
        card.style.zIndex = String(teamCards.length - relative);
        card.style.order = "";
        card.style.pointerEvents = isTop ? "auto" : "none";
        card.setAttribute("aria-hidden", isTop ? "false" : "true");
      });
    };

    const updateExpandedState = () => {
      teamCards.forEach((card, idx) => {
        const isSelected = idx === currentIndex;
        card.classList.add("active");
        card.classList.toggle("selected", isSelected);
        card.style.opacity = "1";
        card.style.transform = "none";
        card.style.zIndex = String(teamCards.length - idx);
        card.style.order = isSelected ? "0" : String(idx + 1);
        card.style.pointerEvents = "auto";
        card.setAttribute("aria-hidden", "false");
      });
    };

    const setActiveCard = (nextIndex) => {
      currentIndex = nextIndex;
      if (stackedLayoutMedia.matches) {
        updateCollapsedStack();
        return;
      }
      if (isHoverExpanded) {
        updateExpandedState();
      } else {
        updateCollapsedStack();
      }
    };

    const expandStack = () => {
      if (stackedLayoutMedia.matches || isHoverExpanded) return;
      isHoverExpanded = true;
      stopRotation();
      teamStack.classList.add("expanded");
      updateExpandedState();
    };

    const collapseStack = () => {
      if (!isHoverExpanded || stackedLayoutMedia.matches) return;
      isHoverExpanded = false;
      teamStack.classList.remove("expanded");
      teamCards.forEach((card) => {
        card.style.opacity = "";
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.order = "";
      });
      updateCollapsedStack();
      if (!prefersReducedMotion.matches) {
        startRotation();
      }
    };

    const handleMotionPreference = (event) => {
      if (event.matches) {
        stopRotation();
      } else {
        startRotation();
      }
    };

    const handleViewportChange = (event) => {
      stopRotation();
      if (event.matches) {
        isHoverExpanded = false;
        teamStack.classList.remove("expanded");
        teamCards.forEach((card) => {
          card.style.opacity = "";
          card.style.transform = "";
          card.style.zIndex = "";
          card.style.order = "";
        });
      } else {
        teamStack.classList.remove("expanded");
        isHoverExpanded = false;
      }
      updateCollapsedStack();
      startRotation();
    };

    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener("change", handleMotionPreference);
    } else if (typeof prefersReducedMotion.addListener === "function") {
      prefersReducedMotion.addListener(handleMotionPreference);
    }

    if (typeof stackedLayoutMedia.addEventListener === "function") {
      stackedLayoutMedia.addEventListener("change", handleViewportChange);
    } else if (typeof stackedLayoutMedia.addListener === "function") {
      stackedLayoutMedia.addListener(handleViewportChange);
    }

    teamStack.addEventListener("mouseenter", expandStack);
    teamStack.addEventListener("mouseleave", collapseStack);

    teamStack.addEventListener("focusin", (event) => {
      const card = event.target.closest(".team-card");
      if (!card || stackedLayoutMedia.matches) return;
      expandStack();
      const idx = teamCards.indexOf(card);
      if (idx >= 0) {
        setActiveCard(idx);
      }
    });

    teamStack.addEventListener("focusout", () => {
      if (stackedLayoutMedia.matches) return;
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (!teamStack.contains(activeElement)) {
          collapseStack();
        }
      }, 0);
    });

    teamCards.forEach((card, idx) => {
      card.addEventListener("click", () => {
        setActiveCard(idx);
        if (isHoverExpanded || stackedLayoutMedia.matches) {
          updateExpandedState();
        }
      });
    });

    updateCollapsedStack();
    startRotation();
  }
});
