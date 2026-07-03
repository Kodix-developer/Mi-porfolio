/* ============================================================
   FONTANERÍA RÁPIDA — JavaScript
   1. Menú hamburguesa
   2. Animaciones reveal
   3. Año automático
   ============================================================ */

// ---------- 1. Menú hamburguesa ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- 2. Reveal al hacer scroll ----------
document
  .querySelectorAll(".section-head, .service, .step, .porque-media, .porque-text, .review, .feature")
  .forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ---------- 3. Año automático ----------
document.getElementById("year").textContent = new Date().getFullYear();
