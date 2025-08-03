const cards = document.querySelectorAll('.carousel-card');
let currentIndex = 0;

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove('active', 'side', 'hidden');

    // Active card (middle)
    if (i === currentIndex) {
      card.classList.add('active');
    } 
    // Left side card
    else if (i === (currentIndex - 1 + cards.length) % cards.length) {
      card.classList.add('side');
    } 
    // Right side card
    else if (i === (currentIndex + 1) % cards.length) {
      card.classList.add('side');
    } 
    // All other cards hidden
    else {
      card.classList.add('hidden');
    }
  });
}

// Initial render
updateCarousel();

// Auto slide every 3 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
}, 2000);
