// Eliminar margen problemático del footer y padding del contenedor
document.addEventListener("DOMContentLoaded", function () {
  console.log(
    "🔧 Eliminando margen problemático del footer y padding del contenedor..."
  );

  const footer = document.querySelector("footer.footer");
  const contenedor = document.querySelector(".contenedor");

  if (footer) {
    // Forzar con JavaScript los estilos del footer
    footer.style.setProperty("margin-top", "0px", "important");
    footer.style.setProperty("margin-left", "0px", "important");
    footer.style.setProperty("margin-right", "0px", "important");
    footer.style.setProperty("margin-bottom", "0px", "important");

    console.log("✅ Margen del footer eliminado por JavaScript");
  }

  if (contenedor) {
    // Mantener padding lateral pero eliminar padding vertical problemático
    contenedor.style.setProperty("padding-top", "0px", "important");
    contenedor.style.setProperty("padding-bottom", "0px", "important");
    // Mantener padding lateral para el layout
    contenedor.style.setProperty("padding-left", "1rem", "important");
    contenedor.style.setProperty("padding-right", "1rem", "important");

    console.log(
      "✅ Padding vertical del contenedor eliminado, lateral mantenido"
    );
  }

  if (footer) {
    // También crear un observer para vigilar cambios
    const observer = new MutationObserver(() => {
      footer.style.setProperty("margin-top", "0px", "important");
      footer.style.setProperty("margin-left", "0px", "important");
      if (contenedor) {
        contenedor.style.setProperty("padding-top", "0px", "important");
        contenedor.style.setProperty("padding-bottom", "0px", "important");
        contenedor.style.setProperty("padding-left", "1rem", "important");
        contenedor.style.setProperty("padding-right", "1rem", "important");
      }
    });

    observer.observe(footer, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    if (contenedor) {
      observer.observe(contenedor, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    console.log("🔍 Observer configurado para vigilar el footer y contenedor");
  } else {
    console.log("❌ Footer no encontrado");
  }
});
