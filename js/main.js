// MK STUDIO & Co — site scripts

document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("is-solid");
    } else {
      header.classList.remove("is-solid");
    }
  }

  if (header) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      navToggle.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
      });
    });
  }

  // Portfolio gallery filtering
  var filterButtons = document.querySelectorAll(".gallery-nav button");
  var galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var category = button.getAttribute("data-filter");

        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        button.classList.add("active");

        galleryItems.forEach(function (item) {
          var match = category === "all" || item.getAttribute("data-category") === category;
          item.style.display = match ? "" : "none";
        });
      });
    });
  }

  // Form submission (via FormSubmit — no backend required)
  function wireForm(formId, statusId, successMessage) {
    var form = document.querySelector(formId);
    var statusEl = document.querySelector(statusId);
    if (!form) return;

    function showStatus(message, type) {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.className = "form-status visible " + type;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var submitBtn = form.querySelector("button[type='submit']");
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            showStatus(successMessage, "success");
            form.reset();
          } else {
            showStatus("Something went wrong. Please email us directly at mkphotography881@gmail.com.", "error");
          }
        })
        .catch(function () {
          showStatus("Something went wrong. Please email us directly at mkphotography881@gmail.com.", "error");
        })
        .finally(function () {
          submitBtn.textContent = originalLabel;
          submitBtn.disabled = false;
        });
    });
  }

  wireForm("#contact-form", "#form-status", "Thank you — your message has been sent. Mara will reply within 1–2 business days.");
  wireForm("#booking-form", "#booking-status", "Thank you — your request has been received. Mara personally confirms every booking within 24 hours.");
});
