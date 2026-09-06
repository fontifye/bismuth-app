const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
if (window.scrollY > 30) {
navbar.classList.add("scrolled");
} else {
navbar.classList.remove("scrolled");
}
});

menuBtn?.addEventListener("click", () => {
mobileMenu.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
link.addEventListener("click", () => {
mobileMenu.classList.remove("active");
});
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
link.addEventListener("click", e => {
const target = document.querySelector(link.getAttribute("href"));

```
    if (target) {
        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});
```

});

const revealObserver = new IntersectionObserver(
entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
revealObserver.unobserve(entry.target);
}
});
},
{
threshold: 0.12
}
);

document.querySelectorAll(".reveal").forEach(element => {
revealObserver.observe(element);
});

document.querySelectorAll(".download-card").forEach(card => {
card.addEventListener("click", () => {
card.style.transform = "scale(.985)";

```
    setTimeout(() => {
        card.style.transform = "";
    }, 120);
});
```

});

document.addEventListener("keydown", e => {
if (e.key === "Escape") {
mobileMenu?.classList.remove("active");
}
});
