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

// Inicializar todas las funcionalidades cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new ScrollToTop();
  new LoadingManager();
  new LazyLoader();
});
