/* ============================================
   SCRIPT PRINCIPAL — Affaire de Chiffres
   ============================================
   Ce fichier gère :
   1. La bascule bilingue FR / EN (avec transition douce)
   2. Le menu hamburger mobile
   3. L'ombre de la navigation au scroll
   4. La mise en évidence du lien de la section visible
   5. L'accessibilité (focus trap, aria-labels)
   6. Les animations au défilement (scroll reveal)
   7. Les compteurs animés (chiffres clés)
   8. Le formulaire de contact AJAX
   9. La modale politique de confidentialité
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     VARIABLES GLOBALES
     ------------------------------------------ */

  // Langue courante (sera initialisée dans init)
  var langueActive = 'fr';

  // Titres de page selon la langue
  var titresPage = {
    fr: 'Affaire de Chiffres | CPA Montréal — Fiscalité, Comptabilité',
    en: 'Affaire de Chiffres | CPA Montréal — Tax Planning, Bookkeeping'
  };

  // Meta descriptions selon la langue
  var metaDescriptions = {
    fr: 'Cabinet CPA à Montréal offrant des services de planification fiscale, intégration technologique et tenue de livres pour particuliers, travailleurs autonomes et PME. Fondé en 2017.',
    en: 'Montréal-based CPA firm offering tax planning, technology integration and bookkeeping services for individuals, self-employed workers and SMBs. Founded in 2017.'
  };

  // Meta keywords selon la langue
  var metaKeywords = {
    fr: 'CPA Montréal, comptable Montréal, fiscalité, tenue de livres, planification fiscale, intégration technologique, cabinet comptable Montérégie, Affaire de Chiffres',
    en: 'CPA Montreal, accountant Montreal, tax planning, bookkeeping, technology integration, accounting firm, Affaire de Chiffres'
  };

  // OG locales
  var ogLocales = {
    fr: 'fr_CA',
    en: 'en_CA'
  };

  // Alt text des images selon la langue
  var altTextes = {
    fr: { 'img-logo-nav': 'Logo Affaire de Chiffres', 'img-logo-hero': 'Affaire de Chiffres — Cabinet CPA' },
    en: { 'img-logo-nav': 'Affaire de Chiffres Logo', 'img-logo-hero': 'Affaire de Chiffres — CPA Firm' }
  };

  // Aria-labels des sections selon la langue
  var ariaLabelsSections = {
    fr: { accueil: 'Accueil', 'chiffres-cles': 'Chiffres clés', services: 'Services', outils: 'Outils', temoignages: 'Témoignages', 'a-propos': 'À propos', contact: 'Contact' },
    en: { accueil: 'Home', 'chiffres-cles': 'Key figures', services: 'Services', outils: 'Tools', temoignages: 'Testimonials', 'a-propos': 'About', contact: 'Contact' }
  };

  // Aria-labels des liens de navigation selon la langue
  var ariaLabels = {
    fr: { '#accueil': 'Accueil', '#services': 'Services', '#outils': 'Outils', '#a-propos': 'À propos', '#contact': 'Contact' },
    en: { '#accueil': 'Home', '#services': 'Services', '#outils': 'Tools', '#a-propos': 'About', '#contact': 'Contact' }
  };

  // Aria-labels du bouton hamburger selon la langue et l'état
  var ariaHamburger = {
    fr: { ferme: 'Ouvrir le menu', ouvert: 'Fermer le menu' },
    en: { ferme: 'Open menu', ouvert: 'Close menu' }
  };

  /* ------------------------------------------
     1. GESTION BILINGUE FR / EN
     ------------------------------------------ */

  /**
   * Applique la langue choisie à toute la page avec transition douce.
   * @param {string} langue — 'fr' ou 'en'
   * @param {boolean} avecTransition — true pour animer le changement
   */
  function appliquerLangue(langue, avecTransition) {
    var main = document.getElementById('contenu-principal');

    if (avecTransition && main) {
      main.style.opacity = '0';
      setTimeout(function () {
        effectuerChangementLangue(langue);
        main.style.opacity = '1';
      }, 200);
    } else {
      effectuerChangementLangue(langue);
    }
  }

  function effectuerChangementLangue(langue) {
    langueActive = langue;

    // Afficher/masquer les éléments data-lang
    var elements = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].getAttribute('data-lang') === langue) {
        elements[i].style.display = '';
      } else {
        elements[i].style.display = 'none';
      }
    }

    // Mettre à jour le titre de la page (onglet du navigateur)
    document.title = titresPage[langue] || titresPage.fr;

    // Mettre à jour l'attribut lang sur <html> pour l'accessibilité
    document.documentElement.lang = langue;

    // Mettre à jour les aria-labels des liens de navigation
    var liensNav = document.querySelectorAll('.nav-links a');
    var labels = ariaLabels[langue] || ariaLabels.fr;
    for (var j = 0; j < liensNav.length; j++) {
      var href = liensNav[j].getAttribute('href');
      if (labels[href]) {
        liensNav[j].setAttribute('aria-label', labels[href]);
      }
    }

    // Mettre à jour le style des boutons FR / EN
    var btnFr = document.getElementById('btn-fr');
    var btnEn = document.getElementById('btn-en');
    if (langue === 'fr') {
      btnFr.classList.add('btn-langue-active');
      btnFr.classList.remove('btn-langue-inactive');
      btnEn.classList.add('btn-langue-inactive');
      btnEn.classList.remove('btn-langue-active');
    } else {
      btnEn.classList.add('btn-langue-active');
      btnEn.classList.remove('btn-langue-inactive');
      btnFr.classList.add('btn-langue-inactive');
      btnFr.classList.remove('btn-langue-active');
    }

    // Mettre à jour le aria-label du hamburger selon la langue
    var hamburger = document.getElementById('hamburger');
    if (hamburger) {
      var estOuvert = hamburger.classList.contains('ouvert');
      var etat = estOuvert ? 'ouvert' : 'ferme';
      hamburger.setAttribute('aria-label', ariaHamburger[langue][etat]);
    }

    // Mettre à jour les balises meta SEO
    var metaDesc = document.getElementById('meta-description');
    if (metaDesc) metaDesc.setAttribute('content', metaDescriptions[langue] || metaDescriptions.fr);

    var metaKw = document.getElementById('meta-keywords');
    if (metaKw) metaKw.setAttribute('content', metaKeywords[langue] || metaKeywords.fr);

    // Mettre à jour les balises Open Graph et Twitter Card
    var ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.setAttribute('content', titresPage[langue] || titresPage.fr);

    var ogDesc = document.getElementById('og-description');
    if (ogDesc) ogDesc.setAttribute('content', metaDescriptions[langue] || metaDescriptions.fr);

    var ogLocale = document.getElementById('og-locale');
    if (ogLocale) ogLocale.setAttribute('content', ogLocales[langue] || ogLocales.fr);

    var twTitle = document.getElementById('tw-title');
    if (twTitle) twTitle.setAttribute('content', titresPage[langue] || titresPage.fr);

    var twDesc = document.getElementById('tw-description');
    if (twDesc) twDesc.setAttribute('content', metaDescriptions[langue] || metaDescriptions.fr);

    // Mettre à jour les alt text des images selon la langue
    var alts = altTextes[langue] || altTextes.fr;
    for (var id in alts) {
      var img = document.getElementById(id);
      if (img) img.setAttribute('alt', alts[id]);
    }

    // Mettre à jour les aria-label des sections
    var labelsSection = ariaLabelsSections[langue] || ariaLabelsSections.fr;
    for (var sectionId in labelsSection) {
      var section = document.getElementById(sectionId);
      if (section) section.setAttribute('aria-label', labelsSection[sectionId]);
    }

    // Mettre à jour les placeholders bilingues des champs du formulaire
    var champsPlaceholder = document.querySelectorAll('[data-placeholder-fr]');
    for (var k = 0; k < champsPlaceholder.length; k++) {
      var ph = champsPlaceholder[k].getAttribute('data-placeholder-' + langue);
      if (ph) champsPlaceholder[k].setAttribute('placeholder', ph);
    }

    // Gérer le name du select EN pour éviter les doublons à l'envoi
    var selectFr = document.getElementById('select-service-fr');
    var selectEn = document.getElementById('select-service-en');
    if (selectFr && selectEn) {
      if (langue === 'fr') {
        selectFr.setAttribute('name', 'service');
        selectEn.setAttribute('name', '');
      } else {
        selectEn.setAttribute('name', 'service');
        selectFr.setAttribute('name', '');
      }
    }

    // Sauvegarder le choix dans localStorage
    try {
      localStorage.setItem('langue-adc', langue);
    } catch (e) {
      // localStorage peut être désactivé — on ignore
    }
  }

  /**
   * Récupère la langue sauvegardée, ou retourne 'fr' par défaut.
   */
  function getLangueSauvegardee() {
    try {
      var sauvegarde = localStorage.getItem('langue-adc');
      if (sauvegarde === 'en') return 'en';
    } catch (e) {
      // localStorage indisponible
    }
    return 'fr';
  }

  /* ------------------------------------------
     2. MENU HAMBURGER MOBILE
     ------------------------------------------ */

  function toggleMenu() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    var estOuvert = hamburger.classList.toggle('ouvert');

    navLinks.classList.toggle('menu-ouvert', estOuvert);
    hamburger.setAttribute('aria-expanded', estOuvert ? 'true' : 'false');

    var etat = estOuvert ? 'ouvert' : 'ferme';
    hamburger.setAttribute('aria-label', ariaHamburger[langueActive][etat]);

    document.body.style.overflow = estOuvert ? 'hidden' : '';

    if (estOuvert) {
      var premierLien = navLinks.querySelector('a');
      if (premierLien) premierLien.focus();
    }
  }

  function fermerMenu() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    if (hamburger.classList.contains('ouvert')) {
      hamburger.classList.remove('ouvert');
      navLinks.classList.remove('menu-ouvert');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', ariaHamburger[langueActive].ferme);
      document.body.style.overflow = '';
    }
  }

  function gererFocusTrap(event) {
    var hamburger = document.getElementById('hamburger');
    if (!hamburger.classList.contains('ouvert')) return;

    var navLinks = document.getElementById('nav-links');
    var focusables = navLinks.querySelectorAll('a');
    if (focusables.length === 0) return;

    var premier = focusables[0];
    var dernier = focusables[focusables.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === premier) {
          event.preventDefault();
          hamburger.focus();
        }
      } else {
        if (document.activeElement === dernier) {
          event.preventDefault();
          hamburger.focus();
        }
        if (document.activeElement === hamburger) {
          event.preventDefault();
          premier.focus();
        }
      }
    }

    if (event.key === 'Escape') {
      fermerMenu();
      hamburger.focus();
    }
  }

  /* ------------------------------------------
     3. OMBRE DE LA NAVIGATION AU SCROLL
     ------------------------------------------ */

  function gererOmbreNav() {
    var header = document.getElementById('nav-header');
    if (window.scrollY > 50) {
      header.classList.add('nav-scrolled');
    } else {
      header.classList.remove('nav-scrolled');
    }
  }

  /* ------------------------------------------
     4. LIEN DE NAVIGATION ACTIF (Intersection Observer)
     ------------------------------------------ */

  function initialiserObserverSections() {
    var sections = document.querySelectorAll('.section');
    var liensNav = document.querySelectorAll('.nav-links a');

    var options = {
      root: null,
      rootMargin: '-' + getComputedStyle(document.documentElement).getPropertyValue('--hauteur-nav').trim() + ' 0px 0px 0px',
      threshold: 0.4
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idSection = entry.target.getAttribute('id');

          liensNav.forEach(function (lien) {
            lien.classList.remove('nav-lien-actif');
            lien.removeAttribute('aria-current');
          });

          var lienActif = document.querySelector('.nav-links a[href="#' + idSection + '"]');
          if (lienActif) {
            lienActif.classList.add('nav-lien-actif');
            lienActif.setAttribute('aria-current', 'page');
          }
        }
      });
    }, options);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------
     5. INITIALISATION
     ------------------------------------------ */

  document.addEventListener('DOMContentLoaded', function () {

    // --- JS actif : activer les animations scroll-reveal ---
    document.body.classList.add('js-enabled');

    // --- Langue (sans transition au chargement initial) ---
    var langueInitiale = getLangueSauvegardee();
    appliquerLangue(langueInitiale, false);

    // Boutons FR / EN (avec transition douce)
    document.getElementById('btn-fr').addEventListener('click', function () {
      appliquerLangue('fr', true);
    });
    document.getElementById('btn-en').addEventListener('click', function () {
      appliquerLangue('en', true);
    });

    // --- Menu hamburger ---
    var hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', toggleMenu);

    var liensNav = document.querySelectorAll('.nav-links a');
    liensNav.forEach(function (lien) {
      lien.addEventListener('click', function () {
        fermerMenu();
      });
    });

    document.addEventListener('keydown', gererFocusTrap);

    // --- Ombre au scroll ---
    window.addEventListener('scroll', gererOmbreNav, { passive: true });
    gererOmbreNav();

    // --- Observer les sections pour le lien actif ---
    initialiserObserverSections();

    // --- Animations scroll reveal ---
    initialiserScrollReveal();

    // --- Compteurs animés ---
    initialiserCompteurs();

    // --- Modale : politique de confidentialité ---
    initialiserModale();

    // --- Soumission AJAX du formulaire de contact ---
    initialiserFormulaire();
  });

  /* ------------------------------------------
     6. ANIMATIONS AU DÉFILEMENT (Scroll Reveal)
     ------------------------------------------ */

  function initialiserScrollReveal() {
    var prefereReduction = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefereReduction) return;

    var elements = document.querySelectorAll('.scroll-reveal');
    if (elements.length === 0) return;

    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------
     7. COMPTEURS ANIMÉS (Chiffres clés)
     ------------------------------------------ */

  function initialiserCompteurs() {
    var prefereReduction = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var compteurs = document.querySelectorAll('.chiffre-valeur[data-cible]');
    if (compteurs.length === 0) return;

    if (prefereReduction) {
      // Afficher les valeurs finales immédiatement
      compteurs.forEach(function (el) {
        var cible = parseInt(el.getAttribute('data-cible'), 10);
        var suffixe = el.getAttribute('data-suffixe') || '';
        var prefixeAttr = el.getAttribute('data-prefixe') || '';
        el.textContent = prefixeAttr + cible + suffixe;
      });
      return;
    }

    var animes = new Set();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animes.has(entry.target)) {
          animes.add(entry.target);
          animerCompteur(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    compteurs.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animerCompteur(element) {
    var cible = parseInt(element.getAttribute('data-cible'), 10);
    var suffixe = element.getAttribute('data-suffixe') || '';
    var prefixeAttr = element.getAttribute('data-prefixe') || '';
    var duree = 1500; // ms
    var debut = null;

    // Pour les grands nombres (ex: 2017), on démarre de plus près
    var depart = cible > 100 ? cible - 30 : 0;

    function step(timestamp) {
      if (!debut) debut = timestamp;
      var progression = Math.min((timestamp - debut) / duree, 1);
      // Easing: ease-out quad
      var eased = 1 - (1 - progression) * (1 - progression);
      var valeur = Math.round(depart + (cible - depart) * eased);
      element.textContent = prefixeAttr + valeur + suffixe;

      if (progression < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ------------------------------------------
     8. FORMULAIRE DE CONTACT — Soumission AJAX
     ------------------------------------------ */

  var messagesFormulaire = {
    fr: {
      succes: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les 24 prochaines heures.',
      erreur: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous écrire directement à conseils@affairedechiffres.com.',
      envoi: 'Envoi en cours...',
      validation: 'Veuillez corriger les erreurs ci-dessus avant d\'envoyer.',
      nomVide: 'Veuillez entrer votre nom.',
      courrielVide: 'Veuillez entrer votre adresse courriel.',
      courrielInvalide: 'Veuillez entrer une adresse courriel valide (ex. : nom@domaine.com).'
    },
    en: {
      succes: 'Your message was sent successfully. We will get back to you within 24 hours.',
      erreur: 'An error occurred while sending. Please try again or email us directly at conseils@affairedechiffres.com.',
      envoi: 'Sending...',
      validation: 'Please correct the errors above before submitting.',
      nomVide: 'Please enter your name.',
      courrielVide: 'Please enter your email address.',
      courrielInvalide: 'Please enter a valid email address (e.g. name@domain.com).'
    }
  };

  var regexCourriel = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function afficherErreurChamp(champ, idErreur, message) {
    var span = document.getElementById(idErreur);
    if (message) {
      span.textContent = message;
      span.classList.add('visible');
      champ.classList.add('champ-invalide');
    } else {
      span.textContent = '';
      span.classList.remove('visible');
      champ.classList.remove('champ-invalide');
    }
  }

  function validerNom() {
    var champ = document.getElementById('champ-nom');
    var msgs = messagesFormulaire[langueActive] || messagesFormulaire.fr;
    if (champ.value.trim() === '') {
      afficherErreurChamp(champ, 'erreur-nom', msgs.nomVide);
      return false;
    }
    afficherErreurChamp(champ, 'erreur-nom', null);
    return true;
  }

  function validerCourriel() {
    var champ = document.getElementById('champ-courriel');
    var msgs = messagesFormulaire[langueActive] || messagesFormulaire.fr;
    var valeur = champ.value.trim();
    if (valeur === '') {
      afficherErreurChamp(champ, 'erreur-courriel', msgs.courrielVide);
      return false;
    }
    if (!regexCourriel.test(valeur)) {
      afficherErreurChamp(champ, 'erreur-courriel', msgs.courrielInvalide);
      return false;
    }
    afficherErreurChamp(champ, 'erreur-courriel', null);
    return true;
  }

  function initialiserFormulaire() {
    var formulaire = document.getElementById('formulaire-contact');
    if (!formulaire) return;

    var champNom = document.getElementById('champ-nom');
    var champCourriel = document.getElementById('champ-courriel');

    champNom.addEventListener('blur', validerNom);
    champCourriel.addEventListener('blur', validerCourriel);

    champNom.addEventListener('input', function () {
      if (champNom.value.trim() !== '') {
        afficherErreurChamp(champNom, 'erreur-nom', null);
      }
    });
    champCourriel.addEventListener('input', function () {
      var valeur = champCourriel.value.trim();
      if (valeur !== '' && regexCourriel.test(valeur)) {
        afficherErreurChamp(champCourriel, 'erreur-courriel', null);
      }
    });

    formulaire.addEventListener('submit', function (e) {
      e.preventDefault();

      var msgDiv = document.getElementById('form-message');
      var btnEnvoyer = formulaire.querySelector('.btn-envoyer');
      var msgs = messagesFormulaire[langueActive] || messagesFormulaire.fr;

      var nomValide = validerNom();
      var courrielValide = validerCourriel();

      if (!nomValide || !courrielValide) {
        msgDiv.textContent = msgs.validation;
        msgDiv.className = 'form-message form-message-erreur';
        if (!nomValide) champNom.focus();
        else champCourriel.focus();
        return;
      }

      msgDiv.textContent = msgs.envoi;
      msgDiv.className = 'form-message form-message-envoi';
      btnEnvoyer.disabled = true;

      var formData = new FormData(formulaire);

      fetch(formulaire.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (response) {
        if (response.ok) {
          msgDiv.textContent = msgs.succes;
          msgDiv.className = 'form-message form-message-succes';
          formulaire.reset();
          afficherErreurChamp(champNom, 'erreur-nom', null);
          afficherErreurChamp(champCourriel, 'erreur-courriel', null);
        } else {
          msgDiv.textContent = msgs.erreur;
          msgDiv.className = 'form-message form-message-erreur';
        }
        btnEnvoyer.disabled = false;
      })
      .catch(function () {
        msgDiv.textContent = msgs.erreur;
        msgDiv.className = 'form-message form-message-erreur';
        btnEnvoyer.disabled = false;
      });
    });
  }

  /* ------------------------------------------
     9. MODALE — Politique de confidentialité
     ------------------------------------------ */

  function initialiserModale() {
    var modale = document.getElementById('modale-politique');
    var btnFermer = document.getElementById('modale-fermer');

    var liens = document.querySelectorAll('[data-ouvrir-politique]');
    liens.forEach(function (lien) {
      lien.addEventListener('click', function (e) {
        e.preventDefault();
        ouvrirModale();
      });
    });

    btnFermer.addEventListener('click', fermerModale);

    modale.addEventListener('click', function (e) {
      if (e.target === modale) {
        fermerModale();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modale.classList.contains('modale-visible')) {
        fermerModale();
      }
    });
  }

  function ouvrirModale() {
    var modale = document.getElementById('modale-politique');
    modale.classList.add('modale-visible');
    modale.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('modale-fermer').focus();
  }

  function fermerModale() {
    var modale = document.getElementById('modale-politique');
    modale.classList.remove('modale-visible');
    modale.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

})();
