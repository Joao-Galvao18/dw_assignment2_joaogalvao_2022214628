// LANDING PAGE VIDEO CAROUSEL + ARROWS
const videos = document.querySelectorAll("video");
const progressBars = [];
const progressContainer = document.getElementById("progressContainer");
const nextArea = document.getElementById("nextArea");
const prevArea = document.getElementById("prevArea");
const textFade = document.getElementById("textFade");
const viewBtn = document.getElementById("viewBtn");
const scrollIndicator = document.getElementById("scrollIndicator");

const videoData = [
  {
    title: "CHAINSAW MAN",
    subtitle: "Denji faces Reze in a bloody clash of love and betrayal",
    link: "https://www.youtube.com/watch?v=GJ1jrCnm-t8"
  },
  {
    title: "JUJUTSU KAISEN",
    subtitle: "Sorcerers battle for survival in the deadly Culling Game",
    link: "https://www.youtube.com/watch?v=RYI-WG_HFV8"
  },
  {
    title: "Demon Slayer",
    subtitle: "Tanjiro faces Muzan in a final battle within the Infinity Castle",
    link: "https://www.youtube.com/watch?v=x7uLutVRBfI"
  }
];

let current = 0;
let scrollVisible = false;
let videoTimeout;
const MAX_VIDEO_DURATION = 20;

videos.forEach(() => {
  const bar = document.createElement("div");
  bar.className = "progress-bar";
  bar.innerHTML = '<div class="progress"></div>';
  progressContainer.appendChild(bar);
  progressBars.push(bar.firstElementChild);
});

function updateContent(index) {
  const { title, subtitle, link } = videoData[index];
  [textFade, viewBtn].forEach(el => el.classList.remove("show"));
  setTimeout(() => {
    textFade.innerHTML = `
      <div class="title">${title}</div>
      <div class="subtitle">${subtitle}</div>
    `;
    viewBtn.href = link;
    [textFade, viewBtn].forEach(el => el.classList.add("show"));
  }, 500);
}

function showVideo(index) {
  clearTimeout(videoTimeout);
  videos.forEach((v, i) => {
    v.classList.toggle("active", i === index);
    v.pause();
    if (i === index) {
      v.currentTime = 0;
      if (v.readyState >= 1) playVideo(v);
      else v.addEventListener("loadedmetadata", () => playVideo(v), { once: true });
    }
  });
  current = index;
  updateContent(index);
  progressBars.forEach(p => (p.style.width = "0%"));
}

function playVideo(video) {
  video.play();
  const duration = Math.min(video.duration || MAX_VIDEO_DURATION, MAX_VIDEO_DURATION);
  setTimeout(() => {
    scrollIndicator.classList.add("show");
    scrollVisible = true;
  }, 500);

  videoTimeout = setTimeout(nextVideo, duration * 1000);
  scrollIndicator.classList.remove("show");
  scrollVisible = false;
  requestAnimationFrame(updateProgress);
}

function updateProgress() {
  const v = videos[current];
  const p = progressBars[current];
  if (v.readyState >= 1) {
    const duration = Math.min(v.duration, MAX_VIDEO_DURATION);
    const percent = Math.min((v.currentTime / duration) * 100, 100);
    p.style.width = percent + "%";
  }
  if (!v.ended && v.currentTime < Math.min(v.duration, MAX_VIDEO_DURATION)) {
    requestAnimationFrame(updateProgress);
  }
}

function nextVideo() {
  clearTimeout(videoTimeout);
  scrollIndicator.classList.remove("show");
  scrollVisible = false;
  current = (current + 1) % videos.length;
  showVideo(current);
}

function prevVideo() {
  clearTimeout(videoTimeout);
  scrollIndicator.classList.remove("show");
  scrollVisible = false;
  current = (current - 1 + videos.length) % videos.length;
  showVideo(current);
}

nextArea.addEventListener("click", nextVideo);
prevArea.addEventListener("click", prevVideo);

const scrollIndicatorEl = document.getElementById("scrollIndicator");
const carouselSection = document.getElementById("carouselSection");

if (scrollIndicatorEl && carouselSection) {
  scrollIndicatorEl.style.cursor = "pointer";
  scrollIndicatorEl.addEventListener("click", () => {
    carouselSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

showVideo(current);
