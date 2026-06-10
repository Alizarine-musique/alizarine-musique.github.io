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