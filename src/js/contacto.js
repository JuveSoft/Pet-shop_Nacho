// Contact form functionality with EmailJS
document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // CONFIGURACIÓN EMAILJS - ¡IMPORTANTE!
  // ==========================================

  /* 
    PASOS PARA CONFIGURAR EmailJS:
    
    1. Ve a https://www.emailjs.com/ y crea cuenta gratuita
    2. Conecta tu email (Gmail recomendado) en "Email Services"
    3. Crea una plantilla en "Email Templates" con estos campos:
       - {{from_name}} - {{from_email}} - {{phone}} - {{pet_name}}
       - {{subject}} - {{message}} - {{newsletter}} - {{to_name}}
    4. Reemplaza las 3 claves abajo con las tuyas reales:
  */

  emailjs.init("_egrs6ENWsYGoP9fe"); // Public Key configurado
  const SERVICE_ID = "service_vuxiwtg"; // Service ID configurado
  const TEMPLATE_ID = "ewy07z1"; // Template ID configurado

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Recopilar datos del formulario
      const formData = new FormData(contactForm);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      // Validación básica
      if (!data.nombre || !data.email || !data.asunto || !data.mensaje) {
        showMessage(
          "Por favor, completa todos los campos obligatorios.",
          "error"
        );
        return;
      }

      if (!isValidEmail(data.email)) {
        showMessage("Por favor, ingresa un email válido.", "error");
        return;
      }

      // Preparar parámetros para EmailJS
      const templateParams = {
        from_name: data.nombre,
        from_email: data.email,
        phone: data.telefono || "No proporcionado",
        pet_name: data.mascota || "No especificado",
        subject: data.asunto,
        message: data.mensaje,
        newsletter: data.newsletter ? "Sí, desea recibir newsletter" : "No",
        to_name: "Pet Shop LuNa",
      };

      // Estado de carga
      const submitButton = contactForm.querySelector(".btn-submit");
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitButton.disabled = true;

      // Enviar email con EmailJS
      console.log("Enviando con estos parámetros:", templateParams);
      console.log("Service ID:", SERVICE_ID);
      console.log("Template ID:", TEMPLATE_ID);
      
      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(
          function (response) {
            console.log("Email enviado exitosamente:", response);
            contactForm.reset();
            showMessage(
              "¡Mensaje enviado exitosamente! Te responderemos pronto.",
              "success"
            );
          },
          function (error) {
            console.error("Error completo de EmailJS:", error);
            console.error("Status del error:", error.status);
            console.error("Texto del error:", error.text);
            
            let errorMsg = "Error al enviar mensaje. ";
            if (error.status === 422) {
              errorMsg += "Template ID o Service ID incorrectos.";
            } else if (error.status === 401) {
              errorMsg += "Public Key incorrecto.";
            } else if (error.status === 400) {
              errorMsg += "Datos del formulario inválidos.";
            } else {
              errorMsg += "Intenta nuevamente. Código: " + error.status;
            }
            
            showMessage(errorMsg, "error");
          }
        )
        .finally(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        });
    });
  }
});

// Funciones auxiliares
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessage(message, type) {
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.innerHTML = `
    <i class="fas ${
      type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
    }"></i>
    <span>${message}</span>
  `;

  const form = document.getElementById("contactForm");
  form.parentNode.insertBefore(messageDiv, form.nextSibling);

  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);

  messageDiv.scrollIntoView({ behavior: "smooth", block: "center" });
}
