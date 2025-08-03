window.onload = function () {
  const backgrounds = [
    // "home/background3.png",
    "home/background4.jpg",
    "home/background5.jpg",
    "home/background6.jpg",
    "home/background7.jpg"
  ];

  let currentIndex = 0;
  const introSection = document.querySelector(".intro-section");

  if (!introSection) {
    console.error("intro-section not found");
    return;
  }

  function switchBackground() {
    introSection.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % backgrounds.length;
  }

  switchBackground();
  setInterval(switchBackground, 2000);
};
