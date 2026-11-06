// Progressive enhancement: hover-to-scroll edges, sticky header state, active
// section nav, scroll reveal, and pointer spotlight. Content, navigation, and
// manual carousel scrolling all work without this file.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const hoverPointer = window.matchMedia("(hover: hover)");
const EDGE_DELAY = 140;
const EDGE_SPEED = 11;
const HEADER_THRESHOLD = 24;
const REVEAL_TARGETS =
  ".section-heading, .project, .timeline-item, .interest-group, .contact-link-card";

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

const header = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href")));
const scrollPadding =
  Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
let headerFrame = 0;

const updateHeader = () => {
  headerFrame = 0;
  header.classList.toggle("is-stuck", window.scrollY > HEADER_THRESHOLD);

  // A section becomes current once its top passes the gap that anchor jumps
  // leave under the sticky header. The end of the page always resolves to
  // Contact.
  const line = Math.max(header.offsetHeight, scrollPadding) + 8;
  let active = null;

  for (const section of sections) {
    if (section && section.getBoundingClientRect().top <= line) {
      active = section;
    }
  }

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    active = sections[sections.length - 1];
  }

  navLinks.forEach((link, index) => {
    if (active && sections[index] === active) {
      if (link.getAttribute("aria-current") !== "location") {
        link.setAttribute("aria-current", "location");
      }
    } else if (link.hasAttribute("aria-current")) {
      link.removeAttribute("aria-current");
    }
  });
};

const queueHeaderUpdate = () => {
  if (!headerFrame) {
    headerFrame = window.requestAnimationFrame(updateHeader);
  }
};

window.addEventListener("scroll", queueHeaderUpdate, { passive: true });
window.addEventListener("resize", queueHeaderUpdate);
window.addEventListener("load", updateHeader);
updateHeader();

const revealTargets = document.querySelectorAll(REVEAL_TARGETS);

if (!reduceMotion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );

  revealTargets.forEach((target) => {
    const siblings = [...target.parentElement.children].filter((element) =>
      element.matches(REVEAL_TARGETS)
    );

    target.style.setProperty(
      "--reveal-delay",
      `${Math.min(siblings.indexOf(target), 4) * 60}ms`
    );
    target.classList.add("reveal");
    observer.observe(target);
  });

  // Add the hook last: until the observer is observing every target, CSS must
  // not hide anything.
  document.documentElement.classList.add("js-reveal");

  // These targets were painted at full opacity before this class arrived, so
  // hide them without transitioning. Transitions come back two frames later,
  // once the hidden state has been painted.
  document.documentElement.classList.add("no-reveal-transition");

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove("no-reveal-transition");
    });
  });
}

if (hoverPointer.matches && !reduceMotion.matches) {
  document.querySelectorAll(".project, .contact-link-card").forEach((card) => {
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      card.style.setProperty("--spot-x", `${x}px`);
      card.style.setProperty("--spot-y", `${y}px`);
    };

    card.addEventListener(
      "pointermove",
      (event) => {
        const bounds = card.getBoundingClientRect();
        x = event.clientX - bounds.left;
        y = event.clientY - bounds.top;

        if (!frame) {
          frame = window.requestAnimationFrame(paint);
        }
      },
      { passive: true }
    );
  });
}

const copyEmail = document.querySelector(".copy-email");

if (copyEmail) {
  const copyStatus = document.querySelector(".copy-status");
  const idleLabel = copyEmail.textContent.trim();
  let resetTimer = 0;

  // The button is hidden until this class arrives, so it is never a dead
  // control when the script does not run.
  document.documentElement.classList.add("has-js");

  // execCommand is the only option on file:// and other non-secure origins,
  // where navigator.clipboard is unavailable.
  const legacyCopy = (value) => {
    const field = document.createElement("textarea");
    const selection = document.getSelection();
    const previous = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "-1000px";
    document.body.append(field);
    field.select();

    let copied = false;

    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }

    field.remove();

    if (previous) {
      selection.removeAllRanges();
      selection.addRange(previous);
    }

    return copied;
  };

  const copy = async () => {
    const value = copyEmail.dataset.copy;
    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(value);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      copied = legacyCopy(value);
    }

    copyEmail.textContent = copied ? "Copied" : "Try again";
    copyEmail.classList.toggle("is-copied", copied);

    if (copyStatus) {
      copyStatus.textContent = copied
        ? "Email address copied to clipboard"
        : "Could not copy the email address";
    }

    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      copyEmail.textContent = idleLabel;
      copyEmail.classList.remove("is-copied");

      if (copyStatus) {
        copyStatus.textContent = "";
      }
    }, 2000);
  };

  copyEmail.addEventListener("click", copy);
}
