// ==================== NAVEGACIÓN MÓVIL COMPLETA ====================
console.log("🍔 NAVIGATION SCRIPT LOADED!");

function setupMobileNavigation() {
  console.log("🔧 Setting up mobile navigation...");

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownTriggers = document.querySelectorAll(
    ".has-dropdown .menu-trigger"
  );

  console.log("🔍 Elements:", {
    navToggle,
    navMenu,
    dropdownsCount: dropdownTriggers.length,
  });

  // ==================== HAMBURGUESA PRINCIPAL ====================
  if (navToggle && navMenu) {
    console.log("✅ Hamburger elements found, adding click listener");

    navToggle.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("🍔 HAMBURGER CLICK!");

      navMenu.classList.toggle("show");
      console.log("Menu classes:", navMenu.className);
    });
  } else {
    console.error("❌ Hamburger elements not found!");
  }

  // ==================== DROPDOWNS EN MÓVIL ====================
  if (dropdownTriggers.length > 0) {
    console.log("✅ Setting up dropdown triggers for mobile");

    dropdownTriggers.forEach((trigger, index) => {
      const parentItem = trigger.closest(".has-dropdown");

      trigger.addEventListener("click", function (e) {
        // Solo en móvil (cuando la hamburguesa es visible)
        if (window.innerWidth <= 768) {
          e.preventDefault();
          console.log(`📱 DROPDOWN CLICK ${index + 1}!`);

          // Cerrar otros dropdowns
          document.querySelectorAll(".has-dropdown").forEach((item) => {
            if (item !== parentItem) {
              item.classList.remove("dropdown-open");
            }
          });

          // Toggle del dropdown actual
          parentItem.classList.toggle("dropdown-open");
          console.log(`Dropdown ${index + 1} classes:`, parentItem.className);
        }
      });
    });
  } else {
    console.error("❌ No dropdown triggers found!");
  }

  // ==================== CERRAR MENÚ AL HACER CLICK FUERA ====================
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".navegacion-principal")) {
      navMenu?.classList.remove("show");
      document.querySelectorAll(".has-dropdown").forEach((item) => {
        item.classList.remove("dropdown-open");
      });
    }
  });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupMobileNavigation);
} else {
  setupMobileNavigation();
}

console.log("🎯 Navigation script setup complete!");
