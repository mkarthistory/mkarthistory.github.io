/* =========================================================
   Ke Ma — Website-Logik
   1. Sprachumschaltung (DE / EN), gespeichert im Browser
   2. Umblättern zwischen A-Seite und B-Seite
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Sprache ---------------------------------------- */
  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    try { localStorage.setItem("km-lang", lang); } catch (e) {}
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.lang === lang);
    });
    root.setAttribute("lang", lang);
  }

  document.querySelectorAll(".lang button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.dataset.lang);
    });
  });
  // aktuellen Zustand auf die Knöpfe spiegeln
  setLang(root.getAttribute("data-lang") || "de");

  /* ---- 2. Umblättern ------------------------------------- */
  // Beim Ankommen: Seite klappt auf (Markierung wurde vor dem Rendern gesetzt)
  if (root.classList.contains("is-arriving")) {
    window.setTimeout(function () {
      root.classList.remove("is-arriving");
    }, 1150);
  }

  // Klick auf die gefaltete Ecke / einen Seitenwechsel-Link
  document.querySelectorAll(".js-flip").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var target = link.getAttribute("href");
      if (!target) return;
      if (reduceMotion) return; // normale Navigation ohne Animation

      e.preventDefault();
      window.scrollTo(0, 0);
      root.classList.add("is-turning");
      try { sessionStorage.setItem("km-turned", "1"); } catch (e2) {}

      window.setTimeout(function () {
        window.location.href = target;
      }, 1000);
    });
  });
})();
