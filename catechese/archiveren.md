# Handleiding: Archiveren Actief Catechesejaar

Dit document dient als het **implementatieplan** en instructieset voor toekomstige AI-assistenten (of de beheerder) wanneer de gebruiker vraagt: **"archiveer het actief jaar"**. 

Volg de onderstaande stappen nauwkeurig uit om de overgang naar een nieuw catechesejaar (bijvoorbeeld van `2025-2026` naar `2026-2027`) soepel en foutloos te laten verlopen.

---

## 1. Voorbereiding & Parameters
Vraag de gebruiker eerst om de volgende gegevens te bevestigen:
*   **Het te archiveren jaar (oud actief jaar):** Bijvoorbeeld `2025-2026`.
*   **Het nieuwe actieve jaar:** Bijvoorbeeld `2026-2027`.
*   **Een persoonlijke noot voor de archiefpagina:** (Bijvoorbeeld: *"Een fantastisch jaar waarin onze zoon meedeed."* of *"Ons eerste jaar als catechisten."*).

---

## 2. Kopiëren van de actieve content
Kopieer de volledige mappen van de actieve content naar de map van het te archiveren jaar.

**PowerShell commando's:**
```powershell
# Vervang [OUD_JAAR] door het jaartal, bijv. 2025-2026
Copy-Item -Path "catechese/praktische-info" -Destination "catechese/[OUD_JAAR]/" -Recurse
Copy-Item -Path "catechese/fotos-en-documenten" -Destination "catechese/[OUD_JAAR]/" -Recurse
```

---

## 3. Relatieve paden aanpassen (Link Fixer)
Omdat de gekopieerde bestanden nu één niveau dieper in de mappenstructuur staan, moeten alle relatieve paden (die beginnen met `../`) worden gecorrigeerd door er een extra `../` voor te zetten.

### Regels voor aanpassen HTML-bestanden onder `catechese/[OUD_JAAR]/`:
1.  **Regex vervanging voor attributen:**
    Zoek naar `(href|src|data-hero-images|content)="(\.\.\/[^"]*)"` en vervang dit door `$1="../$2"`.
    *   *Voorbeeld:* `href="../../assets/"` wordt `href="../../../assets/"`.
2.  **CSS achtergronden:**
    Zoek naar `url('(../...)')` en pas dit aan naar `url('../../...')`.
3.  **Kruimelpaden (Breadcrumbs) bijwerken:**
    *   Voor de hoofd-gearchiveerde indexpagina's (bijv. `catechese/[OUD_JAAR]/praktische-info/index.html`):
        Pas het kruimelpad aan zodat het gearchiveerde jaar ertussen staat:
        `Home › Catechese › [OUD_JAAR] › Praktische info`
    *   Voor geneste pagina's (bijv. `dankviering-[JAAR]/index.html`):
        Pas het kruimelpad aan naar:
        `Home › Catechese › [OUD_JAAR] › Praktische info › [Pagina Titel]`

---

## 4. Archief-indexpagina stylen (`catechese/[OUD_JAAR]/index.html`)
Pas de indexpagina van het gearchiveerde jaar aan zodat deze in dezelfde tweekolomsstijl staat als voorgaande jaren:

1.  **Vervang de placeholder:** Verwijder de "Archief volgt later" kaart of eventuele eerdere placeholders.
2.  **Voeg actieve kaarten toe:**
    ```html
    <section class="stack-grid">
      <article class="surface-card content-card">
        <span class="topic-icon topic-icon--calendar" aria-hidden="true"></span>
        <h2>Praktische info</h2>
        <p>Bekijk de planning, uurregelingen en de verslagen van de bijeenkomsten van dit catechesejaar.</p>
        <a class="button button--primary" href="praktische-info/">Bekijk praktische info</a>
      </article>

      <article class="surface-card content-card">
        <span class="topic-icon topic-icon--docs" aria-hidden="true"></span>
        <h2>Foto's en documenten</h2>
        <p>Herbekijk de foto's, documenten en misboekjes die horen bij dit catechesejaar.</p>
        <a class="button button--primary" href="fotos-en-documenten/">Open het archief</a>
      </article>
    </section>
    ```
3.  **Hero layout updaten:**
    Pas de class van de hero-sectie aan naar `docs-hero archive-hero` en voeg de rechterkolom (`.archive-hero__aside`) toe met de documenten-iconen en de **persoonlijke noot** van de gebruiker.

---

## 5. Opschonen van de root-mappen
Verwijder alle jaar-specifieke submappen uit de root om vervuiling te voorkomen. **Behoud alleen de `index.html` bestanden.**

**PowerShell commando's:**
```powershell
# Verwijder oude submappen uit de actieve root-folders
Remove-Item -Path "catechese/praktische-info/*" -Exclude "index.html" -Recurse -Force
Remove-Item -Path "catechese/fotos-en-documenten/*" -Exclude "index.html" -Recurse -Force
```

---

## 6. Placeholders inrichten voor het nieuwe jaar
Pas de `index.html` bestanden in de actieve root-mappen aan voor het nieuwe jaar (`[NIEUW_JAAR]`):

### A. In `catechese/praktische-info/index.html`:
1.  Verander alle titels en beschrijvingen naar het nieuwe jaar (bijv. *"Praktische info [NIEUW_JAAR]"*).
2.  Leeg de planning-data door de JSON-scripttag leeg te maken:
    ```html
    <script id="planning-data" type="application/json">
    []
    </script>
    ```
3.  Plaats een duidelijke placeholder-tekst in de `#planning-root` container:
    ```html
    <div id="planning-root" class="planning-root">
      <p style="font-style: italic; color: var(--color-sage); padding: 1rem 0; text-align: left;">
        De planning voor het catechesejaar [NIEUW_JAAR] wordt hier binnenkort bekendgemaakt.
      </p>
    </div>
    ```

### B. In `catechese/fotos-en-documenten/index.html`:
1.  Verander titels en beschrijvingen naar het nieuwe jaar.
2.  Zet de actieve kaarten (boekje, misboekjes, foto's) om naar placeholder-kaarten met **gedeactiveerde knoppen**:
    ```html
    <a class="button button--primary button--disabled" href="#" tabindex="-1" aria-disabled="true">Volgt binnenkort</a>
    ```

---

## 7. Verificatie
Controleer na de uitvoering of:
1.  De nieuwe gearchiveerde pagina's (onder `catechese/[OUD_JAAR]/`) correct laden en de stylesheets/afbeeldingen niet gebroken zijn.
2.  De navigatieknoppen in de header en footer naar de juiste (nieuwe) root-mappen en archieven linken.
3.  Er geen 404-fouten optreden in de console.
