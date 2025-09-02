// Video con efecto ping-pong (adelante y atrás)
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("videoLabrador");
  if (video) {
    let isPlayingForward = true;
    let animationId;

    // Configurar el video
    video.removeAttribute("loop");

    // Función para simular reproducción hacia atrás
    function playBackward() {
      const step = 0.011; // Aproximadamente 30fps

      function updateFrame() {
        if (video.currentTime > 0) {
          video.currentTime -= step;
          animationId = requestAnimationFrame(updateFrame);
        } else {
          // Llegó al inicio, cambiar a reproducción hacia adelante
          cancelAnimationFrame(animationId);
          isPlayingForward = true;
          video.currentTime = 0;
          video.play();
          console.log("▶️ Reproduciendo hacia adelante");
        }
      }

      video.pause();
      console.log("🔄 Reproduciendo hacia atrás");
      updateFrame();
    }

    // Establecer velocidad cuando el video esté listo
    video.addEventListener("loadeddata", function () {
      video.playbackRate = 0.3; // Velocidad moderada hacia adelante
      console.log("🎬 Video configurado con efecto ping-pong");
    });

    // Controlar la reproducción ping-pong
    video.addEventListener("ended", function () {
      if (isPlayingForward) {
        // Cambiar a reproducción hacia atrás
        isPlayingForward = false;
        playBackward();
      }
    });

    // Inicializar la reproducción
    video.addEventListener("canplay", function () {
      video.playbackRate = 0.2;
      if (video.paused) {
        video.play();
      }
    });
  }
});
