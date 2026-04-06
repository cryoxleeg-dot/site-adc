/* ============================================
   SCRIPT PRINCIPAL — Affaire de Chiffres
   ============================================
   Ce fichier gère :
   1. La bascule bilingue FR / EN
   2. Le menu hamburger mobile
   3. L'ombre de la navigation au scroll
   4. La mise en évidence du lien de la section visible
   5. L'accessibilité (focus trap, aria-labels)
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
    fr: 'Affaire de Chiffres | CPA Montréal — Fiscalité, Audit, Comptabilité',
    en: 'Affaire de Chiffres | CPA Montréal — Tax Planning, Audit, Bookkeeping'
  };

  // Meta descriptions selon la langue
  var metaDescriptions = {
    fr: 'Cabinet CPA à Montréal offrant des services de planification fiscale, audit et certification, intégration technologique et tenue de livres pour particuliers, travailleurs autonomes et PME. Fondé en 2017.',
    en: 'Montréal-based CPA firm offering tax planning, audit and assurance, technology integration and bookkeeping services for individuals, self-employed workers and SMBs. Founded in 2017.'
  };

  // Meta keywords selon la langue
  var metaKeywords = {
    fr: 'CPA Montréal, comptable Montréal, fiscalité, audit, tenue de livres, planification fiscale, intégration technologique, cabinet comptable Montérégie, Affaire de Chiffres',
    en: 'CPA Montreal, accountant Montreal, tax planning, audit, bookkeeping, technology integration, accounting firm, Affaire de Chiffres'
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
    fr: { accueil: 'Accueil', services: 'Services', 'a-propos': 'À propos', contact: 'Contact' },
    en: { accueil: 'Home', services: 'Services', 'a-propos': 'About', contact: 'Contact' }
  };

  // Aria-labels des liens de navigation selon la langue
  var ariaLabels = {
    fr: { '#accueil': 'Accueil', '#services': 'Services', '#a-propos': 'À propos', '#contact': 'Contact' },
    en: { '#accueil': 'Home', '#services': 'Services', '#a-propos': 'About', '#contact': 'Contact' }
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
   * Applique la langue choisie à toute la page.
   * @param {string} langue — 'fr' ou 'en'
   */
  function appliquerLangue(langue) {
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

  /**
   * Ouvre ou ferme le menu mobile.
   */
  function toggleMenu() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    var estOuvert = hamburger.classList.toggle('ouvert');

    // Ajouter/retirer la classe qui affiche le menu
    navLinks.classList.toggle('menu-ouvert', estOuvert);

    // Mettre à jour aria-expanded
    hamburger.setAttribute('aria-expanded', estOuvert ? 'true' : 'false');

    // Mettre à jour le aria-label selon l'état et la langue
    var etat = estOuvert ? 'ouvert' : 'ferme';
    hamburger.setAttribute('aria-label', ariaHamburger[langueActive][etat]);

    // Empêcher le scroll du body quand le menu est ouvert
    document.body.style.overflow = estOuvert ? 'hidden' : '';

    // Si le menu vient de s'ouvrir, placer le focus sur le premier lien
    if (estOuvert) {
      var premierLien = navLinks.querySelector('a');
      if (premierLien) premierLien.focus();
    }
  }

  /**
   * Ferme le menu mobile (si ouvert).
   */
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

  /**
   * Piège le focus à l'intérieur du menu mobile quand il est ouvert.
   * Quand on appuie Tab sur le dernier élément, le focus revient au premier (et inversement avec Shift+Tab).
   */
  function gererFocusTrap(event) {
    var hamburger = document.getElementById('hamburger');
    if (!hamburger.classList.contains('ouvert')) return;

    // Éléments focusables dans le menu et la zone nav
    var navLinks = document.getElementById('nav-links');
    var focusables = navLinks.querySelectorAll('a');
    if (focusables.length === 0) return;

    var premier = focusables[0];
    var dernier = focusables[focusables.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift+Tab sur le premier → aller au hamburger
        if (document.activeElement === premier) {
          event.preventDefault();
          hamburger.focus();
        }
      } else {
        // Tab sur le dernier lien → aller au hamburger
        if (document.activeElement === dernier) {
          event.preventDefault();
          hamburger.focus();
        }
        // Tab sur le hamburger → aller au premier lien
        if (document.activeElement === hamburger) {
          event.preventDefault();
          premier.focus();
        }
      }
    }

    // Échap ferme le menu
    if (event.key === 'Escape') {
      fermerMenu();
      hamburger.focus();
    }
  }

  /* ------------------------------------------
     3. OMBRE DE LA NAVIGATION AU SCROLL
     ------------------------------------------ */

  /**
   * Ajoute ou retire la classe .nav-scrolled selon la position de scroll.
   */
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

  /**
   * Observe les sections et met en évidence le lien correspondant
   * à la section actuellement visible dans le viewport.
   */
  function initialiserObserverSections() {
    var sections = document.querySelectorAll('.section');
    var liensNav = document.querySelectorAll('.nav-links a');

    // Options de l'observer : on déclenche quand 40% de la section est visible
    var options = {
      root: null,
      rootMargin: '-' + getComputedStyle(document.documentElement).getPropertyValue('--hauteur-nav').trim() + ' 0px 0px 0px',
      threshold: 0.4
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idSection = entry.target.getAttribute('id');

          // Retirer la classe active et aria-current de tous les liens
          liensNav.forEach(function (lien) {
            lien.classList.remove('nav-lien-actif');
            lien.removeAttribute('aria-current');
          });

          // Ajouter la classe active au lien correspondant
          var lienActif = document.querySelector('.nav-links a[href="#' + idSection + '"]');
          if (lienActif) {
            lienActif.classList.add('nav-lien-actif');
            lienActif.setAttribute('aria-current', 'page');
          }
        }
      });
    }, options);

    // Observer chaque section
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

    // --- Langue ---
    var langueInitiale = getLangueSauvegardee();
    appliquerLangue(langueInitiale);

    // Boutons FR / EN
    document.getElementById('btn-fr').addEventListener('click', function () {
      appliquerLangue('fr');
    });
    document.getElementById('btn-en').addEventListener('click', function () {
      appliquerLangue('en');
    });

    // --- Menu hamburger ---
    var hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', toggleMenu);

    // Fermer le menu quand on clique sur un lien de navigation
    var liensNav = document.querySelectorAll('.nav-links a');
    liensNav.forEach(function (lien) {
      lien.addEventListener('click', function () {
        fermerMenu();
      });
    });

    // Focus trap pour le menu mobile
    document.addEventListener('keydown', gererFocusTrap);

    // --- Ombre au scroll ---
    window.addEventListener('scroll', gererOmbreNav, { passive: true });
    // Vérifier l'état initial (au cas où la page est déjà scrollée)
    gererOmbreNav();

    // --- Observer les sections pour le lien actif ---
    initialiserObserverSections();

    // --- Animations scroll reveal (Intersection Observer) ---
    initialiserScrollReveal();

    // --- Modale : politique de confidentialité ---
    initialiserModale();

    // --- Soumission AJAX du formulaire de contact ---
    initialiserFormulaire();
  });

  /* ------------------------------------------
     6. ANIMATIONS AU DÉFILEMENT (Scroll Reveal)
     ------------------------------------------ */

  /**
   * Observe les éléments .scroll-reveal et leur ajoute la classe .visible
   * quand ils entrent dans le viewport. Respecte prefers-reduced-motion.
   */
  function initialiserScrollReveal() {
    // Si l'utilisateur préfère réduire les animations, tout rendre visible immédiatement
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
     7. FORMULAIRE DE CONTACT — Soumission AJAX
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

  // Regex pour valider le format courriel
  var regexCourriel = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /**
   * Affiche ou efface une erreur inline sur un champ.
   * @param {HTMLElement} champ — l'input
   * @param {string} idErreur — l'id du span d'erreur
   * @param {string|null} message — le message d'erreur, ou null pour effacer
   */
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

  /**
   * Valide le champ nom. Retourne true si valide.
   */
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

  /**
   * Valide le champ courriel. Retourne true si valide.
   */
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

    // Validation en temps réel au blur (quand l'utilisateur quitte le champ)
    champNom.addEventListener('blur', validerNom);
    champCourriel.addEventListener('blur', validerCourriel);

    // Effacer l'erreur dès que l'utilisateur corrige
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

      // Valider avant envoi
      var nomValide = validerNom();
      var courrielValide = validerCourriel();

      if (!nomValide || !courrielValide) {
        msgDiv.textContent = msgs.validation;
        msgDiv.className = 'form-message form-message-erreur';
        // Focus sur le premier champ en erreur
        if (!nomValide) champNom.focus();
        else champCourriel.focus();
        return;
      }

      // Afficher état d'envoi
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
          // Effacer les erreurs inline après reset
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
     8. MODALE — Politique de confidentialité
     ------------------------------------------ */

  /**
   * Gère l'ouverture et la fermeture de la modale.
   * Tous les liens avec l'attribut data-ouvrir-politique ouvrent la modale.
   */
  function initialiserModale() {
    var modale = document.getElementById('modale-politique');
    var btnFermer = document.getElementById('modale-fermer');

    // Ouvrir la modale au clic sur tout lien [data-ouvrir-politique]
    var liens = document.querySelectorAll('[data-ouvrir-politique]');
    liens.forEach(function (lien) {
      lien.addEventListener('click', function (e) {
        e.preventDefault();
        ouvrirModale();
      });
    });

    // Fermer au clic sur le bouton X
    btnFermer.addEventListener('click', fermerModale);

    // Fermer au clic sur l'overlay (en dehors du contenu)
    modale.addEventListener('click', function (e) {
      if (e.target === modale) {
        fermerModale();
      }
    });

    // Fermer avec Échap
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modale.classList.contains('modale-visible')) {
        fermerModale();
      }
    });
  }

  /** Ouvre la modale et piège le focus */
  function ouvrirModale() {
    var modale = document.getElementById('modale-politique');
    modale.classList.add('modale-visible');
    modale.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Placer le focus sur le bouton fermer
    document.getElementById('modale-fermer').focus();
  }

  /** Ferme la modale et restaure le scroll */
  function fermerModale() {
    var modale = document.getElementById('modale-politique');
    modale.classList.remove('modale-visible');
    modale.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

})();
