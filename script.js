const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-nav]");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  navigation.classList.remove("is-open");
}

menuButton?.addEventListener("click", () => {
  const next = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(next));
  menuButton.setAttribute("aria-label", next ? "Close menu" : "Open menu");
  navigation.classList.toggle("is-open", next);
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  if (!navigation?.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});
