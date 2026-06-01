const lists = document.querySelectorAll("ul");
const now = new Date();

let nextConcert = null;
let nextDate = null;

// 📱 détection mobile
const isMobile = window.matchMedia("(max-width:768px)").matches;

// 🔁 TRI + CLASSES
lists.forEach(list => {
  const concerts = Array.from(list.querySelectorAll(".concert"));

  concerts.forEach(el => {
    const date = new Date(el.dataset.date);
    if (isNaN(date)) return;

    if (date < now) {
      el.classList.add("past");
    } else {
      el.classList.add("upcoming");

      if (!nextDate || date < nextDate) {
        nextDate = date;
        nextConcert = el;
      }
    }
  });

  concerts
    .sort((a, b) => {
      const dateA = new Date(a.dataset.date);
      const dateB = new Date(b.dataset.date);

      const aPast = dateA < now;
      const bPast = dateB < now;

      if (aPast !== bPast) return aPast ? 1 : -1;
      return dateA - dateB;
    })
    .forEach(el => list.appendChild(el));
});

// ⭐ mise en avant prochain concert
if (nextConcert) {
  nextConcert.classList.add("next-concert");
}

// =========================
// 🎤 LIGHTBOX
// =========================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".concert").forEach(item => {
  item.addEventListener("click", (e) => {

    const img = item.dataset.img;

    if (!img) return;

    // 📱 MOBILE → pas de lightbox
    if (isMobile) {
      window.open(img, "_blank");
      return;
    }

    // 💻 DESKTOP → lightbox
    lightboxImg.src = img;
    lightbox.style.display = "flex";
  });
});

// ❌ fermer lightbox
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  lightboxImg.src = "";
});