// Gato Sticky - Versión Final Limpia
document.addEventListener("DOMContentLoaded", function () {
  console.log("🐱 Inicializando gato sticky...");

  // Crear el elemento del gato
  const gato = document.createElement("div");
  gato.id = "gato-sombra-sticky";
  gato.innerHTML =
    '<img src="img/webp/Perros/GatoSinFondo.png" alt="Gato decorativo" onerror="this.src=\'src/img/Perros/GatoSinFondo.png\'">';

  // Estilos del gato - STICKY FINAL
  Object.assign(gato.style, {
    position: "sticky",
    bottom: "0px", // Pegado al fondo del viewport
    right: "20px",
    width: "120px",
    height: "auto",
    zIndex: "999",
    pointerEvents: "none",
    opacity: "0.2", // Opacidad sutil
    float: "right",
    clear: "both",
  });

  // Estilos de la imagen
  const img = gato.querySelector("img");
  Object.assign(img.style, {
    width: "100%",
    height: "auto",
    display: "block",
  });

  // Agregar al contenedor
  const contenedor = document.querySelector(".contenedor");
  if (contenedor) {
    contenedor.style.position = "relative";
    contenedor.appendChild(gato);
    console.log("🐱 Gato sticky configurado correctamente");
  } else {
    console.log("❌ Error: No se encontró el contenedor");
  }
});
