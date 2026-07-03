/* ============================================================
   LA PARRA — JavaScript
   1. Nav que cambia al hacer scroll
   2. Menú hamburguesa (móvil)
   3. Animaciones "reveal" al entrar en pantalla
   4. Formulario de reserva
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
// Marcamos como .reveal las secciones y las mostramos cuando entran en pantalla.
document
  .querySelectorAll(".section-head, .historia-text, .historia-img, .special, .menu-col, .gallery img, .reservar-info, .reservar-form")
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

// ---------- 4. Formulario de reserva ----------
const form = document.getElementById("reservaForm");
const status = document.getElementById("reservaStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("r-nombre").value.trim();
  const fecha = document.getElementById("r-fecha").value;
  const hora = document.getElementById("r-hora").value;
  const tel = document.getElementById("r-tel").value.trim();

  if (!nombre || !fecha || !hora || !tel) {
    status.textContent = "Por favor, completa todos los campos.";
    status.style.color = "#e08a8a";
    return;
  }

  status.textContent = "¡Gracias, " + nombre + "! Hemos recibido tu solicitud de reserva. ✅";
  status.style.color = "#c9a24b";
  form.reset();
});

// ---------- 5. Año automático ----------
document.getElementById("year").textContent = new Date().getFullYear();
