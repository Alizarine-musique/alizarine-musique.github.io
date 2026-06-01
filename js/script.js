/*
const concerts = Array.from(document.querySelectorAll(".concert"));

const now = new Date();

let nextConcert = null;
let nextDate = null;

// 1. nettoyer + classer
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

// 2. TRI GLOBAL CHRONOLOGIQUE (IMPORTANT)
concerts
  .sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date))
  .forEach(el => {
    el.parentNode.appendChild(el);
  });

// 3. mise en avant du prochain concert
if (nextConcert) {
  nextConcert.classList.add("next-concert");
}
*/
const lists = document.querySelectorAll("ul");

const now = new Date();

let nextConcert = null;
let nextDate = null;

// 🔁 On traite chaque liste séparément
lists.forEach(list => {
  const concerts = Array.from(list.querySelectorAll(".concert"));

  // 1. classer + trouver prochain concert
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

  // 2. TRI DANS CHAQUE LISTE :
  // futurs d'abord, puis passés
  concerts
    .sort((a, b) => {
      const dateA = new Date(a.dataset.date);
      const dateB = new Date(b.dataset.date);

      const aPast = dateA < now;
      const bPast = dateB < now;

      // futurs avant passés
      if (aPast !== bPast) {
        return aPast ? 1 : -1;
      }

      // sinon tri chronologique
      return dateA - dateB;
    })
    .forEach(el => {
      list.appendChild(el);
    });
});

// 3. mise en avant du prochain concert global
if (nextConcert) {
  nextConcert.classList.add("next-concert");
}
