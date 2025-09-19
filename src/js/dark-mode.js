// Dark Mode Toggle Functionality

function createThemeToggle() {
  // Crear el contenedor
  const toggleContainer = document.createElement("div");
  toggleContainer.className = "theme-toggle-container";

  // Crear el botón
  const toggleButton = document.createElement("button");
  toggleButton.className = "theme-toggle";
  toggleButton.setAttribute("aria-label", "Cambiar tema");
  toggleButton.innerHTML = `
        <i class="fas fa-sun sun-icon" id="sun-icon"></i>
        <i class="fas fa-moon moon-icon" id="moon-icon"></i>
    `;

  // Agregar el botón al contenedor
  toggleContainer.appendChild(toggleButton);

  // Buscar la navegación principal y agregar el contenedor ahí
  const nav = document.querySelector(".navegacion-principal");
  if (nav) {
    nav.appendChild(toggleContainer);
  } else {
    // Fallback: buscar el div .titulo si no hay navegación
    const titulo = document.querySelector(".titulo");
    if (titulo) {
      titulo.appendChild(toggleContainer);
    } else {
      // Segundo fallback: buscar el header si no hay .titulo
      const header = document.querySelector("header");
      if (header) {
        header.appendChild(toggleContainer);
      } else {
        // Último fallback: agregar al body si no hay header
        document.body.appendChild(toggleContainer);
      }
    }
  }
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  updateToggleButton();
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  updateToggleButton();

  // Animación suave al cambiar
  document.body.style.transition = "all 0.3s ease";
  setTimeout(() => {
    document.body.style.transition = "";
  }, 300);
}

function updateToggleButton() {
  const toggle = document.querySelector(".theme-toggle");
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (toggle) {
    if (currentTheme === "dark") {
      toggle.setAttribute("aria-label", "Cambiar a modo claro");
    } else {
      toggle.setAttribute("aria-label", "Cambiar a modo oscuro");
    }
  }
}

// Escuchar cambios en las preferencias del sistema
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) {
      document.documentElement.setAttribute(
        "data-theme",
        e.matches ? "dark" : "light"
      );
      updateToggleButton();
    }
  });

// ========================================
// ENHANCED FEATURES - FUNCIONALIDADES ADICIONALES
// ========================================

// Scroll to Top Button
class ScrollToTop {
  constructor() {
    this.scrollButton = null;
    this.init();
  }

  init() {
    this.createButton();
    this.bindEvents();
  }

  createButton() {
    const button = document.createElement("button");
    button.className = "scroll-to-top";
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute("aria-label", "Volver arriba");
    document.body.appendChild(button);
    this.scrollButton = button;
  }

  bindEvents() {
    // Mostrar/ocultar según scroll
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        this.scrollButton.classList.add("visible");
      } else {
        this.scrollButton.classList.remove("visible");
      }
    });

    // Scroll suave al hacer click
    this.scrollButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// Loading Spinner
class LoadingManager {
  constructor() {
    this.createSpinner();
    this.hideSpinnerWhenLoaded();
  }

  createSpinner() {
    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    spinner.innerHTML = `
      <div class="spinner-container">
        <div class="spinner"></div>
        <p>Cargando Pet Shop LuNa...</p>
      </div>
    `;
    document.body.insertBefore(spinner, document.body.firstChild);
  }

  hideSpinnerWhenLoaded() {
    window.addEventListener("load", () => {
      const spinner = document.querySelector(".loading-spinner");
      if (spinner) {
        spinner.classList.add("fade-out");
        setTimeout(() => {
          spinner.remove();
        }, 500);
      }
    });
  }
}

// Lazy Loading para Imágenes
class LazyLoader {
  constructor() {
    this.init();
  }

  init() {
    // Verificar si el navegador soporta Intersection Observer
    if ("IntersectionObserver" in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback para navegadores antiguos
      this.loadAllImages();
    }
  }

  setupIntersectionObserver() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  loadAllImages() {
    const images = document.querySelectorAll("img[data-src]");
    images.forEach((img) => {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      img.classList.add("loaded");
    });
  }
}

// ========================================
// INICIALIZACIÓN DE TODAS LAS FUNCIONALIDADES
// ========================================

// Reemplazar la inicialización existente para incluir todas las funcionalidades
document.addEventListener("DOMContentLoaded", function () {
  // Eliminar cualquier botón existente primero
  const existingToggle = document.querySelector(".theme-toggle-container");
  if (existingToggle) {
    existingToggle.remove();
  }

  // Crear el botón de toggle
  createThemeToggle();

  // Cargar tema guardado
  loadSavedTheme();

  // Agregar event listener al botón
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Inicializar funcionalidades adicionales
  new ScrollToTop();
  new LoadingManager();
  new LazyLoader();
});
