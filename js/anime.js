// ANIME LIST API PAGE + FILTERING
const animeList = document.getElementById("animeList");
const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");
const filterBtn = document.getElementById("filterBtn");
const searchBtn = document.getElementById("searchBtn");

async function fetchAnime(query = "", genre = "") {
  animeList.innerHTML = `<p class="loading-text">Loading anime...</p>`;

  let url = "https://api.jikan.moe/v4/anime?limit=20";
  if (query) url += `&q=${encodeURIComponent(query)}`;
  if (genre) url += `&genres=${genre}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    animeList.innerHTML = "";

    if (!data.data || data.data.length === 0) {
      animeList.innerHTML = `<p style="color: var(--text-color);">No results found</p>`;
      return;
    }

    data.data.forEach(anime => {
      const card = document.createElement("div");
      card.classList.add("anime-card");

      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
      `;

      card.addEventListener("click", () => {
        window.open(anime.url, "_blank");
      });

      animeList.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    animeList.innerHTML = `<p style="color: var(--text-color);">Failed to load anime</p>`;
  }
}

fetchAnime();

function applyFilters() {
  const searchTerm = searchInput.value.trim();
  const selectedGenre = genreSelect.value;
  fetchAnime(searchTerm, selectedGenre);
}

filterBtn.addEventListener("click", applyFilters);
searchBtn.addEventListener("click", applyFilters);

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") applyFilters();
});