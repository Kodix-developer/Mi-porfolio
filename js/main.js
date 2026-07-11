/* ============================================================
   JavaScript — Web personal de servicios <Kodix/>
   1. Menú hamburguesa (móvil)
   2. Año automático en el footer
   3. Validación sencilla del formulario de contacto
   4. Barra de progreso de scroll + cabecera con sombra
   5. Efecto máquina de escribir en el hero
   6. Aparición de elementos al hacer scroll (reveal)
   7. Contadores animados de las estadísticas
   8. Foco de luz en las tarjetas (sigue al ratón)
   9. Tilt 3D en las tarjetas del portfolio
   10. Enlace activo en el menú según la sección
   11. Botón "volver arriba"
   12. Partículas del hero (canvas)
   ============================================================ */

// ¿El usuario prefiere menos movimiento? (accesibilidad)
const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  // TODO: aquí conectaremos el envío real (Formspree, Web3Forms, etc.)
  mostrarEstado("¡Gracias, " + nombre + "! Te responderé pronto. ✅", "ok");
  form.reset();
});

function mostrarEstado(texto, tipo) {
  status.textContent = texto;
  status.style.color = tipo === "ok" ? "#25d366" : "#f87171";
}

// ---------- 4. Barra de progreso + cabecera con sombra ----------
const barraProgreso = document.getElementById("scrollProgress");
const cabecera = document.getElementById("siteHeader");
const botonArriba = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
  const porcentaje = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
  barraProgreso.style.width = porcentaje + "%";

  // Sombra en la cabecera al bajar
  cabecera.classList.toggle("scrolled", window.scrollY > 10);

  // Botón "volver arriba" visible a partir de una pantalla
  botonArriba.classList.toggle("visible", window.scrollY > window.innerHeight * 0.8);
}, { passive: true });

// ---------- 5. Efecto máquina de escribir ----------
const palabras = ["tu web", "tu landing", "tu app móvil", "tu SEO local", "tu chatbot IA"];
const destinoTyped = document.getElementById("typedWord");

if (destinoTyped && !menosMovimiento) {
  let indicePalabra = 0;
  let indiceLetra = 0;
  let borrando = false;

  function escribir() {
    const palabra = palabras[indicePalabra];

    if (!borrando) {
      // Escribiendo letra a letra
      indiceLetra++;
      destinoTyped.textContent = '"' + palabra.slice(0, indiceLetra) + '"';

      if (indiceLetra === palabra.length) {
        borrando = true;
        setTimeout(escribir, 1800); // pausa con la palabra completa
        return;
      }
      setTimeout(escribir, 75);
    } else {
      // Borrando letra a letra
      indiceLetra--;
      destinoTyped.textContent = '"' + palabra.slice(0, indiceLetra) + '"';

      if (indiceLetra === 0) {
        borrando = false;
        indicePalabra = (indicePalabra + 1) % palabras.length; // siguiente palabra
      }
      setTimeout(escribir, 40);
    }
  }

  escribir();
} else if (destinoTyped) {
  // Sin animación: se muestra la primera palabra fija
  destinoTyped.textContent = '"' + palabras[0] + '"';
}

// ---------- 6. Aparición al hacer scroll (reveal) ----------
const elementosReveal = document.querySelectorAll(".reveal");

const observadorReveal = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
      observadorReveal.unobserve(entrada.target); // solo se anima una vez
    }
  });
}, { threshold: 0.15 });

elementosReveal.forEach((el) => {
  // Retardo escalonado según su posición dentro del padre (efecto cascada)
  const hermanos = Array.from(el.parentElement.children).filter((h) =>
    h.classList.contains("reveal")
  );
  const posicion = hermanos.indexOf(el);
  el.style.setProperty("--delay", (posicion * 0.09) + "s");

  observadorReveal.observe(el);
});

// ---------- 7. Contadores animados de las estadísticas ----------
const numerosStat = document.querySelectorAll(".stat-num");

const observadorStats = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    animarContador(entrada.target);
    observadorStats.unobserve(entrada.target);
  });
}, { threshold: 0.5 });

numerosStat.forEach((num) => observadorStats.observe(num));

function animarContador(elemento) {
  const objetivo = Number(elemento.dataset.count);
  const sufijo = elemento.dataset.suffix || "";
  const duracion = 1400; // ms
  const inicio = performance.now();

  function paso(ahora) {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    // Frenada suave al final (easing)
    const suavizado = 1 - Math.pow(1 - progreso, 3);
    elemento.textContent = Math.round(objetivo * suavizado) + sufijo;

    if (progreso < 1) requestAnimationFrame(paso);
  }

  if (menosMovimiento) {
    elemento.textContent = objetivo + sufijo;
  } else {
    requestAnimationFrame(paso);
  }
}

