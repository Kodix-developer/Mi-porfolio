/* ============================================================
   ESTILO — Peluquería · JavaScript
   1. Nav al hacer scroll
   2. Menú hamburguesa
   3. Animaciones reveal
   4. Formulario de cita
   5. Año automático
   ============================================================ */

// ---------- 1. Nav al hacer scroll ----------
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

// ---------- 2. Menú hamburguesa ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- 3. Reveal al hacer scroll ----------
document
  .querySelectorAll(".section-head, .service, .salon-media, .salon-text, .gallery img, .member, .quote, .cita-info, .cita-form")
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

// ---------- 4. Formulario de cita ----------
const form = document.getElementById("citaForm");
const status = document.getElementById("citaStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("c-nombre").value.trim();
  const fecha = document.getElementById("c-fecha").value;
  const hora = document.getElementById("c-hora").value;
  const tel = document.getElementById("c-tel").value.trim();

  if (!nombre || !fecha || !hora || !tel) {
    status.textContent = "Por favor, completa todos los campos.";
    status.style.color = "#c96b6b";
    return;
  }

  status.textContent = "¡Gracias, " + nombre + "! Tu cita está solicitada. Te confirmamos enseguida. ✦";
  status.style.color = "#b76e79";
  form.reset();
});

// ---------- 5. Año automático ----------
document.getElementById("year").textContent = new Date().getFullYear();
