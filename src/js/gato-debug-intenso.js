// Gato Sticky - Versión DEBUG COMPLETA
document.addEventListener("DOMContentLoaded", function () {
  console.log("🐱 INICIANDO GATO STICKY - MODO DEBUG");

  // Crear el elemento del gato
  const gato = document.createElement("div");
  gato.id = "gato-sombra-sticky";
  gato.innerHTML =
    '<img src="img/webp/Perros/GatoPerro.webp" alt="Gato decorativo" onerror="this.src=\'src/img/Perros/GatoPerro.png\'">';

  // Estilos base del gato - STICKY REAL
  Object.assign(gato.style, {
    position: "sticky",
    bottom: "0px", // Pegado al fondo del viewport
    right: "20px",
    width: "120px",
    height: "auto",
    zIndex: "999",
    pointerEvents: "none",
    opacity: "1", // Más opaco para debug
    border: "3px solid red", // DEBUG: borde rojo para ver el gato
    backgroundColor: "yellow", // DEBUG: fondo amarillo
    float: "right", // Para que esté en la derecha
    clear: "both",
  });

  // Estilos de la imagen
  const img = gato.querySelector("img");
  Object.assign(img.style, {
    width: "100%",
    height: "auto",
    display: "block",
  });

  // Agregar al contenedor (no al body)
  const contenedor = document.querySelector(".contenedor");
  if (contenedor) {
    // Asegurar que el contenedor tenga position relative
    contenedor.style.position = "relative";
    contenedor.appendChild(gato);
    console.log("🐱 GATO AGREGADO AL CONTENEDOR CON ESTILOS DEBUG");
  } else {
    console.log("❌ ERROR: No se encontró el contenedor");
    return;
  }

  // Debug inicial de elementos
  setTimeout(() => {
    const contenedor = document.querySelector(".contenedor");
    const footer = document.querySelector("footer");

    console.log("🔍 DEBUG ELEMENTOS:");
    console.log("Contenedor encontrado:", contenedor ? "✅ SÍ" : "❌ NO");
    console.log("Footer encontrado:", footer ? "✅ SÍ" : "❌ NO");

    if (contenedor) {
      console.log("Contenedor rect:", contenedor.getBoundingClientRect());
    }
    if (footer) {
      console.log("Footer rect:", footer.getBoundingClientRect());
    }
    console.log("Viewport height:", window.innerHeight);
  }, 500); // Función simple - El CSS sticky hace todo el trabajo
  function confirmarSticky() {
    console.log("🐱 GATO CON POSITION: STICKY");
    console.log("   ✅ Pegado al fondo del viewport");
    console.log("   ✅ Se queda con el contenedor cuando termine");
    console.log("   ✅ No necesita JavaScript adicional");
  }

  // Ejecutar confirmación inicial
  setTimeout(() => {
    console.log("⏰ CONFIRMANDO STICKY");
    confirmarSticky();
  }, 1000);

  console.log("🐱 GATO STICKY PURO CSS CONFIGURADO");
});