// ---------- 8. Foco de luz en las tarjetas ----------
// Guarda la posición del ratón en las variables CSS --mx / --my,
// que usa el ::before de .card para dibujar el resplandor.
document.querySelectorAll(".card").forEach((tarjeta) => {
  tarjeta.addEventListener("mousemove", (e) => {
    const caja = tarjeta.getBoundingClientRect();
    tarjeta.style.setProperty("--mx", (e.clientX - caja.left) + "px");
    tarjeta.style.setProperty("--my", (e.clientY - caja.top) + "px");
  });
});

// ---------- 9. Tilt 3D en las tarjetas del portfolio ----------
if (!menosMovimiento) {
  document.querySelectorAll("[data-tilt]").forEach((tarjeta) => {
    const MAX_GRADOS = 7;

    tarjeta.addEventListener("mouseenter", () => tarjeta.classList.add("tilting"));

    tarjeta.addEventListener("mousemove", (e) => {
      const caja = tarjeta.getBoundingClientRect();
      // Posición del ratón dentro de la tarjeta, de -0.5 a 0.5
      const x = (e.clientX - caja.left) / caja.width - 0.5;
      const y = (e.clientY - caja.top) / caja.height - 0.5;

      tarjeta.style.transform =
        "perspective(800px)" +
        " rotateX(" + (-y * MAX_GRADOS) + "deg)" +
        " rotateY(" + (x * MAX_GRADOS) + "deg)" +
        " translateY(-6px)";
    });

    tarjeta.addEventListener("mouseleave", () => {
      tarjeta.style.transform = "";
      tarjeta.classList.remove("tilting");
    });
  });
}

// ---------- 10. Enlace activo en el menú según la sección ----------
const enlacesNav = document.querySelectorAll(".nav-menu a[data-nav]");
const seccionesNav = Array.from(enlacesNav)
  .map((enlace) => document.querySelector(enlace.getAttribute("href")))
  .filter(Boolean);

const observadorSecciones = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    enlacesNav.forEach((enlace) => {
      enlace.classList.toggle(
        "activo",
        enlace.getAttribute("href") === "#" + entrada.target.id
      );
    });
  });
}, { rootMargin: "-40% 0px -55% 0px" }); // se activa cuando la sección está centrada

seccionesNav.forEach((seccion) => observadorSecciones.observe(seccion));

// ---------- 12. Partículas del hero (canvas) ----------
// Puntos que flotan y se conectan con líneas cuando están cerca.
const lienzo = document.getElementById("particles");

if (lienzo && !menosMovimiento) {
  const ctx = lienzo.getContext("2d");
  const hero = lienzo.parentElement;
  let particulas = [];
  let animacionId = null;

  function redimensionar() {
    lienzo.width = hero.offsetWidth;
    lienzo.height = hero.offsetHeight;
    crearParticulas();
  }

  function crearParticulas() {
    // Cantidad proporcional al ancho (menos en móvil)
    const cantidad = Math.min(Math.floor(lienzo.width / 18), 80);
    particulas = [];

    for (let i = 0; i < cantidad; i++) {
      particulas.push({
        x: Math.random() * lienzo.width,
        y: Math.random() * lienzo.height,
        vx: (Math.random() - 0.5) * 0.4, // velocidad horizontal
        vy: (Math.random() - 0.5) * 0.4, // velocidad vertical
        radio: Math.random() * 1.8 + 0.6,
      });
    }
  }

  function dibujar() {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);

    const DISTANCIA_MAX = 130; // distancia máxima para dibujar línea

    for (let i = 0; i < particulas.length; i++) {
      const p = particulas[i];

      // Mover y rebotar en los bordes
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > lienzo.width) p.vx *= -1;
      if (p.y < 0 || p.y > lienzo.height) p.vy *= -1;

      // Dibujar el punto
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.55)";
      ctx.fill();

      // Líneas hacia las partículas cercanas
      for (let j = i + 1; j < particulas.length; j++) {
        const q = particulas[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia < DISTANCIA_MAX) {
          // La línea es más transparente cuanto más lejos
          const alfa = (1 - distancia / DISTANCIA_MAX) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(47, 107, 255, " + alfa + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animacionId = requestAnimationFrame(dibujar);
  }

  // Pausar la animación cuando el hero no se ve (ahorra batería/CPU)
  const observadorHero = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        if (!animacionId) dibujar();
      } else {
        cancelAnimationFrame(animacionId);
        animacionId = null;
      }
    });
  });

  observadorHero.observe(hero);
  window.addEventListener("resize", redimensionar);
  redimensionar();
}
