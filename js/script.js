// Hadi — Portfolio shared behaviour

(function () {
  "use strict";

  /* Nav: solid background after scroll */
  var nav = document.querySelector(".site-nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("is-open");
      document.body.style.overflow = open ? "" : "hidden";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Hero coordinate readout — cursor position mapped to a plausible
     lat/long drift around Rajshahi, as a small nod to the geospatial work. */
  var readout = document.querySelector("[data-coord-readout]");
  var heroArt = document.querySelector("[data-coord-zone]");
  if (readout && heroArt && window.matchMedia("(hover: hover)").matches) {
    var baseLat = 24.3745, baseLon = 88.6042;
    heroArt.addEventListener("mousemove", function (e) {
      var rect = heroArt.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;   // 0..1
      var y = (e.clientY - rect.top) / rect.height;   // 0..1
      var lat = (baseLat + (0.5 - y) * 0.9).toFixed(4);
      var lon = (baseLon + (x - 0.5) * 0.9).toFixed(4);
      readout.textContent = lat + "\u00B0N / " + lon + "\u00B0E";
    });
    heroArt.addEventListener("mouseleave", function () {
      readout.textContent = baseLat.toFixed(4) + "\u00B0N / " + baseLon.toFixed(4) + "\u00B0E";
    });
  }

  /* Current year in footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
