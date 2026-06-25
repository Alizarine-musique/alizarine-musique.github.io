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

document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector(".hero-home");
  const video = document.getElementById("introVideo");

  // sécurité
  if (!hero || !video) return;

  // pré-chargement vidéo
  video.load();

  // quand la vidéo est prête → fade transition
  video.addEventListener("canplay", () => {

    setTimeout(() => {
      hero.classList.add("loaded");
    }, 600); // petit délai pour effet ciné

  });

});