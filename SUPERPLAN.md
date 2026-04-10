# SUPERPLAN — Affaire de Chiffres

Conversion overhaul for an SME-targeted, founder-led CPA firm with no clients yet.
**No testimonials.** Authority + transparency + risk reversal replace social proof.

---

## Strategic positioning
Reframe the firm: **boutique, founder-led, 20+ years CPA experience, tech-first**.
Authority replaces social proof. Scarcity replaces popularity. Transparency replaces reviews.

**Target ICP:** Quebec SME, $250k–$5M revenue, 1–25 employees, currently using Excel + a junior bookkeeper or struggling alone with QBO.

---

## The 10 pillars

### 1. Trust without testimonials
- Real CPA Quebec badge + member number, deep-link to Order directory
- Founder dossier expansion (Luc Pilon, CPA — credentials, career highlights)
- Fix broken LinkedIn footer link, add `sameAs` to schema
- Earn + display partner badges: Xero, QuickBooks ProAdvisor, Dext Partner
- Add a "Nos garanties" block: 24h response, 1st month money-back, no contract, founding rate locked

### 2. Value clarity
- "Pourquoi nous" 4-differentiator section
- Comparison table: DIY / freelance bookkeeper / ADC
- 90-day onboarding roadmap (Day 1 → 30 → 90)
- ROI mini-calculator (hours + $ saved per month)
- Quantify Dext / KNIME benefits in concrete numbers

### 3. Pricing transparency
- Replace "Chaque situation est unique" with "À partir de $X"
- Add 4th tier "Démarrage" — one-time cleanup + first month
- Show all-in cost on each forfait (incl. typical software passthroughs)
- Programme Membre Fondateur banner — 20 places, locked rate for life

### 4. Friction reduction
- Pre-fill service select from card click (URL hash)
- Sticky CTA bar with primary booking action
- Microsoft Bookings link for 30-min free consult (hero + sticky + contact)
- Remove desktop wheel-snap scroll hijack (kills trackpad UX)
- Make consent text inline next to checkbox

### 5. Lead magnets *(deferred — needs PDF assets)*
- Guide fiscal PME Québec 2026
- Calculateur salaire vs dividendes
- Checklist 10 erreurs comptables

### 6. Content engine *(deferred — needs articles)*
- Revive articles.html with 5 cornerstone pieces, or embed LinkedIn feed
- Local SEO: Revenu Québec, T2, CO-17, TPS/TVQ, Loi 25 keywords

### 7. Differentiation & objection handling
- 15-question FAQ section + FAQ schema markup
- Address sole-founder concern head-on ("What if Luc is on vacation?")

### 8. Local/Quebec specificity
- Add `LocalBusiness` schema, sameAs (LinkedIn)
- Add hreflang fr-CA / en-CA
- Mention RQ, ARC, T2, CO-17, TPS/TVQ in body copy

### 9. Technical polish
- Lazy-load all below-fold images
- Fix Luc's credentials display ("CPA" only, not "CA, CPA")
- Add `loading="lazy"` everywhere it's missing

---

## Live values (resolved)
- **CPA Quebec member #:** A116527
- **LinkedIn:** https://www.linkedin.com/in/affaire-de-chiffres-b327ab3b7/
- **Booking URL:** https://outlook.office.com/book/ConsultationGratuite30Minutes@affairedechiffres.com/?ismsaljsauthenabled
- **Tax planning:** $350/h
- **Tech integration (standalone):** $250/h
- **Bookkeeping:** from $450/month
- **Démarrage tier:** $750 one-time
- Phone: not published (email + Bookings only)

---

## Phased rollout
- **Phase 1 (this commit):** Trust + friction fixes — credentials, LinkedIn, badge, wheel-snap, pre-fill, garanties, "À partir de"
- **Phase 2 (this commit):** Value + transparency — Pourquoi nous, comparison, roadmap, FAQ, ROI calc, fondateur banner, Démarrage tier, sticky CTA, all-in pricing
- **Phase 3 (this commit):** Technical polish — schema, hreflang, lazy-load, telephone
- **Phase 4 (deferred):** Lead magnets, content engine, analytics, video — requires assets/accounts the dev can't generate

See `DEVLOG.md` for build-by-build progress.
