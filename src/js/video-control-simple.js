// Ping-pong súper simple que SÍ funciona 😄
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("videoLabrador");

  if (!video) {
    console.log("❌ No se encontró el video");
    return;
  }

  console.log("🎯 Iniciando ping-pong simple");

  let playingForward = true;
  let backwardAnimation;

  // Función simple para ir hacia atrás
  function goBackward() {
    if (backwardAnimation) {
      cancelAnimationFrame(backwardAnimation);
    }

    video.pause();
    console.log("⬅️ Iniciando reproducción hacia atrás");

    const step = () => {
      if (video.currentTime > 0.1) {
        video.currentTime -= 0.04; // Velocidad hacia atrás
        backwardAnimation = requestAnimationFrame(step);
      } else {
        // Llegó al principio, volver a reproducir hacia adelante
        video.currentTime = 0;
        playingForward = true;
        video.play();
        console.log("▶️ Volviendo hacia adelante");
      }
    };

    step();
  }

  // Control del ping-pong
  video.addEventListener("timeupdate", function () {
    if (!video.duration) return; // Esperar a que se cargue

    const maxTime = video.duration - 2; // Acortar 2 segundos

    if (playingForward && video.currentTime >= maxTime) {
      console.log("🔄 Tiempo límite alcanzado:", video.currentTime.toFixed(2));
      playingForward = false;
      goBackward();
    }
  });

  // Configurar e iniciar el video
  video.addEventListener("canplay", function () {
    video.playbackRate = 0.4; // Velocidad cómoda

    if (video.paused) {
      video.play();
      console.log("▶️ Video iniciado con ping-pong");
      console.log("📏 Duración del video:", video.duration, "segundos");
    }
  });

  // Info cuando se carga
  video.addEventListener("loadeddata", function () {
    console.log("🎬 Video cargado correctamente");
  });

  console.log("✅ Script de ping-pong cargado");
});
