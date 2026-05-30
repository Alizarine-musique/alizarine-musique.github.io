/* MARCHE
document.querySelectorAll(".concert").forEach(el => {
  const date = new Date(el.dataset.date);
  const now = new Date();

  if (date < now) {
    el.classList.add("past");
  } else {
    el.classList.add("upcoming");
  }
});

METTRE EN AVANT LE PROCHAIN CONCERT
const concerts = document.querySelectorAll(".concert");

const now = new Date();

let nextConcert = null;
let nextDate = null;

// 1. classer past / upcoming + trouver le prochain concert
concerts.forEach(el => {
  const date = new Date(el.dataset.date);

  if (date < now) {
    el.classList.add("past");
  } else {
    el.classList.add("upcoming");

    // chercher le plus proche dans le futur
    if (!nextDate || date < nextDate) {
      nextDate = date;
      nextConcert = el;
    }
  }
});

// 2. mettre en avant le prochain concert
if (nextConcert) {
  nextConcert.classList.add("next-concert");
}
*/

const container = document.querySelector(".concert-list"); 
// 👉 mets ici le parent de tes concerts (ul ou div)

const concerts = Array.from(container.querySelectorAll(".concert"));

const now = new Date();

// 1. conversion + classification
const sorted = concerts.map(el => {
  const date = new Date(el.dataset.date);

  return {
    el,
    date
  };
});

// 2. tri chronologique (du plus proche au plus loin)
sorted.sort((a, b) => a.date - b.date);

// 3. réinjection dans le DOM (ordre corrigé)
sorted.forEach(item => {
  container.appendChild(item.el);
});

// 4. gestion past / upcoming + prochain concert
let nextConcert = null;
let nextDate = null;

sorted.forEach(item => {
  const el = item.el;

  if (item.date < now) {
    el.classList.add("past");
  } else {
    el.classList.add("upcoming");

    if (!nextDate || item.date < nextDate) {
      nextDate = item.date;
      nextConcert = el;
    }
  }
});

// 5. highlight prochain concert
if (nextConcert) {
  nextConcert.classList.add("next-concert");
}

