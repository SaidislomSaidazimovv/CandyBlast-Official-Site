const header = document.querySelector("[data-header]");
const button = document.querySelector("[data-menu-button]");
const nav = document.querySelector("[data-nav]");

const closeMenu = () => {
  if (!button || !nav) return;
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Open menu");
  nav.classList.remove("is-open");
};

button?.addEventListener("click", () => {
  const open = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!open));
  button.setAttribute("aria-label", open ? "Open menu" : "Close menu");
  nav.classList.toggle("is-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("has-motion");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px" });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
