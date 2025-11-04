// NAVBAR SCROLL BEHAVIOR
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobileMenu');

let lastScrollY = window.scrollY;
let scrollTimeout;
let isScrollingDown = false;
let hasHidden = false;

window.addEventListener('scroll', () => {
  if (!mobileMenu.classList.contains('open')) {
    clearTimeout(scrollTimeout);

    if (window.scrollY > lastScrollY && window.scrollY > 150) {
      if (!hasHidden) {
        navbar.classList.add('hidden');
        hasHidden = true;
      }
      isScrollingDown = true;
    } else if (window.scrollY < lastScrollY) {
      if (hasHidden) {
        navbar.style.transition = 'transform 0.35s ease';
        navbar.classList.remove('hidden');
        hasHidden = false;
      }
      isScrollingDown = false;
    }

    scrollTimeout = setTimeout(() => {
      if (isScrollingDown && hasHidden) {
        navbar.style.transition = 'transform 0.35s ease';
        navbar.classList.remove('hidden');
        hasHidden = false;
      }
    }, 250);
  }

  if (window.scrollY > window.innerHeight * 0.8) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollY = window.scrollY;
});

// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIcon = document.getElementById('themeIcon');
const mobileThemeIcon = document.getElementById('mobileThemeIcon');

const userTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);

  const fillColor = mode === 'dark' ? 'var(--accent-color)' : 'var(--text-color)';
  themeIcon.setAttribute('fill', fillColor);
  mobileThemeIcon.setAttribute('fill', fillColor);
}

if (userTheme === 'dark' || (!userTheme && systemDark)) {
  setTheme('dark');
} else {
  setTheme('light');
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

mobileThemeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// MOBILE MENU TOGGLE
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// LANDING SECTION NAVBAR BEHAVIOR
const videoContainer = document.querySelector('.video-container');

const currentPath = window.location.pathname;
const isIndexPage =
  currentPath.endsWith('/') ||
  currentPath.endsWith('index.html') ||
  currentPath.includes('dw_assignment2_joaogalvao_2022214628');

function updateNavbarLandingState() {
  if (isIndexPage && videoContainer) {
    const landingBottom = videoContainer.offsetTop + videoContainer.offsetHeight;
    const currentScroll = window.scrollY;

    if (currentScroll < landingBottom - 100) {
      navbar.classList.add('landing-active');
      navbar.classList.remove('scrolled');
    } else {
      navbar.classList.remove('landing-active');
      navbar.classList.add('scrolled');
    }
  } else {
    navbar.classList.add('scrolled');
    navbar.classList.remove('landing-active');
  }
}

window.addEventListener('scroll', updateNavbarLandingState);
window.addEventListener('load', updateNavbarLandingState);

setTimeout(updateNavbarLandingState, 300);

// UNIVERSAL TITLE REVEAL FUNCTION
function revealOnScroll(elementId, threshold = 0.85) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let hasAnimated = false;

  function checkScroll() {
    if (hasAnimated) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * threshold) {
      el.classList.add("show");
      hasAnimated = true;
      window.removeEventListener("scroll", checkScroll);
    }
  }

  checkScroll();
  window.addEventListener("scroll", checkScroll);
}

window.addEventListener("load", () => {
  revealOnScroll("carouselTitle");
  revealOnScroll("aboutTitle");
});

window.addEventListener("load", () => {
  const title = document.getElementById("animeTitle");
  if (title) title.classList.add("show");
});

//SCROLL FOR INTERNAL LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId.startsWith("#") && targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        if (mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
          document.body.style.overflow = "";
        }
      }
    }
  });
});

//ABOUT LINK HANDLER
document.querySelectorAll('.about-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const onHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    if (onHomePage) {
      e.preventDefault();
      const target = document.querySelector('#about');
      if (target) {
        const yOffset = -80;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

//ANIMES LINK HANDLER
document.querySelectorAll('.featured-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const onHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    if (onHomePage) {
      e.preventDefault();
      const target = document.querySelector('#carouselSection');
      if (target) {
        const yOffset = -80;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

// BACK TO TOP FUNCTIONALITY
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
