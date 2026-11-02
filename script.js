// Progressive enhancement: add hover-to-scroll edges to horizontally
// scrollable interest strips. Swipe, trackpad, wheel, and keyboard scrolling
// all work without this file.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const EDGE_DELAY = 140;
const EDGE_SPEED = 11;

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".interest-grid");
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  if (!track || !previous || !next) {
    return;
  }

  let frame = 0;
  let timer = 0;
  let direction = 0;

  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

  const update = () => {
    const max = maxScroll();
    const scrollable = max > 4;

    carousel.classList.toggle("is-scrollable", scrollable);
    previous.disabled = !scrollable || track.scrollLeft <= 1;
    next.disabled = !scrollable || track.scrollLeft >= max - 1;
  };

  const stop = () => {
    window.clearTimeout(timer);
    timer = 0;
    direction = 0;

    if (frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    }
  };

  const tick = () => {
    if (!direction) {
      return;
    }

    const max = maxScroll();
    const target = Math.min(max, Math.max(0, track.scrollLeft + direction * EDGE_SPEED));

    if (target === track.scrollLeft) {
      stop();
      update();
      return;
    }

    track.scrollLeft = target;
    update();
    frame = window.requestAnimationFrame(tick);
  };

  const start = (step) => {
    if (reduceMotion.matches) {
      return;
    }

    stop();
    timer = window.setTimeout(() => {
      direction = step;
      frame = window.requestAnimationFrame(tick);
    }, EDGE_DELAY);
  };

  const jump = (step) => {
    stop();
    track.scrollBy({
      left: step * track.clientWidth * 0.9,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  };

  previous.addEventListener("pointerenter", () => start(-1));
  next.addEventListener("pointerenter", () => start(1));

  for (const button of [previous, next]) {
    button.addEventListener("pointerleave", stop);
    button.addEventListener("focus", stop);
    button.addEventListener("click", () => {
      jump(button === previous ? -1 : 1);
    });
  }

  track.addEventListener("scroll", update, { passive: true });

  if ("ResizeObserver" in window) {
    new ResizeObserver(update).observe(track);
  } else {
    window.addEventListener("resize", update);
  }

  window.addEventListener("load", update);
  update();
});
