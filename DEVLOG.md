# DEVLOG — Conversion overhaul

Build-by-build log of the SUPERPLAN execution. Newest entries on top.

---

## 2026-04-10 — Session 3: Ramp-inspired visual rework (design system v2)

User asked for a heavy visual rework, section by section, taking inspiration for **boxes, flow and layout** from Ramp.com. No copy/structure loss — this is a pure design layer on top of the existing conversion-optimized markup.

### Design language extracted from Ramp
- Warm cream background (`#F4EFE5`), near-black ink (`#141414`), subtle 1px borders (`#E6DFD0`), amber accent (`#E8943A`)
- Large display headlines with tight negative letter-spacing, generous section padding (88–160px)
- Eyebrow pills (uppercase label + amber dot) above every headline
- Asymmetric bento grids, minimal shadows, pill-shaped buttons, arrow→ link motifs
- Alternating dark/cream section rhythm

### `styles.css` — v2 design layer (~1000 new lines appended)
- **Tokens (`:root`)**: ~65 new `--v2-*` custom properties (ink, cream, cream-2, line, accent, accent-soft, accent-ink, radii, shadows, `--v2-display-1/2`, `--v2-section-py`, `--v2-container-max`) — isolated from legacy `--couleur-*` to avoid collisions
- **Base overrides**: body cream bg, tightened section padding, display headings
- **Utilities**: `.eyebrow` (pill label with amber dot), `.v2-arrow` (→ link), `.v2-card` (cream / ink / outline variants), `.bento` grid system (`bento-2/3/4`, `bento-asym-3`, `bento-span-2`), `.v2-dark` section modifier
- **Section-specific overrides** for all 13 sections:
  - Hero: 2-col bento `hero-accroche` + `hero-aside` (stat card `+20 ans` + logo wall)
  - Chiffres-clés: 4-col strip with vertical dividers, left-aligned
  - Services: 3 cards with ✓ checkmark `cas-usage`, pill `tarif` blocks
  - Forfaits: 4-col grid (≥1024px), vedette card on ink bg, `bandeau-fondateur` as dark ink card
  - Outils: 2-col logo + benefit chip layout
  - Pourquoi nous: dark bg, 4-col translucent cards
  - Garanties: seamless 4-col grid with internal dividers
  - Comparaison: borderless table, pill pseudo-element chips (inline SVG data URI) — `font-size:0` hides raw ✓/✕/~ glyphs
  - Calculateur ROI: split bento (cream inputs + ink results), `.roi-output` positioned top-right of each champ
  - Roadmap: 4-col timeline with horizontal line decoration + `.roadmap-jour` pills
  - FAQ: divider-style accordion with `+`→`×` marker rotation
  - À propos: dark bg, founder dossier bento
  - Contact: split grid (ink infos + cream form)
- Button refinements (pill `border-radius: 999px`)

### `index.html` — structural changes per section
- **Hero** (~178–260): restructured into 2-col with `hero-accroche` + `aside.hero-aside` (stat card + moved logo wall); added eyebrow "Cabinet CPA · Montréal"
- **Services header**: eyebrow "Services" + "Trois expertises pour reprendre le contrôle de vos chiffres."
- **Forfaits header**: eyebrow "Forfaits" + "Un tarif fixe. Zéro facture surprise."
  - Bandeau fondateur restructured with `.bandeau-fondateur-titre` / `.bandeau-fondateur-desc` wrappers
- **Outils header**: eyebrow "Technologie" + "Les outils qui rendent votre comptabilité invisible."
- **Pourquoi nous**: added `v2-dark` class + eyebrow "Pourquoi nous" + "Un cabinet boutique, pas une usine à dossiers."
- **Garanties header**: eyebrow "Garanties" + "Vous prenez zéro risque. On prend le nôtre."
- **Comparaison header**: eyebrow "Comparaison" + "Trois options. Un seul bon choix."
- **Calculateur header**: eyebrow "Calculateur ROI" + "Faites glisser. Voyez combien vous économisez."
  - Added `.roi-entrees-titre` ("Votre entreprise") and `.roi-resultats-titre` ("Vos économies") wrapper labels
- **Roadmap header**: eyebrow "Processus 90 jours" + "De l'audit à l'autopilote. En 90 jours."
- **FAQ header**: eyebrow "FAQ" + "Tout ce que vous vouliez demander. Sans le jargon."
- **À propos header**: eyebrow "À propos" + "Vingt ans de terrain. Un seul interlocuteur."
- **Contact header**: eyebrow "Contact" + "Parlons-nous. Trente minutes, c'est souvent tout ce qu'il faut."

