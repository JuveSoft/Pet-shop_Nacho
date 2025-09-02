// Gato Sticky - Versión simple y robusta
document.addEventListener("DOMContentLoaded", function () {
  console.log("🐱 Inicializando gato sticky...");

  // Crear el elemento del gato
  const gato = document.createElement("div");
  gato.id = "gato-sombra-sticky";
  gato.innerHTML =
    '<img src="img/webp/Perros/GatoPerro.webp" alt="Gato decorativo" onerror="this.src=\'src/img/Perros/GatoPerro.png\'">';

  // Estilos base del gato
  Object.assign(gato.style, {
    position: "fixed",
    bottom: "0px",
    right: "20px",
    width: "120px",
    height: "auto",
    zIndex: "999",
    pointerEvents: "none",
    opacity: "0.8",
    transition: "bottom 0.2s ease-out",
  });

  // Estilos de la imagen
  const img = gato.querySelector("img");
  Object.assign(img.style, {
    width: "100%",
    height: "auto",
    display: "block",
  });

  // Agregar al body
  document.body.appendChild(gato);
  console.log("🐱 Gato agregado al DOM");

  // Función para manejar el sticky
  function manejarSticky() {
    const contenedor = document.querySelector(".contenedor");
    const footer = document.querySelector("footer");

    if (!contenedor || !footer) {
      console.log("⚠️ Contenedor o footer no encontrado");
      return;
    }

    const contenedorRect = contenedor.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    console.log(
      `📊 Contenedor bottom: ${contenedorRect.bottom}, Footer top: ${footerRect.top}, Viewport: ${viewportHeight}`
    );

    // Mantener siempre position: fixed pero ajustar el bottom
    gato.style.position = "fixed";
    gato.style.top = "auto";

    // Si el contenedor todavía está "activo" (no ha salido completamente del viewport)
    if (contenedorRect.bottom > viewportHeight) {
      console.log("📌 Contenedor activo - Gato pegado al fondo");
      gato.style.bottom = "0px";
    }
    // El contenedor terminó, pero el footer aún no llegó al fondo
    else if (footerRect.top > viewportHeight) {
      console.log("🔄 Entre contenedor y footer - Gato pegado al fondo");
      gato.style.bottom = "0px";
    }
    // El footer está entrando/visible - empujar el gato hacia arriba
    else {
      const distanciaFooter = Math.max(0, viewportHeight - footerRect.top);
      console.log(`🔼 Footer empujando gato. Distance: ${distanciaFooter}px`);
      gato.style.bottom = distanciaFooter + "px";
    }
  }

  // Eventos
  let scrollCount = 0;
  window.addEventListener("scroll", function () {
    scrollCount++;
    if (scrollCount % 10 === 0) {
      console.log(`🔄 Scroll event #${scrollCount}`);
    }
    manejarSticky();
  });

  window.addEventListener("resize", function () {
    console.log("📐 Resize event");
    manejarSticky();
  });

  // Ejecutar una vez al cargar
  setTimeout(() => {
    console.log("⏰ Ejecutando sticky inicial...");
    manejarSticky();
  }, 100);

  console.log("🐱 Gato sticky configurado correctamente");
});
