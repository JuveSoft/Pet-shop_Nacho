// ==================== NAVEGACIÓN SIMPLE - DEBUG ====================
console.log("🚀 Script cargado completamente");

// Ejecutar inmediatamente para test
console.log("🔍 Buscando elementos...");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

console.log("navToggle encontrado:", navToggle);
console.log("navMenu encontrado:", navMenu);

document.addEventListener("DOMContentLoaded", function () {
  console.log("🔄 DOM loaded - Navigation JS starting...");

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const menuItems = document.querySelectorAll(".menu-item.has-dropdown");

  console.log("🔍 Elements found:");
  console.log("   Nav toggle:", navToggle);
  console.log("   Nav menu:", navMenu);
  console.log("   Menu items:", menuItems.length);

  // ==================== TOGGLE MOBILE MENU ====================
  if (navToggle && navMenu) {
    console.log("✅ Setting up hamburger click handler");

    navToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("🍔 HAMBURGER CLICKED!");
      console.log("   Current window width:", window.innerWidth);
      console.log(
        "   Menu has 'show' class:",
        navMenu.classList.contains("show")
      );

      // Toggle classes - usando .show como en el CSS migrado
      navMenu.classList.toggle("show");

      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("show")) {
        document.body.style.overflow = "hidden";
        console.log("✅ Menu opened - body scroll disabled");
      } else {
        document.body.style.overflow = "";
        console.log("❌ Menu closed - body scroll enabled");
      }

      console.log("   Menu classes after toggle:", navMenu.className);
    });

    console.log("✅ Hamburger event listener attached");
  } else {
    console.error("❌ Missing nav elements!");
    console.error("   navToggle:", navToggle);
    console.error("   navMenu:", navMenu);
  }

  // ==================== CLOSE MENU ON LINK CLICK ====================
  const menuLinks = document.querySelectorAll(".nav-menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove("show");
        document.body.style.overflow = "";
        console.log("Menu closed via link click");
      }
    });
  });

  // ==================== CLOSE MENU ON OUTSIDE CLICK ====================
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("show");
        document.body.style.overflow = "";
        console.log("Menu closed via outside click");
      }
    }
  });

  // ==================== MOBILE DROPDOWN HANDLING ====================
  menuItems.forEach((item) => {
    const trigger = item.querySelector(".menu-trigger");
    const dropdown = item.querySelector(".dropdown-menu");

    if (trigger && dropdown) {
      trigger.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();

          // Toggle current dropdown - usando .show
          item.classList.toggle("show");

          // Close other dropdowns
          menuItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("show");
            }
          });

          console.log("Mobile dropdown toggled");
        }
      });
    }
  });

  // ==================== WINDOW RESIZE HANDLING ====================
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      // Reset mobile menu state on desktop
      navMenu.classList.remove("show");
      document.body.style.overflow = "";

      // Remove mobile dropdown states
      menuItems.forEach((item) => {
        item.classList.remove("show");
      });

      console.log("Desktop mode - mobile states reset");
    }
  });

  // ==================== DESKTOP DROPDOWN HOVER (opcional) ====================
  // En desktop, los dropdowns funcionan con CSS :hover
  // Esta parte es opcional para logging
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      if (window.innerWidth > 768) {
        console.log("Desktop dropdown hover");
      }
    });
  });
});

// ==================== FUNCIONES DE UTILIDAD ====================
function isMobile() {
  return window.innerWidth <= 768;
}

function closeAllMenus() {
  const navMenu = document.querySelector(".nav-menu");
  const menuItems = document.querySelectorAll(".menu-item.has-dropdown");

  if (navMenu) {
    navMenu.classList.remove("show");
  }

  menuItems.forEach((item) => {
    item.classList.remove("show");
  });

  document.body.style.overflow = "";
  console.log("All menus closed");
}
