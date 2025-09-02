// Wait for DOM content to be loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });

  // Mobile menu toggle
  const burgerBtn = document.getElementById("burger-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("show");
      document.body.classList.toggle("menu-open");

      // Animate burger lines
      this.classList.toggle("active");

      // Toggle aria-expanded attribute for accessibility
      const isExpanded = this.getAttribute("aria-expanded") === "true" || false;
      this.setAttribute("aria-expanded", !isExpanded);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#" || !document.querySelector(targetId)) {
        return;
      }

      e.preventDefault();

      // Close mobile menu if open
      if (mobileMenu && mobileMenu.classList.contains("show")) {
        mobileMenu.classList.remove("show");
        burgerBtn.classList.remove("active");
      }

      // Smooth scroll to target
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Sticky header
  const header = document.querySelector("header");

  function checkScroll() {
    if (window.scrollY > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Check on load

  // Back to top button
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Hero Slider
  const heroSlider = document.getElementById("hero-slider");

  if (heroSlider) {
    const slides = heroSlider.querySelectorAll(".hero-slide");
    const dots = heroSlider.querySelectorAll(".dot");
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      slides[index].classList.add("active");
      dots[index].classList.add("active");

      currentSlide = index;
    }

    // Initialize slider dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        clearInterval(slideInterval);
        showSlide(index);
        startSlideInterval();
      });
    });

    function nextSlide() {
      let next = currentSlide + 1;
      if (next >= slides.length) {
        next = 0;
      }
      showSlide(next);
    }

    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    startSlideInterval();
  }

  // Testimonials Slider
  const testimonialSlider = document.getElementById("testimonials-slider");

  if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll(".testimonial-slide");
    const dots = testimonialSlider.querySelectorAll(".dot");
    const prevBtn = testimonialSlider.querySelector(".prev");
    const nextBtn = testimonialSlider.querySelector(".next");
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      slides[index].classList.add("active");
      dots[index].classList.add("active");

      currentSlide = index;
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        let next = currentSlide + 1;
        if (next >= slides.length) {
          next = 0;
        }
        showSlide(next);
      });
    }

    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        let prev = currentSlide - 1;
        if (prev < 0) {
          prev = slides.length - 1;
        }
        showSlide(prev);
      });
    }

    // Dots navigation
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showSlide(index);
      });
    });

    // Auto slide
    setInterval(function () {
      if (!testimonialSlider.matches(":hover")) {
        let next = currentSlide + 1;
        if (next >= slides.length) {
          next = 0;
        }
        showSlide(next);
      }
    }, 8000);
  }

  // Product filtering tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const filterableCards = document.querySelectorAll(".product-card");

  if (tabBtns.length > 0 && filterableCards.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const category = this.dataset.category;

        // Update active tab
        tabBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        // Filter products
        filterableCards.forEach((card) => {
          if (category === "all" || card.dataset.category === category) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(10px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Video play button
  const playBtn = document.querySelector(".play-btn");

  if (playBtn) {
    playBtn.addEventListener("click", function () {
      const videoWrapper = this.closest(".video-wrapper");
      const thumbnail = videoWrapper.querySelector(".video-thumbnail");

      // Replace thumbnail with iframe
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/VIDEO_ID?autoplay=1";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.allowFullscreen = true;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";

      // Add iframe and remove thumbnail and play button
      this.remove();
      thumbnail.remove();
      videoWrapper.appendChild(iframe);
    });
  }

  // Store map pins interaction
  const mapPins = document.querySelectorAll(".map-pin");

  if (mapPins.length > 0) {
    mapPins.forEach((pin) => {
      pin.addEventListener("click", function () {
        const info = this.querySelector(".pin-info");
        if (info) {
          info.style.opacity = "1";
          info.style.visibility = "visible";

          setTimeout(() => {
            info.style.opacity = "0";
            info.style.visibility = "hidden";
          }, 3000);
        }
      });
    });
  }

  // Product hover effects
  const productItems = document.querySelectorAll(
    ".featured-card, .product-card"
  );

  if (productItems.length > 0) {
    productItems.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.classList.add("hover");
      });

      card.addEventListener("mouseleave", function () {
        this.classList.remove("hover");
      });
    });
  }

  // Form validation
  const forms = document.querySelectorAll("form");

  if (forms.length > 0) {
    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Simple validation
        let isValid = true;
        const inputs = this.querySelectorAll(
          "input[required], textarea[required]"
        );

        inputs.forEach((input) => {
          if (!input.value.trim()) {
            isValid = false;
            input.classList.add("error");
          } else {
            input.classList.remove("error");
          }
        });

        if (isValid) {
          // Success message or form submit logic would go here
          const submitBtn = this.querySelector('button[type="submit"]');
          const originalText = submitBtn.innerHTML;

          submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
          submitBtn.classList.add("success");

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove("success");
            this.reset();
          }, 2000);
        }
      });
    });
  }
});
