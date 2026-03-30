# De Blockertjes website

Een eenvoudige, statische en mobielvriendelijke website voor GitHub Pages, opgebouwd met alleen HTML, CSS en een klein beetje vanilla JavaScript.

## Structuur

```text
/
|-- index.html
|-- over-ons/
|   `-- index.html
|-- social-media/
|   `-- index.html
|-- catechese/
|   `-- index.html
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- js/
|   |   `-- script.js
|   `-- images/
|       |-- favicon.png
|       |-- favicon.svg
|       |-- logo-de-blockertjes.jpg
|       |-- logo-de-blockertjes.svg
|       `-- og-image.svg
`-- README.md
```

## GitHub Pages deployment

1. Push deze map naar een GitHub-repository.
2. Ga in GitHub naar `Settings` > `Pages`.
3. Kies bij `Source` voor `Deploy from a branch`.
4. Selecteer de gewenste branch, meestal `main`, en kies de root-map (`/`).
5. Sla op. GitHub Pages publiceert daarna automatisch de site.

## Aanpassen

- Het echte logo wordt nu gebruikt via `assets/images/logo-de-blockertjes.jpg`.
- Als je later een scherpere PNG, SVG of bijgewerkte versie hebt, kan je dezelfde bestandsnaam vervangen zonder de HTML aan te passen.
- Pas teksten aan in de HTML-bestanden. Er staan korte HTML-comments op enkele logische plaatsen om dat sneller te maken.
- Alle interne links gebruiken relatieve paden, zodat de site lokaal en via GitHub Pages werkt.
- De kleurvariabelen staan centraal bovenaan in `assets/css/styles.css`.

## Opmerking

Naast het echte logo blijft ook een eenvoudige placeholder-SVG in de map staan, handig als reserve of voor snelle varianten.
