document.addEventListener("DOMContentLoaded", () => {

  const video = document.getElementById("introVideo");
  const btn = document.getElementById("soundBtn");

  if (!video) return;

  video.muted = true;

  // play safe
  video.play().catch(() => {
    video.muted = true;
    video.play();
  });

  // son toggle
  if (btn) {
    btn.addEventListener("click", () => {
      video.muted = !video.muted;
      btn.textContent = video.muted ? "🔇 Prêt à danser ?" : "🔊 C'est parti !";
    });
  }

});