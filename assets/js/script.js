const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links__item");

if (navItems.length) {
  const currentPath = window.location.pathname.toLowerCase();
  let activeItem = null;
  let longestMatchLength = -1;

  navItems.forEach((item) => {
    item.classList.remove("nav-links__item--active");
    item.removeAttribute("aria-current");

    const href = item.getAttribute("href");

    if (!href) {
      return;
    }

    const resolvedPath = new URL(href, window.location.href).pathname.toLowerCase();
    const isMatch = currentPath === resolvedPath || currentPath.startsWith(resolvedPath);

    if (isMatch && resolvedPath.length > longestMatchLength) {
      activeItem = item;
      longestMatchLength = resolvedPath.length;
    }
  });

  if (activeItem) {
    activeItem.classList.add("nav-links__item--active");
    activeItem.setAttribute("aria-current", "page");
  }
}

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

const heroQuote = document.querySelector(".hero-quote");

if (heroQuote) {
  const sundayQuote = {
    text: "De sabbat is gemaakt voor de mens, maar de mens niet voor de sabbat.",
    ref: "Marcus 2:27"
  };

  const specialQuotes = {
    "1-1": { text: "Zie, Ik maak alle dingen nieuw.", ref: "Openbaring 21:5" },
    "14-2": { text: "God is liefde, en wie in de liefde blijft, blijft in God.", ref: "1 Johannes 4:16" },
    "1-11": { text: "Zalig de zuiveren van hart, want zij zullen God zien.", ref: "Matteüs 5:8" },
    "25-12": { text: "Want een Kind is ons geboren, een Zoon is ons gegeven.", ref: "Jesaja 9:5" }
  };

  const quotes = [
    { text: "Verkondig te pas en te onpas. Zo nodig ook met woorden.", ref: "2 Timoteüs 4:2" },
    { text: "Geef aan de keizer wat de keizer toekomt, en aan God wat God toekomt.", ref: "Matteüs 22:21" },
    { text: "Wees niet bang, want Ik ben met jou.", ref: "Jesaja 41:10" },
    { text: "Liefde is geduldig en vriendelijk.", ref: "1 Korintiërs 13:4" },
    { text: "Ik kan alles aan door Hem die mij kracht geeft.", ref: "Filippenzen 4:13" },
    { text: "Heb je naaste lief als jezelf.", ref: "Marcus 12:31" },
    { text: "Zalig de zachtmoedigen, want zij zullen de aarde bezitten.", ref: "Matteüs 5:5" },
    { text: "Doe aan anderen wat je wilt dat zij jou doen.", ref: "Lucas 6:31" },
    { text: "Want bij God is niets onmogelijk.", ref: "Lucas 1:37" },
    { text: "Zoek eerst het koninkrijk van God.", ref: "Matteüs 6:33" },
    { text: "Uw woord is een lamp voor mijn voet, een licht op mijn pad.", ref: "Psalm 119:105" },
    { text: "Vertrouw op de Heer met heel je hart.", ref: "Spreuken 3:5" }
  ];

  const today = new Date();
  const dateKey = `${today.getDate()}-${today.getMonth() + 1}`;
  const isSunday = today.getDay() === 0;

  let chosen;
  if (specialQuotes[dateKey]) {
    chosen = specialQuotes[dateKey];
  } else if (isSunday) {
    chosen = sundayQuote;
  } else {
    const dayIndex = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    chosen = quotes[(today.getFullYear() * 365 + dayIndex) % quotes.length];
  }

  heroQuote.textContent = `${chosen.text} (${chosen.ref})`;
}

const planningRoot = document.querySelector("#planning-root");
const planningDataScript = document.querySelector("#planning-data");

