// Gato Sticky - Comportamiento real sticky
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
    transition: "bottom 0.3s ease-out",
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
    const gatoHeight = gato.offsetHeight || 120;

    console.log(
      `📊 Contenedor bottom: ${contenedorRect.bottom}, Footer top: ${footerRect.top}, Viewport: ${viewportHeight}`
    );

    // STICKY REAL: mientras el contenedor no haya terminado de pasar, gato pegado al fondo
    if (contenedorRect.bottom > viewportHeight) {
      console.log("📌 Contenedor activo - Gato sticky al fondo");
      gato.style.position = "fixed";
      gato.style.bottom = "0px";
    }
    // Cuando el contenedor termina, el gato se "desengancha" y sube con el footer
    else {
      console.log("🔓 Contenedor terminado - Gato siguiendo al footer");

      // Calcular la posición absoluta donde debe estar el gato
      const espacioEntreContenedorYFooter =
        footerRect.top - contenedorRect.bottom;
      const posicionAbsoluta =
        contenedorRect.bottom +
        Math.max(0, espacioEntreContenedorYFooter - gatoHeight);

      gato.style.position = "absolute";
      gato.style.top = posicionAbsoluta + "px";
      gato.style.bottom = "auto";

      console.log(`� Gato posición absoluta: ${posicionAbsoluta}px`);
    }
  }

  // Eventos
  let scrollCount = 0;
  window.addEventListener("scroll", function () {
    scrollCount++;
    if (scrollCount % 10 === 0) {
      // Log cada 10 scrolls para no saturar
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
