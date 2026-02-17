// ===== Sidebar mobile =====
const btnMenu = document.getElementById("btnMenu");
const sidebar = document.getElementById("sidebar");
const btnCloseSidebar = document.getElementById("btnCloseSidebar");

// abre/fecha pelo botão hamburguer
btnMenu?.addEventListener("click", () => {
  sidebar?.classList.toggle("is-open");
});

// fecha no X
btnCloseSidebar?.addEventListener("click", () => {
  sidebar?.classList.remove("is-open");
});

// fecha ao clicar em qualquer link do sidebar
document.querySelectorAll(".sidebar__link").forEach((a) => {
  a.addEventListener("click", () => sidebar?.classList.remove("is-open"));
});

// opcional: fecha com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") sidebar?.classList.remove("is-open");
}

);



// ===== Active link (navbar) =====
const sections = ["inicio", "sobre", "projetos", "feedback", "contato"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navLinks = document.querySelectorAll(".nav__link");

function setActive(id) {
  navLinks.forEach((l) =>
    l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`)
  );
}

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  },
  { threshold: 0.5 }
);

sections.forEach((sec) => obs.observe(sec));

// ===== Theme toggle (claro azul -> escuro roxo) =====
const btnTheme = document.getElementById("btnTheme");
const themeIcon = document.getElementById("themeIcon");

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");

  // troca ícone (lua/sol simples)
  if (themeIcon) {
    themeIcon.innerHTML = dark
      ? `<path d="M6.76 4.84 5.34 3.42 3.92 4.84l1.42 1.42 1.42-1.42ZM12 2h-1v3h1V2Zm7.08 2.84-1.42-1.42-1.42 1.42 1.42 1.42 1.42-1.42ZM20 11v1h3v-1h-3Zm-9 9h1v3h-1v-3Zm7.66-.42 1.42 1.42 1.42-1.42-1.42-1.42-1.42 1.42ZM2 12v1h3v-1H2Zm3.34 7.08 1.42 1.42 1.42-1.42-1.42-1.42-1.42 1.42ZM12 6a6 6 0 100 12 6 6 0 000-12Z"/>`
      : `<path d="M21 14.5A7.5 7.5 0 0110.5 3a6.5 6.5 0 1010.5 11.5Z"/>`;
  }
}

const saved = localStorage.getItem("theme");
setTheme(saved === "dark");

btnTheme?.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark"));
});

// ===== To top button =====
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  if (!toTop) return;
  if (window.scrollY > 600) toTop.classList.add("show");
  else toTop.classList.remove("show");
});

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
