// Gato Sticky - Versión Final Limpia
document.addEventListener("DOMContentLoaded", function () {
  console.log("🐱 Inicializando gato sticky...");

  // Crear el elemento del gato con clase que excluye reglas CSS conflictivas
  const gato = document.createElement("div");
  gato.id = "gato-sombra-sticky";
  gato.className = "gato-nuclear"; // Usar clase que está excluida de las reglas CSS
  gato.innerHTML =
    '<img src="img/webp/Perros/GatoSinFondo.png" alt="Gato decorativo" onerror="this.src=\'src/img/Perros/GatoSinFondo.png\'">';

  // Estilos del gato - STICKY FINAL LIMPIO
  Object.assign(gato.style, {
    position: "sticky",
    bottom: "0px",
    right: "0px", // Pegado al borde derecho del contenedor
    left: "auto",
    top: "auto",
    width: "120px",
    height: "auto",
    zIndex: "999",
    pointerEvents: "none",
    opacity: "0.2",
    margin: "0",
    padding: "0",
    marginLeft: "auto", // Esto lo empuja hacia la derecha
    transform: "none",
  });

  // Estilos de la imagen
  const img = gato.querySelector("img");
  Object.assign(img.style, {
    width: "100%",
    height: "auto",
    display: "block",
  });

  // Agregar al contenedor para que el sticky funcione
  const contenedor = document.querySelector(".contenedor");
  if (contenedor) {
    contenedor.appendChild(gato);
    console.log("🐱 Gato sticky configurado correctamente en contenedor");
  } else {
    console.log("❌ Error: No se encontró el contenedor");
  }
});
