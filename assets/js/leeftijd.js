/**
 * Berekent de leeftijd op basis van een geboortedatum
 * @param {string} geboortedatum - Datum in formaat "YYYY-MM-DD"
 * @returns {number} - Leeftijd in jaren
 */
function berekenLeeftijd(geboortedatum) {
  const vandaag = new Date();
  const geboorte = new Date(geboortedatum);

  let leeftijd = vandaag.getFullYear() - geboorte.getFullYear();
  const maandverschil = vandaag.getMonth() - geboorte.getMonth();

  if (maandverschil < 0 || (maandverschil === 0 && vandaag.getDate() < geboorte.getDate())) {
    leeftijd--;
  }

  return leeftijd;
}

/**
 * Injecteert berekende leeftijden in HTML-elementen
 */
function updateLeeftijden() {
  const gezinsleden = [
    { id: "leeftijd-ward", geboortedatum: "1987-05-22" },
    { id: "leeftijd-annelies", geboortedatum: "1986-11-07" },
    { id: "leeftijd-vic", geboortedatum: "2014-07-22" },
    { id: "leeftijd-nelle", geboortedatum: "2017-01-23" }
  ];

  gezinsleden.forEach(lid => {
    const element = document.getElementById(lid.id);
    if (element) {
      const leeftijd = berekenLeeftijd(lid.geboortedatum);
      element.textContent = leeftijd;
    }
  });
}

// Voer uit wanneer het DOM klaar is
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateLeeftijden);
} else {
  updateLeeftijden();
}
