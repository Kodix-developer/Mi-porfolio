/* ============================================================
   JavaScript — Web personal de servicios
   1. Menú hamburguesa (móvil)
   2. Año automático en el footer
   3. Validación sencilla del formulario de contacto
   ============================================================ */

// ---------- 1. Menú hamburguesa ----------
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const abierto = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", abierto);
});

// Cerrar el menú al pulsar un enlace (en móvil)
navMenu.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- 2. Año automático del footer ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- 3. Validación del formulario ----------
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // De momento no hay servidor: solo validamos.

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  // Comprobación básica de campos vacíos
  if (!nombre || !email || !mensaje) {
    mostrarEstado("Por favor, rellena todos los campos.", "error");
    return;
  }

  // Comprobación sencilla del email
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    mostrarEstado("El email no parece válido.", "error");
    return;
  }

  // TODO: aquí conectaremos el envío real (Formspree, Netlify Forms, etc.)
  mostrarEstado("¡Gracias, " + nombre + "! Te responderé pronto. ✅", "ok");
  form.reset();
});

function mostrarEstado(texto, tipo) {
  status.textContent = texto;
  status.style.color = tipo === "ok" ? "#25d366" : "#f87171";
}
