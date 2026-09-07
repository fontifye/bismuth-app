const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
});

menuBtn?.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("active"));
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

let pendingDownload = null;
const tosModal = document.getElementById("tosModal");
const tosCheck = document.getElementById("tosCheck");
const tosConfirm = document.getElementById("tosConfirm");
const tosCancel = document.getElementById("tosCancel");

function openTosModal(href) {
    pendingDownload = href;
    tosCheck.checked = false;
    tosConfirm.disabled = true;
    tosModal.classList.add("active");
    tosModal.setAttribute("aria-hidden", "false");
}

function closeTosModal() {
    tosModal.classList.remove("active");
    tosModal.setAttribute("aria-hidden", "true");
    pendingDownload = null;
}

document.querySelectorAll(".download-card").forEach(card => {
    card.addEventListener("click", e => {
        e.preventDefault();
        card.style.transform = "scale(.985)";
        setTimeout(() => { card.style.transform = ""; }, 120);
        openTosModal(card.getAttribute("href"));
    });
});

tosCheck?.addEventListener("change", () => { tosConfirm.disabled = !tosCheck.checked; });
tosCancel?.addEventListener("click", closeTosModal);
tosModal?.addEventListener("click", e => { if (e.target === tosModal) closeTosModal(); });
tosConfirm?.addEventListener("click", () => {
    if (!tosCheck.checked || !pendingDownload) return;
    const a = document.createElement("a");
    a.href = pendingDownload;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
    closeTosModal();
});

document.querySelectorAll(".faq-item .faq-link").forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const wasOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(o => o.classList.remove("open"));
        if (!wasOpen) {
            item.classList.add("open");
            requestAnimationFrame(() => {
                const r = item.getBoundingClientRect();
                if (r.bottom > window.innerHeight - 16) item.scrollIntoView({ behavior: "smooth", block: "nearest" });
            });
        }
    });
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        mobileMenu?.classList.remove("active");
        if (tosModal?.classList.contains("active")) closeTosModal();
    }
});
