/* ============================================
   affiliate.js — Affiliate tracking for landing pages
   Captures URL params, persists in localStorage,
   injects hidden fields into forms for Formspree attribution.
   ============================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'adc_affiliate';
  var EXPIRY_DAYS = 90;

  // --- 1. Read / write affiliate data ---

  function getAffiliate() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      // Check expiry
      var age = (Date.now() - new Date(data.timestamp).getTime()) / 86400000;
      if (age > EXPIRY_DAYS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveAffiliate(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* quota exceeded — silent */ }
  }

  // --- 2. Capture URL params on page load ---

  function captureParams() {
    var params = new URLSearchParams(window.location.search);
    var ref = params.get('ref');
    // If no ref in URL, keep existing localStorage data
    if (!ref) return getAffiliate();

    var data = {
      ref: ref,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      timestamp: new Date().toISOString(),
      landing_url: window.location.href
    };
    saveAffiliate(data);
    return data;
  }

  // --- 3. Inject hidden fields into all forms ---

  function injectHiddenFields(affiliate) {
    if (!affiliate) return;
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
      // Avoid duplicates
      if (form.querySelector('input[name="_affiliate_ref"]')) return;

      var fields = {
        '_affiliate_ref': affiliate.ref,
        '_utm_source': affiliate.utm_source,
        '_utm_medium': affiliate.utm_medium,
        '_utm_campaign': affiliate.utm_campaign,
        '_landing_page': 'forfait-complet'
      };

      Object.keys(fields).forEach(function (name) {
        if (!fields[name]) return; // skip empty
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = fields[name];
        form.appendChild(input);
      });
    });
  }

  // --- 4. GA4 custom events ---

  function trackGA4(eventName, affiliate) {
    if (typeof gtag !== 'function') return;
    var params = { landing_page: 'forfait-complet' };
    if (affiliate) {
      params.affiliate_ref = affiliate.ref;
      params.utm_source = affiliate.utm_source || '(direct)';
      params.utm_medium = affiliate.utm_medium || '(none)';
      params.utm_campaign = affiliate.utm_campaign || '(none)';
    }
    gtag('event', eventName, params);
  }

  // --- 5. Pre-booking form: submit to Formspree then redirect to Outlook ---

  function setupPrebooking(affiliate) {
    var form = document.getElementById('form-prebooking');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(form);
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      // GA4 event
      trackGA4('booking_click', affiliate);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          trackGA4('booking_submit', affiliate);
          window.open(
            'https://outlook.office.com/book/ConsultationGratuite30Minutes@affairedechiffres.com/?ismsaljsauthenabled',
            '_blank'
          );
          form.innerHTML =
            '<p class="lp-prebooking-success">' +
            '<span data-lang="fr">Merci! La page de r\u00e9servation s\'ouvre dans un nouvel onglet.</span>' +
            '<span data-lang="en">Thank you! The booking page is opening in a new tab.</span>' +
            '</p>';
          if (typeof appliquerLangue === 'function') appliquerLangue();
        } else {
          if (btn) btn.disabled = false;
        }
      }).catch(function () {
        if (btn) btn.disabled = false;
      });
    });
  }

  // --- 6. Track contact form submissions ---

  function setupContactTracking(affiliate) {
    var form = document.getElementById('form-contact-lp');
    if (!form) return;

    form.addEventListener('submit', function () {
      trackGA4('contact_submit', affiliate);
    });
  }

  // --- Init ---

  document.addEventListener('DOMContentLoaded', function () {
    var affiliate = captureParams();
    injectHiddenFields(affiliate);
    setupPrebooking(affiliate);
    setupContactTracking(affiliate);

    // Fire affiliate_visit event on page load
    trackGA4('affiliate_visit', affiliate);
  });

})();
