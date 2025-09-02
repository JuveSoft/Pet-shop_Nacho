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
    // Forzar eliminación del padding del contenedor
    contenedor.style.setProperty("padding", "0px", "important");
    contenedor.style.setProperty("padding-bottom", "0px", "important");

    console.log("✅ Padding del contenedor eliminado por JavaScript");
  }

  if (footer) {
    // También crear un observer para vigilar cambios
    const observer = new MutationObserver(() => {
      footer.style.setProperty("margin-top", "0px", "important");
      footer.style.setProperty("margin-left", "0px", "important");
      if (contenedor) {
        contenedor.style.setProperty("padding", "0px", "important");
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
