// Gato Sticky - Versión Final Optimizada e Inmediata
document.addEventListener("DOMContentLoaded", function () {
  console.log("🐱 Inicializando gato sticky inmediatamente...");

  // Crear el elemento del gato
  const gato = document.createElement("div");
  gato.id = "gato-sombra-sticky";
  gato.className = "gato-nuclear";
  gato.innerHTML =
    '<img src="img/webp/Perros/GatoSinFondo.webp" alt="Gato decorativo" onerror="this.src=\'src/img/Perros/GatoSinFondo.png\'">';

  // Estilos del gato - INMEDIATO Y SIN DELAY
  Object.assign(gato.style, {
    position: "fixed",
    bottom: "0px",
    right: "0px",
    left: "auto",
    top: "auto",
    width: "120px",
    height: "auto",
    zIndex: "999",
    pointerEvents: "none",
    opacity: "0.3",
    margin: "0",
    padding: "0",
    transform: "none",
    // SIN transition - movimiento instantáneo
  });

  // Estilos de la imagen - CARGA INMEDIATA
  const img = gato.querySelector("img");
  Object.assign(img.style, {
    width: "100%",
    height: "auto",
    display: "block",
    loading: "eager", // Carga inmediata, no lazy
  });

  // Agregar al body INMEDIATAMENTE
  document.body.appendChild(gato);
  console.log("🐱 Gato agregado inmediatamente al DOM");

  // Función para calcular posición del contenedor
  function updateCatPosition() {
    const footer = document.querySelector(".footer");
    const contenedor = document.querySelector(".contenedor");

    if (!footer || !contenedor) return;

    const footerRect = footer.getBoundingClientRect();
    const contenedorRect = contenedor.getBoundingClientRect();

    if (footerRect.top < window.innerHeight) {
      // Footer visible - gato en el piso del contenedor
      const contenedorBottom = contenedorRect.bottom;
      const distanceFromViewportBottom = window.innerHeight - contenedorBottom;
      gato.style.bottom = Math.max(0, distanceFromViewportBottom) + "px";
      console.log("🐱 Footer visible - gato en piso del contenedor");
    } else {
      // Footer no visible - gato en piso del viewport
      gato.style.bottom = "0px";
    }
  }

  // Observer más eficiente
  const footer = document.querySelector(".footer");
  if (footer) {
    const observer = new IntersectionObserver(updateCatPosition, {
      root: null,
      threshold: [0, 0.1], // Múltiples thresholds para mejor detección
      rootMargin: "50px", // Detectar un poco antes
    });

    observer.observe(footer);

    // También actualizar en scroll para mejor responsive
    window.addEventListener("scroll", updateCatPosition, { passive: true });

    console.log("🐱 Observer y scroll listener configurados");
  }

  // Posición inicial inmediata
  updateCatPosition();
});