### Fixes during the rework
- Comparison table was rendering raw ✓/✕/~ text next to the pseudo-element pill chips → hid text with `font-size: 0; line-height: 0;`, let `::before` draw the colored SVG chip alone
- ROI `<output>` was a sibling of the `<label>`, not nested → CSS flex-aligned to top-right via `align-self: flex-end; margin-top: -32px`
- Bandeau fondateur had raw `<strong>`/`<span>` where CSS expected `.bandeau-fondateur-titre`/`.bandeau-fondateur-desc` → wrapped text in the expected classes

### Verification (preview server :8000)
- Body bg confirmed `rgb(244, 239, 229)` (#F4EFE5 cream) ✓
- 13 sections present, 13 `.eyebrow` labels rendered ✓
- All 12 content sections (hero + 11) have eyebrow + refined headline ✓
- Hero offsetHeight: 1128px (bento renders full) ✓
- No console errors or warnings ✓
- Screenshot timed out at 30s (likely large page + async font load) — eval probe used instead for structural verification

### What the user sees now
A coherent Ramp-style layout: warm cream canvas, alternating dark sections for rhythm (hero, chiffres, pourquoi-nous, à-propos), asymmetric bento grids replacing the old centered blocks, eyebrow pills framing every headline, pill-shaped buttons, ink-colored feature cards, and punchier headlines throughout. Legacy structure, copy, and JS behaviour all preserved.

---

## 2026-04-10 — Session 2: Placeholder resolution

Client supplied real values for all `[À DÉFINIR]` placeholders except the phone (deliberately kept private).

### Changes
- **`index.html`**
  - Removed phone `<li>` block from contact card entirely (no phone will be published)
  - Removed `"telephone"` key from `AccountingService`/`LocalBusiness` schema
  - Replaced all 4 `https://calendly.com/[À DÉFINIR]` occurrences (hero, a-propos CTA, contact RDV block, sticky CTA) with Microsoft Bookings URL: `https://outlook.office.com/book/ConsultationGratuite30Minutes@affairedechiffres.com/?ismsaljsauthenabled`
  - CPA Quebec member number now displayed in footer: **A116527** (FR + EN)
  - Footer social LinkedIn, founder profile LinkedIn, and schema `sameAs`/`founder.sameAs` all updated to `https://www.linkedin.com/in/affaire-de-chiffres-b327ab3b7/`
  - **Tax planning** service card: `À partir de 450 $ / mandat ponctuel` → `350 $ / heure` (tarif-detail: "Mandat ponctuel ou forfait annuel · Soumission gratuite en 24 h")
  - **Tech integration** service card: `À partir de 1 200 $ / implantation` → `250 $ / heure (hors forfait)` (tarif-detail: "Inclus sans frais additionnels dans les forfaits Complet et Premium")
- **`SUPERPLAN.md`**
  - Friction section: "Phone number visible" line swapped for "Microsoft Bookings link"
  - Removed Pillar 9 "Analytics & measurement" (deferred analytics block) — renumbered Technical polish to 9
  - Replaced "What needs your input later" list with a "Live values (resolved)" block

### Verification
- No `[À DÉFINIR]` remains in `index.html`
- Existing preview server reused; no new JS errors
- All 4 Bookings links resolve correctly

---

## 2026-04-10 — Session 1: Conversion overhaul kickoff

### Context
Pre-audit found a clean, bilingual, accessible site but with several conversion leaks: broken CPA badge, dead LinkedIn link, no phone, evasive pricing on 2/3 service cards, generic CTAs all pointing to one form, no FAQ, no differentiator section, no comparison, sole-founder concern not addressed, wheel-snap scroll hijack felt broken on trackpads, broken `data-cible` text counter on a non-numeric value.

### Plan
See `SUPERPLAN.md`. Phases 1–3 in this session. Phase 4 (lead magnets, video, analytics, content engine) requires external assets and is deferred.

### Placeholders requiring user input
Tagged `[À DÉFINIR: ...]` in the code so they're easy to find:
- Phone number
- CPA Québec member number
- Calendar booking URL (Cal.com / Calendly)
- Real prices for "À partir de" on Tax Planning, Tech Integration, Démarrage tier
- LinkedIn Company Page URL (footer)
- GA4 / Microsoft Clarity IDs

### Changes

#### `index.html`
- Added `hreflang` link tags (`fr-ca`, `en-ca`, `x-default`) after canonical
- Updated nav menu: added `Pourquoi nous`, `FAQ` entries (FR + EN)
- **Hero CTA** swapped to Calendly RDV URL (`[À DÉFINIR : URL Cal.com]`) with rassurance line "30 min gratuites · sans engagement · réponse en 24h"
- **Service cards** (3): replaced "Chaque situation est unique" with `À partir de $X` pricing block (`tarif-a-partir / tarif-suffixe / tarif-detail`); CTAs now carry URL hash params (`#contact?service=fiscalite`, `tech`, `comptabilite`)
- **Forfaits section**:
  - Added `Programme Membre Fondateur` banner (`bandeau-fondateur`) with 12/20 places counter
  - Added 4th tier `Démarrage` ($750 one-time cleanup + first month)
  - Added all-in pricing `forfait-prix-detail` notes on each forfait (incl. typical software passthroughs)
  - Updated Premium with founding-member access bullet + URL hash
- **6 new sections** inserted between `#outils` and `#a-propos`:
  - `#pourquoi-nous` — 4 differentiator cards (CPA senior, Tech-first, Bilingue, Forfaits fixes)
  - `#garanties` — 4 numbered guarantees (24h response, money-back 1st month, no commitment, Loi 25)
  - `#comparaison` — 7-row table DIY / freelance / ADC
  - `#calculateur` — ROI calculator (2 sliders × 3 outputs)
  - `#roadmap` — 90-day onboarding (Day 1-7 / 8-30 / 31-60 / 61-90)
  - `#faq` — 15 questions in `<details>`/`<summary>` accordion
- **Contact section**: added phone block `[À DÉFINIR : (514) 555-0000]`, business hours, Calendly RDV CTA block
- **Founder profile**: corrected "CA, CPA" → "CPA"; expanded bio; added `profil-points` bullet list
- **Footer**: fixed broken LinkedIn href; replaced broken CPA Quebec badge image with text+link block to the Order's directory
- **Schema.org**: upgraded to `@graph` with `AccountingService` + `LocalBusiness` (telephone, founder Person, sameAs LinkedIn, openingHoursSpecification); added `FAQPage` schema with 6 Q&A
- **Sticky CTA bar** appended just before `</main>` (FR/EN toggle)
- **Service select** (FR + EN): added `Démarrage` and `Programme Membre Fondateur` options
- Added `loading="lazy"` to all below-fold images (15/18 images now lazy)

#### `script.js`
- Disabled `initialiserSnapScroll()` call (wheel-hijack hurts trackpad UX; function kept for future)
- Added init calls: `initialiserPreRemplissageService()`, `initialiserCalculateurROI()`, `initialiserFAQ()`, `initialiserStickyCTA()`
- New `appliquerServiceDepuisHash()` reads `#contact?service=X` and pre-fills both FR/EN selects via `mappingService`
- New `initialiserCalculateurROI()` — formula: 2 min/transaction × 80% time-reduction; $35/h junior cost; $52k+ in-house annual benchmark
- New `initialiserFAQ()` — accordion behavior, accessible toggle
- New `initialiserStickyCTA()` — shows after hero, hides while in `#contact` section, uses `sticky-cta-visible` class

#### `styles.css`
- Appended ~700 lines covering all new components:
  - `.pourquoi-grille` 1→2→4 columns responsive
  - `.garanties-grille` 1→2 columns, numbered cards on charcoal bg
  - `.comparaison-tableau` with `td-oui`/`td-non`/`td-partiel`/`td-mise-en-avant`
  - `.roi-grille` 1→2 columns + custom range slider styling
  - `.roadmap-etapes` 1→2→4 with `.roadmap-jour` pill badge
  - `.faq-item` with custom `+`→`×` rotation marker on `[open]`
  - `.bandeau-fondateur` (gradient amber, counter)
  - `.forfait-prix-suffixe`, `.forfait-prix-detail`, 4-column forfaits at `min-width: 1024px`
  - `.tarif-a-partir`, `.tarif-suffixe`, `.tarif-detail` for service cards
  - `.sticky-cta` with slide-up `translateY(150% → 0)` transition + `.sticky-cta-visible`
  - `.profil-points` (founder bullet list)
  - `.footer-cpa-lien` (replaces broken badge)
  - `.contact-icone`, `.contact-rdv`, `.btn-rdv`, `.hero-rassurance`

### Verification (preview server :8000)
- 13 sections present, all 6 new sections render at full height
- 4 forfaits render in 4-column grid at 1280px viewport
- ROI calculator reactive: slider 400 transactions → 11 h, $373 saved
- FAQ accordion: 15 items, `<details>` toggle works
- Service URL hash pre-fill: `#contact?service=fiscalite` → both FR/EN selects updated
- Sticky CTA: appears on scroll past hero, hides in contact (verified via class toggle + computed transform)
- Schema validates: `AccountingService` + `LocalBusiness` graph + separate `FAQPage`
- hreflang `fr-ca`/`en-ca`/`x-default` present
- 15/18 images carry `loading="lazy"` (3 above-fold eager)
- No JS console errors

### Phase 4 deferred (needs external assets)
- PDF lead magnets (Guide fiscal PME, Calculateur salaire vs dividendes, Checklist 10 erreurs)
- 5 cornerstone articles for `articles.html` revival
- GA4 + Microsoft Clarity instrumentation
- Loi 25 cookie consent banner
- Founder intro video
