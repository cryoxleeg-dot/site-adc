# DEVLOG — Conversion overhaul

Build-by-build log of the SUPERPLAN execution. Newest entries on top.

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
