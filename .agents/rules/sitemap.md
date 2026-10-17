---
trigger: always_on
---

# Sitemap & Robots Onderhoud (De Blockertjes)

- Wanneer je een nieuwe publieke HTML-pagina aanmaakt, verplaatst of verwijdert in deze repository, MOET je altijd `sitemap.xml` in de hoofdmap bijwerken:
  - Voeg de nieuwe URL toe met domein `https://deblockertjes.be/...` en zet `<lastmod>` op de huidige datum (`YYYY-MM-DD`).
  - Gebruik nette map-URL's met een schuine streep op het einde (bijv. `https://deblockertjes.be/catechese/nieuw-item/`) wanneer het bestand `index.html` heet.
- Wanneer je een bestaande publieke pagina inhoudelijk wijzigt, werk dan de `<lastmod>` datum van die URL in `sitemap.xml` bij.
- Neem GEEN privé- of interne pagina's op in `sitemap.xml`, zoals mappen die uitgesloten zijn in `robots.txt` (`/lore/`, `/strijders/`, `/vrijgezel-jelle/`, `/catechese/interne-verslagen/`) of mappen met `_old`.
- Als er een nieuwe privé- of interne map wordt aangemaakt die niet in Google mag verschijnen, voeg deze dan direct toe als `Disallow:` regel in `robots.txt`.
