// Apply the preference before the stylesheet paints to avoid a theme flash.
(() => {
 const key = 'skd-portfolio-theme';
 const root = document.documentElement;
 const system = window.matchMedia('(prefers-color-scheme: dark)');
 const valid = value => value === 'dark' || value === 'light';
 let preference = null;
 let toggle;
 try {
  const stored = localStorage.getItem(key);
  if (valid(stored)) preference = stored;
 } catch { /* Keep theme switching available when browser storage is blocked. */ }
 function applyTheme() {
  const theme = preference || (system.matches ? 'dark' : 'light');
  root.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#151b17' : '#f6f5f0');
  if (toggle) {
   const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
   toggle.setAttribute('aria-label', label);
   toggle.setAttribute('title', label);
  }
 }
 applyTheme();
 system.addEventListener('change', () => { if (!preference) applyTheme(); });
 window.addEventListener('storage', event => {
  if (event.key !== key && event.key !== null) return;
  preference = valid(event.newValue) ? event.newValue : null;
  applyTheme();
 });
 document.addEventListener('DOMContentLoaded', () => {
  toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  applyTheme();
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
   preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
   applyTheme();
   try { localStorage.setItem(key, preference); } catch { /* Retain choice for this visit. */ }
  });
 });
})();
