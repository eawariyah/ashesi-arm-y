document.addEventListener("DOMContentLoaded", () => {
  const satellite = document.querySelector(".satellite");
  let isActive = false;

  satellite.addEventListener("click", () => {
    isActive = !isActive;
    satellite.classList.toggle("active", isActive);
  });

  window.addEventListener("scroll", () => {
    if (!isActive) return;

    const scrollProgress =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);

    const scaling = 1 + scrollProgress;

    satellite.style.transform = `perspective(1000px) translate(${
      -scrollProgress * 30
    }px, ${scrollProgress * 30}px) scale(${scaling})`;
  });

  window.addEventListener("mousemove", (event) => {
    if (!isActive) return;

    const xPosition = event.clientX - window.innerWidth / 2;
    const yPosition = event.clientY - window.innerHeight / 2;

    const scaling =
      yPosition < 0
        ? 1 - Math.abs(yPosition) / (window.innerHeight / 2)
        : 1 + yPosition / (window.innerHeight / 2);

    const transformLimit = 100; // Adjust the limit as per your preference
    const xTransform = Math.min(
      Math.max(xPosition * 0.1, -transformLimit),
      transformLimit
    );
    const yTransform = Math.min(
      Math.max(yPosition * 0.1, -transformLimit),
      transformLimit
    );

    // Check if mouse position is within the desired range
    const xMaxRange = window.innerWidth * 0.4; // Adjust the range as per your preference
    const yMaxRange = window.innerHeight * 0.4; // Adjust the range as per your preference
    if (Math.abs(xPosition) > xMaxRange || Math.abs(yPosition) > yMaxRange) {
      return;
    }

    satellite.style.transform = `perspective(1000px) translate3d(${xTransform}px, ${yTransform}px, 0) scale(${scaling})`;
  });

  window.addEventListener("mouseleave", () => {
    if (!isActive) return;

    satellite.style.transform = "";
  });
});
