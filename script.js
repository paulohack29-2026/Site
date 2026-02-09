document.addEventListener("DOMContentLoaded", () => {

    /* Menu mobile */
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("nav ul");

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    /* Animações ao rolar */
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));
});
