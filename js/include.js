document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      const content = await response.text();
      el.innerHTML = content;
    } catch (err) {
      console.error(err);
    }
  });
});
