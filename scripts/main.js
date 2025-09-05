<<<<<<< HEAD
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

// 2) Set active nav link by URL path (desktop + mobile)
const currentPage = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("a[data-nav]").forEach((a) => {
  const linkPage = a.getAttribute("href").split("/").pop();
  if (linkPage === currentPage) {
    a.classList.add("active");
  } else {
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

// 5) Basic contact form validation (client-side)
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
=======
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
    a.classList.add("acrive");
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

// 5) Basic contact form validation (client-side)
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
>>>>>>> 84137c5 (Add website files and images)
