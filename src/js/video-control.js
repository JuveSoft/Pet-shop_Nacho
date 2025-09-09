// Video con efecto ping-pong (adelante y atrás) - VERSIÓN ROBUSTA
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("videoLabrador");
  if (video) {
    let isPlayingForward = true;
    let animationId;
    let maxDuration = 0;
    let isTransitioning = false;

    // Configurar el video
    video.removeAttribute("loop");

    // Función para simular reproducción hacia atrás
    function playBackward() {
      if (isTransitioning) return;
      isTransitioning = true;
      video.pause();

      console.log("🔄 Iniciando reproducción hacia atrás");
      const step = 0.02; // Paso para ir hacia atrás

      function updateFrame() {
        if (video.currentTime > 0) {
          video.currentTime = Math.max(0, video.currentTime - step);
          animationId = requestAnimationFrame(updateFrame);
        } else {
          // Llegó al inicio
          cancelAnimationFrame(animationId);
          video.currentTime = 0;
          isPlayingForward = true;
          isTransitioning = false;

          console.log("▶️ Volviendo a reproducir hacia adelante");
          video.play();
        }
      }

      updateFrame();
    }

    // Cuando el video esté listo para reproducir
    video.addEventListener("loadedmetadata", function () {
      maxDuration = video.duration - 2; // Acortar 2 segundos
      console.log(
        `🎬 Video listo: ${video.duration}s, cortado a ${maxDuration}s`
      );
    });

    // Control principal del ping-pong
    video.addEventListener("timeupdate", function () {
      if (
        isPlayingForward &&
        !isTransitioning &&
        video.currentTime >= maxDuration
      ) {
        console.log(`🎯 Tiempo límite alcanzado: ${video.currentTime}s`);
        isPlayingForward = false;
        playBackward();
      }
    });

    // Inicializar cuando pueda reproducir
    video.addEventListener("canplay", function () {
      video.playbackRate = 0.3;
      if (video.paused && maxDuration > 0) {
        video.play();
        console.log("🚀 Video iniciado con ping-pong");
      }
    });

    // Respaldo: si el video termina naturalmente
    video.addEventListener("ended", function () {
      if (isPlayingForward && !isTransitioning) {
        console.log("📺 Video terminó, iniciando ping-pong");
        isPlayingForward = false;
        playBackward();
      }
    });
    // Manejar errores
    video.addEventListener("error", function () {
      console.error("❌ Error en el video");
    });

    // Debug: mostrar estado actual
    setInterval(() => {
      if (video && !video.paused) {
        console.log(
          `⏱️ Estado: ${
            isPlayingForward ? "▶️" : "◀️"
          } Tiempo: ${video.currentTime.toFixed(2)}s/${maxDuration.toFixed(2)}s`
        );
      }
    }, 2000);
  }
});
