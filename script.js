document.addEventListener("DOMContentLoaded", function () {
  // --- Skills Tabs ---
  const tabs = document.querySelectorAll(".skill-tab");
  const skillContents = document.querySelectorAll(".skill-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active-tab"));
      skillContents.forEach((c) => c.classList.remove("active-content"));
      this.classList.add("active-tab");
      document.getElementById(this.getAttribute("data-content")).classList.add("active-content");
    });
  });

  // --- Experience Tabs ---
  const expTabs = document.querySelectorAll(".exp-tab");
  const expContents = document.querySelectorAll(".exp-content");

  expTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      expTabs.forEach((t) => t.classList.remove("active-tab"));
      expContents.forEach((c) => c.classList.remove("active-content"));
      this.classList.add("active-tab");
      document.getElementById(this.getAttribute("data-content")).classList.add("active-content");
    });
  });

  // --- Intersection Observer for animations ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".timeline-content, .work-exp").forEach((el) => {
    observer.observe(el);
  });

  // --- Header Visibility on Scroll ---
  const header = document.querySelector(".header");
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.classList.remove("header-visible");
    } else {
      header.classList.add("header-visible");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // --- Work Experience Slideshows ---
  document.querySelectorAll(".work-title").forEach((title) => {
    const slides = title.querySelectorAll(".work-slide");
    if (slides.length === 0) return;

    let currentWorkSlide = 0;
    let workSlideInterval;

    const showWorkSlide = (index) => {
      slides.forEach((slide, i) => (slide.style.opacity = i === index ? 1 : 0));
    };

    const nextWorkSlide = () => {
      currentWorkSlide = (currentWorkSlide + 1) % slides.length;
      showWorkSlide(currentWorkSlide);
    };

    title.addEventListener("mouseenter", () => {
      showWorkSlide(0);
      workSlideInterval = setInterval(nextWorkSlide, 2000);
    });

    title.addEventListener("mouseleave", () => {
      clearInterval(workSlideInterval);
      slides.forEach((slide) => (slide.style.opacity = 0));
      currentWorkSlide = 0;
    });
  });

  // --- Awards Section Interactivity ---
  let awardSlideIndex = 1;
  let awardSlideshowTimeout;
  const awardSlides = document.querySelectorAll(".award-slide");
  const awardList = document.querySelector(".awards-list");

  function showAwardSlides(n) {
    if (n > awardSlides.length) awardSlideIndex = 1;
    if (n < 1) awardSlideIndex = awardSlides.length;
    awardSlides.forEach((slide) => (slide.style.display = "none"));
    if (awardSlides.length > 0) {
      awardSlides[awardSlideIndex - 1].style.display = "block";
    }
  }

  function autoAwardSlideshow() {
    awardSlideshowTimeout = setTimeout(() => {
      showAwardSlides(++awardSlideIndex);
      autoAwardSlideshow();
    }, 3000);
  }

  if (awardSlides.length > 0) {
    showAwardSlides(awardSlideIndex);
    autoAwardSlideshow();

    document.querySelector(".awards-container .prev").addEventListener("click", () => { clearTimeout(awardSlideshowTimeout); showAwardSlides(--awardSlideIndex); });
    document.querySelector(".awards-container .next").addEventListener("click", () => { clearTimeout(awardSlideshowTimeout); showAwardSlides(++awardSlideIndex); });

    awardList.addEventListener('mouseover', (e) => {
      if (e.target.tagName === 'LI' || e.target.parentElement.tagName === 'LI') {
        const targetLi = e.target.tagName === 'LI' ? e.target : e.target.parentElement;
        clearTimeout(awardSlideshowTimeout);
        const index = targetLi.getAttribute('data-slide-index');
        if (index) {
          showAwardSlides(awardSlideIndex = parseInt(index));
        }
        if (targetLi.id === 'multimedia-award') {
          targetLi.querySelector('.award-details').style.display = 'block';
        }
      }
    });

    awardList.addEventListener('mouseout', (e) => {
      if (e.target.tagName === 'LI' || e.target.parentElement.tagName === 'LI') {
        const targetLi = e.target.tagName === 'LI' ? e.target : e.target.parentElement;
        clearTimeout(awardSlideshowTimeout);
        autoAwardSlideshow();
        if (targetLi.id === 'multimedia-award') {
          targetLi.querySelector('.award-details').style.display = 'none';
        }
      }
    });
  }
});