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