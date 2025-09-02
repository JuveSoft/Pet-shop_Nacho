fetch("data/articulos1.json")
  .then((res) => res.json())
  .then((data) => {
    const contenedor = document.getElementById("contenido");
    if (contenedor) {
      data.forEach((articulo) => {
        const div = document.createElement("div");
        div.className = "articulo";
        div.innerHTML = `
          <h2>${articulo.titulo}</h2>
          <img src="assets/imagenes/${articulo.imagen}" alt="${articulo.titulo}">
          <p>${articulo.contenido}</p>
        `;
        contenedor.appendChild(div);
      });
    }
  })
  .catch((error) => console.log("Error loading articles:", error));

// Responsive Navigation Menu
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const menuItems = document.querySelectorAll(".menu-item.has-dropdown");

  // Toggle mobile menu
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function (e) {
      e.preventDefault();

      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  // Close mobile menu when clicking on a link
  const menuLinks = document.querySelectorAll(".nav-menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });

  // Handle dropdown behavior on mobile
  menuItems.forEach((item) => {
    const trigger = item.querySelector(".menu-trigger");
    const dropdown = item.querySelector(".dropdown-menu");

    if (trigger && dropdown) {
      trigger.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();

          // Toggle current dropdown
          item.classList.toggle("active");

          // Close other dropdowns
          menuItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("active");
            }
          });
        }
      });
    }
  });

  // Function to adjust dropdown position
  function adjustDropdownPosition() {
    if (window.innerWidth > 768) {
      const dropdowns = document.querySelectorAll(".dropdown-menu");

      dropdowns.forEach((dropdown) => {
        const menuItem = dropdown.closest(".menu-item");

        // Reset positioning classes first
        menuItem.classList.remove(
          "dropdown-left",
          "dropdown-right",
          "dropdown-center"
        );

        // Force reflow to get accurate measurements
        dropdown.offsetHeight;

        const rect = dropdown.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        console.log("Dropdown rect:", rect);
        console.log("Window width:", windowWidth);

        // More aggressive boundary checking
        if (rect.right > windowWidth - 50) {
          menuItem.classList.add("dropdown-right");
          console.log("Applied dropdown-right");
        }
        // Check if dropdown goes beyond left edge
        else if (rect.left < 50) {
          menuItem.classList.add("dropdown-left");
          console.log("Applied dropdown-left");
        }
        // Default center position
        else {
          menuItem.classList.add("dropdown-center");
          console.log("Applied dropdown-center");
        }
      });
    }
  }

  // Add hover event listeners to adjust position when dropdown opens
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      if (window.innerWidth > 768) {
        setTimeout(adjustDropdownPosition, 10); // Small delay to let CSS take effect
      }
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      // Reset mobile menu state on desktop
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";

      // Remove mobile dropdown states
      menuItems.forEach((item) => {
        item.classList.remove("active");
      });

      // Adjust dropdown positions on resize
      adjustDropdownPosition();
    }
  });
});

// Control de velocidad del video - Versión simplificada y debugeada
document.addEventListener("DOMContentLoaded", function () {
  console.log("🔍 Buscando video...");
  const video = document.querySelector(".video-labrador");

  if (!video) {
    console.error("❌ No se encontró el video con clase .video-labrador");
    return;
  }

  console.log("✅ Video encontrado:", video);

  // Esperar a que el video esté listo
  video.addEventListener("loadeddata", function () {
    console.log("📹 Video cargado, configurando velocidad inicial...");

    // Configurar velocidad inicial
    video.playbackRate = 1.0;
    console.log(`🎬 Velocidad inicial: ${video.playbackRate}x`);
  });

  // Función para cambiar velocidad con logs detallados
  function setVideoSpeed(speed) {
    console.log(`🎯 Intentando cambiar velocidad a: ${speed}x`);

    try {
      video.playbackRate = speed;
      console.log(
        `✅ Velocidad cambiada exitosamente a: ${video.playbackRate}x`
      );

      // Actualizar botón activo
      const buttons = document.querySelectorAll(".speed-btn");
      buttons.forEach((btn) => {
        btn.classList.remove("active");
        if (Math.abs(parseFloat(btn.dataset.speed) - speed) < 0.01) {
          btn.classList.add("active");
          console.log(`🔘 Botón marcado como activo: ${speed}x`);
        }
      });
    } catch (error) {
      console.error("❌ Error al cambiar velocidad:", error);
    }
  }

  // Controles visuales de velocidad con debugging
  setTimeout(() => {
    const speedButtons = document.querySelectorAll(".speed-btn");
    console.log(`🔍 Encontrados ${speedButtons.length} botones de velocidad`);

    speedButtons.forEach((button, index) => {
      console.log(`🔘 Botón ${index + 1}: velocidad ${button.dataset.speed}x`);

      button.addEventListener("click", function (e) {
        e.preventDefault();
        const speed = parseFloat(this.dataset.speed);
        console.log(`🖱️ Click en botón: ${speed}x`);
        setVideoSpeed(speed);
      });
    });
  }, 500);

  // Control con teclado simplificado
  document.addEventListener("keydown", function (e) {
    if (video && !e.target.matches("input, textarea")) {
      let newSpeed;
      switch (e.key) {
        case "1":
          newSpeed = 0.25;
          break;
        case "2":
          newSpeed = 0.5;
          break;
        case "3":
          newSpeed = 1.0;
          break;
        case "4":
          newSpeed = 2.0;
          break;
        case "5":
          newSpeed = 3.0;
          break;
        default:
          return;
      }
      console.log(`⌨️ Tecla presionada: ${e.key} - Velocidad: ${newSpeed}x`);
      setVideoSpeed(newSpeed);
    }
  });

  console.log("� Sistema de control de video inicializado");
});
