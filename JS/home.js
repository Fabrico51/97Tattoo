const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.slide');
  const progress = document.querySelector('.progress');

  let index = 0;
  const duration = 5000; // 5s por slide

  function startProgress() {
    progress.style.transition = 'none';
    progress.style.width = '0%';

    setTimeout(() => {
      progress.style.transition = `width ${duration}ms linear`;
      progress.style.width = '100%';
    }, 50);
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    startProgress();
  }

  startProgress();
  setInterval(nextSlide, duration);

  function toggleCard(card) {
    card.classList.toggle("expanded");
  }

  /* PIERCING */
function togglePiercing(event) {
  event.stopPropagation();
  const card = event.target.closest(".piercing");
  card.classList.toggle("active");
}

/* SLIDE */
function openSlide() {
  document.getElementById("slidePanel").classList.add("active");
}

function closeSlide() {
  document.getElementById("slidePanel").classList.remove("active");
}

/* CARROSSEL */
let currentIndex = 0;
const items = document.querySelectorAll(".carousel-item");

function showItem(index) {
  items.forEach(item => item.classList.remove("active"));
  items[index].classList.add("active");
}

function nextItem() {
  currentIndex = (currentIndex + 1) % items.length;
  showItem(currentIndex);
}

function prevItem() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  showItem(currentIndex);
}



document.querySelectorAll('.cardtattoo').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});







  document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
      const button = item.querySelector('.faq-question');

      button.addEventListener('click', () => {
        items.forEach(i => {
          if (i !== item) i.classList.remove('active');
        });

        item.classList.toggle('active');
      });
    });
  });