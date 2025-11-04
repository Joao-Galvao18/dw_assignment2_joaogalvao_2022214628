// FEATURED SECTION CAROUSEL
const carouselTrack = document.getElementById("carouselTrack");

let isHovered = false;
let scrollSpeed = 1.5;
let position = 0;

const animeLinks = [
  "https://myanimelist.net/anime/57555/Chainsaw_Man_Movie__Reze-hen",
  "https://myanimelist.net/anime/59192/Kimetsu_no_Yaiba_Movie_1__Mugenjou-hen_-_Akaza_Sairai",
  "https://myanimelist.net/anime/57658/Jujutsu_Kaisen_3rd_Season?q=juju&cat=anime",
  "https://anilist.co/anime/182896/Boku-no-Hero-Academia-FINAL-SEASON",
  "https://myanimelist.net/anime/59978/Sousou_no_Frieren_2nd_Season",
];

carouselTrack.innerHTML += carouselTrack.innerHTML;

const allItems = carouselTrack.querySelectorAll(".carousel-item");
const originalCount = animeLinks.length;

allItems.forEach((item, i) => {
  const link = animeLinks[i % originalCount] || "#";
  item.style.cursor = "pointer";
  item.addEventListener("click", () => {
    window.open(link, "_blank");
  });
});

function autoScroll() {
  if (!isHovered) position -= scrollSpeed;
  else position -= scrollSpeed * 0.3;

  const resetPoint = carouselTrack.scrollWidth / 2;
  if (Math.abs(position) >= resetPoint) position = 0;

  carouselTrack.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(autoScroll);
}

carouselTrack.addEventListener("mouseenter", () => (isHovered = true));
carouselTrack.addEventListener("mouseleave", () => (isHovered = false));

autoScroll();
