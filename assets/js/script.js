const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

const revealItems = document.querySelectorAll(".reveal-on-scroll");

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -5% 0px"
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
}

const randomHeroSections = document.querySelectorAll("[data-hero-images]");

randomHeroSections.forEach((section) => {
  const imageList = section.dataset.heroImages
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!imageList?.length) {
    return;
  }

  const chosenImage = imageList[Math.floor(Math.random() * imageList.length)];

  if (section.classList.contains("page-hero--image")) {
    section.style.backgroundImage = `linear-gradient(180deg, rgba(23, 36, 45, 0.08), rgba(23, 36, 45, 0.18)), url("${chosenImage}")`;
    return;
  }

  const heroImage = section.querySelector(".content-image--intro");

  if (heroImage) {
    heroImage.src = chosenImage;
  }
});
