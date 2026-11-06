// Progressive enhancement: hover-revealed carousel scrollbars, sticky header
// state, active section nav, scroll reveal, pointer spotlight, and the email
// card's copy and mail-app handoff. Content, navigation, and manual carousel
// scrolling all work without this file.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const hoverPointer = window.matchMedia("(hover: hover)");
const HEADER_THRESHOLD = 24;
const REVEAL_TARGETS =
  ".section-heading, .project, .timeline-item, .interest-group, .contact-link-card";

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".interest-grid");

  if (!track) {
    return;
  }

  let drag = null;

  // A hairline scrollbar under the row, sized from the scroll position. It is
  // built here rather than in the markup, so a page without this file never
  // shows a control that cannot move.
  const scrollbar = document.createElement("div");
  const thumb = document.createElement("div");

  scrollbar.className = "carousel-scrollbar";
  scrollbar.setAttribute("aria-hidden", "true");
  thumb.className = "carousel-scrollbar-thumb";
  scrollbar.append(thumb);
  carousel.append(scrollbar);

  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

  const paintScrollbar = (max) => {
    // The bar is only faded out, so it is measurable before it is first shown.
    const length = scrollbar.clientWidth;
    const width = Math.min(
      length,
      Math.max(24, length * (track.clientWidth / track.scrollWidth))
    );

    thumb.style.width = `${width}px`;
    thumb.style.transform = `translateX(${
      (max ? track.scrollLeft / max : 0) * (length - width)
    }px)`;
  };

  const update = () => {
    const max = maxScroll();
    const scrollable = max > 4;

    carousel.classList.toggle("is-scrollable", scrollable);
    paintScrollbar(max);
  };

  const jump = (step) => {
    track.scrollBy({
      left: step * track.clientWidth * 0.9,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  };

  // Dragging the thumb mirrors a native scrollbar for mouse users. Wheel, touch,
  // and keyboard already scroll the row, so this only adds an affordance.
  const endDrag = () => {
    if (!drag) {
      return;
    }

    drag = null;
    carousel.classList.remove("is-dragging");
  };

  thumb.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    const travel = scrollbar.clientWidth - thumb.offsetWidth;
    const max = maxScroll();

    if (travel <= 0 || max <= 0) {
      return;
    }

    drag = { x: event.clientX, scroll: track.scrollLeft, scale: max / travel };
    carousel.classList.add("is-dragging");
    thumb.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  thumb.addEventListener("pointermove", (event) => {
    if (drag) {
      track.scrollLeft = drag.scroll + (event.clientX - drag.x) * drag.scale;
    }
  });

  for (const type of ["pointerup", "pointercancel"]) {
    thumb.addEventListener(type, endDrag);
  }

  // Clicking the track beside the thumb pages the row.
  scrollbar.addEventListener("pointerdown", (event) => {
    if (event.target !== scrollbar || event.button !== 0) {
      return;
    }

    const bounds = scrollbar.getBoundingClientRect();

    jump(event.clientX < bounds.left + bounds.width / 2 ? -1 : 1);
  });

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

// The email card hands off to the visitor's mail app through its mailto: link,
// so the OS routes to whichever app is registered on that machine. A browser
// with no handler registered ignores the click completely, so fall back to
// webmail compose links when nothing takes the page's focus.
const mailCard = document.querySelector(".contact-email");
const mailFallback = document.querySelector("[data-mail-fallback]");

if (mailCard && mailFallback) {
  const HANDOFF_GRACE = 1400;
  let handoff = 0;
  let mailTimer = 0;

  // An app or tab taking over the click is the only proof a handler exists.
  const markHandoff = () => {
    handoff = 1;
    window.clearTimeout(mailTimer);
  };

  mailCard.addEventListener("click", (event) => {
    if (event.target.closest(".copy-email")) {
      return;
    }

    // A webmail choice replaces the hint that led to it.
    if (event.target.closest(".mail-fallback")) {
      mailFallback.hidden = true;
      return;
    }

    handoff = 0;
    window.clearTimeout(mailTimer);
    mailTimer = window.setTimeout(() => {
      if (!handoff) {
        mailFallback.hidden = false;
      }
    }, HANDOFF_GRACE);
  });

  window.addEventListener("blur", markHandoff);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      markHandoff();
    }
  });
}
