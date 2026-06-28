document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#menu-principal");
    const menuLinks = document.querySelectorAll("#menu-principal a");
    const sections = document.querySelectorAll("main section[id]");
    const year = document.querySelector("#current-year");

    const closeMenu = () => {
        menu.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isOpen));
        menu.classList.toggle("active", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
    });

    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });

    const revealElements = document.querySelectorAll(".reveal");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("visible"));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            menuLinks.forEach((link) => {
                const target = link.getAttribute("href");
                link.classList.toggle("active", target === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach((section) => sectionObserver.observe(section));

    year.textContent = new Date().getFullYear();
});
