// scripts/main.js
// 1) Mobile drawer menu (left slide + a11y niceties)
const toggle = document.querySelector(".nav-toggle");
const drawer = document.querySelector(".drawer");
const panel = drawer?.querySelector(".drawer__panel");
const closeBtn = drawer?.querySelector(".drawer__close");

function setOpen(open) {
  if (!drawer) return;
  drawer.classList.toggle("open", open);
  if (toggle) toggle.setAttribute("aria-expanded", String(open));
  // lock body scroll when open
  document.documentElement.style.overflow = open ? "hidden" : "";
  if (open) panel?.focus();
}

if (toggle && drawer) {
  toggle.addEventListener("click", () =>
    setOpen(!drawer.classList.contains("open"))
  );
  closeBtn?.addEventListener("click", () => setOpen(false));
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) setOpen(false);
  });
  drawer.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
  // close when a nav link is chosen
  drawer
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => setOpen(false)));
}

// 2) Set active nav link by URL path
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("a[data-nav]").forEach((a)=>{
  const linkPage = a.getAttribute("href").split("/").pop();
  if(linkPage === currentPage){
    a.classList.add("active");
  }
  else{
    a.classList.remove("active"); 
  }
});

// 3) About page tabs (pills)
const tablist = document.querySelector('[role="tablist"]');
if (tablist) {
  const tabs = tablist.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');
  tabs.forEach((t, i) =>
    t.addEventListener("click", () => {
      tabs.forEach((x) => {
        x.setAttribute("aria-selected", "false");
      });
      t.setAttribute("aria-selected", "true");
      panels.forEach((p, j) => (p.hidden = i !== j));
    })
  );
}

// 4) Sermons "View More"
const more = document.querySelector("[data-more]");
if (more) {
  more.addEventListener("click", () => {
    document.querySelectorAll("[data-hidden]").forEach((el) => {
      el.removeAttribute("data-hidden");
      el.style.display = "";
    });
    more.remove();
  });
}

// 5) Basic contact form validation
const form = document.querySelector("form[novalidate]");
if (form) {
  form.addEventListener("submit", (e) => {
    const required = form.querySelectorAll("[required]");
    let ok = true;
    required.forEach((f) => {
      if (!f.value.trim()) {
        f.classList.add("error");
        ok = false;
      } else f.classList.remove("error");
    });
    if (!ok) {
      e.preventDefault();
      alert("Please fill in the required fields.");
    }
  });
}

// Navbar transparent-to-solid scroll effect
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  // Initially mark as "top"
  header.classList.add("top");

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.remove("top");
      header.classList.add("scrolled");
    } else {
      header.classList.add("top");
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // run on load
})();

/* --- Scroll to Top logic --- */
(function () {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  const SHOW_AT = 250; // px scrolled before showing the button

  const onScroll = () => {
    if (window.scrollY > SHOW_AT) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  };

  // show/hide as user scrolls
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // smooth scroll to top
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ===== Reveal-on-scroll (IntersectionObserver) ===== */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = Array.from(document.querySelectorAll('.reveal'));
  if (!items.length) return;

  // Stagger support: any parent with data-stagger will set --delay on its child .reveal elements
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const step = parseFloat(parent.getAttribute('data-stagger')) || 0.08;
    let i = 0;
    parent.querySelectorAll('.reveal').forEach(el => {
      // Only set if element didn't define its own data-delay
      if (!el.hasAttribute('data-delay')) {
        el.style.setProperty('--delay', `${(i++) * step}s`);
      }
    });
  });

  if (prefersReduced) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
      } else {
        // Re-trigger when user scrolls back (feels "dynamic")
        el.classList.remove('is-visible');
      }
    });
  }, {
    root: null,
    threshold: 0.14,
    rootMargin: '0px 0px -10% 0px'
  });

  items.forEach(el => io.observe(el));
})();

//About hero slideshow (auto-rotate + swipe + arrows)
document.addEventListener("DOMContentLoaded", () => {
  (function () {
    const root = document.querySelector(".about-slider");
    if (!root) return;

    const slides = Array.from(root.querySelectorAll(".as-slide"));
    if (slides.length <= 1) return;

    let i = 0;
    const DURATION = 2000; // ms per slide

    const dots = root.querySelectorAll(".as-dots button");

    const show = (n) => {
      i = (n + slides.length) % slides.length;

      slides.forEach((s, idx) => {
        const active = idx === i;
        s.classList.toggle("active", active);
        s.setAttribute("aria-hidden", active ? "false" : "true");
        if (dots[idx]) {
          dots[idx].setAttribute("aria-selected", active ? "true" : "false");
        }
      });
    };

    let timer = null;
    const start = () => {
      stop();
      timer = setInterval(() => show(i + 1), DURATION);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    ["pointerenter", "focusin"].forEach((ev) => root.addEventListener(ev, stop));
    ["pointerleave", "focusout"].forEach((ev) => root.addEventListener(ev, start));

    // Basic mobile swipe (left/right)
    let sx = 0, sy = 0;
    root.addEventListener("touchstart", (e) => {
      const t = e.changedTouches[0];
      sx = t.clientX;
      sy = t.clientY;
    }, { passive: true });

    root.addEventListener("touchend", (e) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        stop();
        show(i + (dx < 0 ? 1 : -1));
        start();
      }
    }, { passive: true });

    // Arrow navigation
    const prevBtn = root.querySelector(".as-prev");
    const nextBtn = root.querySelector(".as-next");
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        stop();
        show(i - 1);
        start();
      });
      nextBtn.addEventListener("click", () => {
        stop();
        show(i + 1);
        start();
      });
    }

    // Dot navigation
    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        stop();
        show(idx);
        start();
      });
    });

    // Keyboard arrows
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        stop();
        show(i + (e.key === "ArrowRight" ? 1 : -1));
        start();
      }
    });

    // Kick things off
    show(0);
    start(); // <-- start auto-rotate immediately
  })();
});