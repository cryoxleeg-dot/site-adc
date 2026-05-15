/* ============================================
   affiliate.js — Affiliate tracking (URL params + GA4 attribution)
   Captures ?ref= and UTM params, persists in localStorage,
   reports affiliate visits + booking clicks to GA4 so we can
   attribute Microsoft Bookings traffic to each affiliate.
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

  // --- 3. GA4 custom events ---

  function trackGA4(eventName, affiliate, extra) {
    if (typeof gtag !== 'function') return;
    var params = { landing_page: 'forfait-complet' };
    if (affiliate) {
      params.affiliate_ref = affiliate.ref;
      params.utm_source = affiliate.utm_source || '(direct)';
      params.utm_medium = affiliate.utm_medium || '(none)';
      params.utm_campaign = affiliate.utm_campaign || '(none)';
    }
    if (extra) {
      Object.keys(extra).forEach(function (k) { params[k] = extra[k]; });
    }
    gtag('event', eventName, params);
  }

  // --- 4. Attribute clicks on Microsoft Bookings CTAs ---
  //
  // Whenever a user clicks any link that points to our Outlook booking page,
  // fire a `booking_click` event so the affiliate ref shows up in GA4.

  function setupBookingTracking(affiliate) {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="outlook.office.com/book/"]');
      if (!link) return;
      trackGA4('booking_click', affiliate, {
        cta_label: (link.innerText || link.getAttribute('aria-label') || '').trim().slice(0, 80)
      });
    });
  }

  // --- Init ---

  document.addEventListener('DOMContentLoaded', function () {
    var affiliate = captureParams();
    setupBookingTracking(affiliate);

    // Fire affiliate_visit event on every page load (attributed or direct)
    trackGA4('affiliate_visit', affiliate);
  });

})();
