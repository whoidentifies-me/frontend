const siteId = import.meta.env.VITE_MATOMO_SITE_ID;
const trackerUrl = "https://matomo.epicenter.works/";

export function initMatomo() {
  if (!siteId) return;

  var _paq = (window._paq = window._paq || []);
  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);
  _paq.push(["setTrackerUrl", trackerUrl + "matomo.php"]);
  _paq.push(["setSiteId", siteId]);
  var d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.async = true;
  g.src = trackerUrl + "matomo.js";
  s.parentNode!.insertBefore(g, s);
}
