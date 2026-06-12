const video = document.querySelector(".background-video");
if (window.innerWidth <= 768) {
  if (video) {
    video.pause();
    video.removeAttribute("autoplay");
    video.removeAttribute("loop");
    video.removeAttribute("src");

    const source = video.querySelector("source");
    if (source) source.remove();

    video.load();
  }
}

const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const counter = entry.target;
            const target = +counter.dataset.target;
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if(current >= target){
                    counter.textContent =
                        target.toLocaleString('fr-FR') + ' €';
                    clearInterval(timer);
                } else {
                    counter.textContent =
                        Math.floor(current).toLocaleString('fr-FR') + ' €';
                }
            }, 20);
            observer.unobserve(counter);
        }
    });
});

counters.forEach(counter => observer.observe(counter));

/*===============================================================
Test============================================================*/
const btn = document.getElementById("soundBtn");

let isMuted = true;

// bouton mute/unmute
btn.addEventListener("click", () => {

    isMuted = !isMuted;

    document.querySelectorAll("audio").forEach(audio => {
        audio.muted = isMuted;
    });

    btn.textContent = isMuted ? "🔇 Muet" : "🔊 Son";

    if (isMuted) {
        document.querySelectorAll("audio").forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
});

// hover play
function playHover(id) {

    if (isMuted) return;

    const audio = document.getElementById(id);

    if (!audio) return;

    // Charge le mp3 uniquement au premier survol
    if (!audio.src) {
        audio.src = "audio/" + id + ".mp3";
    }

    // Stop les autres sons
    document.querySelectorAll("audio").forEach(a => {
        if (a.id !== id) {
            a.pause();
            a.currentTime = 0;
        }
    });

    audio.currentTime = 0;
    audio.play();
}

// hover stop
function stopHover(id) {

    const audio = document.getElementById(id);

    if (!audio) return;

    audio.pause();
}

//Menu déroulant

document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-links");

  if (!toggle || !menu) return;

  // ouvrir/fermer avec bouton
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  // empêcher clic dans le menu de le fermer
  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // clic extérieur = fermeture
  document.addEventListener("click", () => {
    menu.classList.remove("active");
  });

});