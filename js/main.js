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

  // Contact form submission (via FormSubmit — no backend required)
  var contactForm = document.querySelector("#contact-form");
  var formStatus = document.querySelector("#form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var submitBtn = contactForm.querySelector("button[type='submit']");
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            showStatus("Thank you — your message has been sent. Mara will reply within 1–2 business days.", "success");
            contactForm.reset();
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

  function showStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = "form-status visible " + type;
  }
});
