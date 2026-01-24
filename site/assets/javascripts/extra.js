document.addEventListener("DOMContentLoaded", () => {
  // Minimal parallax effect for landing page
  const backLayer = document.querySelector(".mdx-parallax__layer--back");
  const frontLayer = document.querySelector(".mdx-parallax__layer--front");
  const backImage = backLayer?.querySelector(".mdx-parallax__image");
  const frontImage = frontLayer?.querySelector(".mdx-parallax__image");
  const heroSection = document.querySelector(".mdx-parallax__group:first-child");

  if (backLayer && frontLayer && backImage && frontImage && heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const heroHeight = heroSection.offsetHeight;
      const maxScroll = window.innerHeight * 4.5; // 450vh

      if (scrolled < maxScroll) {
        // Move images within their containers to show different parts
        // Background moves down (shows upper parts)
        const bgMove = scrolled * 0.15;
        backImage.style.transform = `translateY(${bgMove}px)`;

        // Overlay moves up slower (shows lower parts)
        const overlayMove = scrolled * -0.05;
        frontImage.style.transform = `translateY(${overlayMove}px)`;

        // Fade in overlay quickly from 0.1 to 1 over first 500px of scroll
        const overlayFadeDistance = 500;
        if (scrolled < overlayFadeDistance) {
          const overlayOpacity = 0.1 + (scrolled / overlayFadeDistance) * 0.9;
          frontImage.style.opacity = overlayOpacity;
        } else {
          frontImage.style.opacity = 1;
        }

        // Fade out images when approaching content section
        const fadeStart = heroHeight - window.innerHeight;
        if (scrolled > fadeStart) {
          const fadeProgress = (scrolled - fadeStart) / window.innerHeight;
          const opacity = Math.max(0, 1 - fadeProgress);
          backLayer.style.opacity = opacity;
          frontLayer.style.opacity = opacity;

          // Add hidden class when fully faded
          if (opacity === 0) {
            backLayer.classList.add("mdx-parallax__layer--hidden");
            frontLayer.classList.add("mdx-parallax__layer--hidden");
          }
        } else {
          backLayer.style.opacity = 1;
          frontLayer.style.opacity = 1;
          backLayer.classList.remove("mdx-parallax__layer--hidden");
          frontLayer.classList.remove("mdx-parallax__layer--hidden");
        }
      }
    }, { passive: true });
  }
});
