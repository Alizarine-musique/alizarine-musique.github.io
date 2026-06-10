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
if (window.innerWidth > 768) {
    document.getElementById('header').insertAdjacentHTML(
        'beforeend',
        `<video autoplay muted loop playsinline class="background-video">
            <source src="image/background2.mp4" type="video/mp4">
        </video>`
    );
}