if (planningRoot && planningDataScript) {
  const monthMap = {
    januari: 0,
    februari: 1,
    maart: 2,
    april: 3,
    mei: 4,
    juni: 5,
    juli: 6,
    augustus: 7,
    september: 8,
    oktober: 9,
    november: 10,
    december: 11
  };

  const typeClassMap = {
    catechese: "planning-badge--catechese",
    eucharistie: "planning-badge--eucharistie",
    voorbereiding: "planning-badge--voorbereiding",
    vormsel: "planning-badge--vormsel"
  };

  const parseDutchDate = (value) => {
    const match = value.trim().toLowerCase().match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/);

    if (!match) {
      return null;
    }

    const [, day, monthName, year] = match;
    const monthIndex = monthMap[monthName];

    if (monthIndex === undefined) {
      return null;
    }

    return new Date(Number(year), monthIndex, Number(day));
  };

  const slugify = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const today = new Date();
  const referenceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const planningItems = JSON.parse(planningDataScript.textContent).map((item) => {
    const parsedDate = parseDutchDate(item.datum);
    return {
      ...item,
      parsedDate,
      isPast: parsedDate ? parsedDate < referenceDate : false
    };
  });

  const groupedByMonth = planningItems.reduce((groups, item) => {
    const key = item.parsedDate
      ? new Intl.DateTimeFormat("nl-BE", { month: "long", year: "numeric" }).format(item.parsedDate)
      : "Onbekende datum";

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(item);
    return groups;
  }, new Map());

  groupedByMonth.forEach((items, monthLabel) => {
    const monthSection = document.createElement("section");
    monthSection.className = "planning-month";

    const monthHeader = document.createElement("div");
    monthHeader.className = "planning-month__header";

    const monthTitle = document.createElement("h3");
    monthTitle.className = "planning-month__title";
    monthTitle.textContent = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
    monthHeader.appendChild(monthTitle);

    if (items.some((item) => !item.isPast)) {
      const monthHint = document.createElement("span");
      monthHint.className = "planning-month__hint";
      monthHint.textContent = "Volgende momenten";
      monthHeader.appendChild(monthHint);
    }

    monthSection.appendChild(monthHeader);

    const monthList = document.createElement("div");
    monthList.className = "planning-list";

    items.forEach((item) => {
      const article = document.createElement("article");
      article.className = `planning-item ${item.isPast ? "planning-item--past" : "planning-item--upcoming"}`;

      const top = document.createElement("div");
      top.className = "planning-item__top";

      const dateBlock = document.createElement("div");
      dateBlock.className = "planning-item__date";

      const day = document.createElement("span");
      day.className = "planning-item__day";
      day.textContent = item.dag;
      dateBlock.appendChild(day);

      const date = document.createElement("span");
      date.textContent = item.datum;
      dateBlock.appendChild(date);
      top.appendChild(dateBlock);

      const statusBadge = document.createElement("span");
      statusBadge.className = `planning-badge ${item.isPast ? "planning-badge--status-past" : "planning-badge--status-upcoming"}`;
      statusBadge.textContent = item.isPast ? "Voorbij" : "Komt eraan";
      top.appendChild(statusBadge);
      article.appendChild(top);

      const meta = document.createElement("div");
      meta.className = "planning-item__meta";

      const time = document.createElement("div");
      time.className = "planning-item__time";
      time.textContent = item.uur;
      meta.appendChild(time);

      const titleRow = document.createElement("div");
      titleRow.className = "planning-item__title-row";

      const title = document.createElement("h4");
      title.className = "planning-item__title";
      if (item.url) {
        const link = document.createElement("a");
        link.href = item.url;
        link.textContent = item.type || item.omschrijving || "Activiteit";
        title.appendChild(link);
      } else {
        title.textContent = item.type || item.omschrijving || "Activiteit";
      }
      titleRow.appendChild(title);

      if (item.type) {
        const typeBadge = document.createElement("span");
        const typeSlug = slugify(item.type);
        const mappedClass = Object.entries(typeClassMap).find(([key]) => typeSlug.startsWith(key))?.[1] || "planning-badge--type";
        typeBadge.className = `planning-badge ${mappedClass}`;
        typeBadge.textContent = item.type;
        titleRow.appendChild(typeBadge);
      }

      meta.appendChild(titleRow);

      if (item.omschrijving) {
        const description = document.createElement("p");
        description.className = "planning-item__description";
        description.textContent = item.omschrijving;
        meta.appendChild(description);
      }

      const place = document.createElement("p");
      place.className = "planning-item__place";
      place.innerHTML = `<strong>Plaats:</strong> ${item.plaats}`;
      meta.appendChild(place);

      article.appendChild(meta);
      monthList.appendChild(article);
    });

    monthSection.appendChild(monthList);
    planningRoot.appendChild(monthSection);
  });
}
