// i18n: language switcher with localStorage persistence
// Expects window.__UI_STRINGS and page-specific data to be set before this script loads
(function(){
  const SUPPORTED = ['tr','en','fr','zh','ar','ru'];
  const RTL_LANGS = ['ar'];

  // Detect initial language
  function detectLang() {
    const stored = localStorage.getItem('lang');
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || '').slice(0,2).toLowerCase();
    if (SUPPORTED.includes(browser)) return browser;
    return 'en';
  }

  let currentLang = detectLang();

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // RTL
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update lang selector
    const sel = document.getElementById('lang-select');
    if (sel) sel.value = lang;

    // Update all [data-i18n] elements
    const ui = window.__UI_STRINGS;
    if (ui && ui[lang]) {
      document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const key = el.getAttribute('data-i18n');
        const val = key.split('.').reduce(function(o,k){ return o && o[k] }, ui[lang]);
        if (val !== undefined) {
          if (el.tagName === 'INPUT') el.placeholder = val;
          else el.textContent = val;
        }
      });
    }

    // Fire custom event for page-specific handlers
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  // Initial apply
  applyLang(currentLang);

  // Expose
  window.currentLang = function() { return currentLang; };
  window.setLang = function(lang) {
    if (SUPPORTED.includes(lang)) applyLang(lang);
  };

  // Bind selector
  document.addEventListener('DOMContentLoaded', function() {
    const sel = document.getElementById('lang-select');
    if (sel) {
      sel.value = currentLang;
      sel.addEventListener('change', function(){ applyLang(this.value); });
    }
    // Re-apply after DOM ready
    applyLang(currentLang);
  });
})();
