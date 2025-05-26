window.addEventListener('scroll', () => {
    let topBtn = document.getElementById('topBtn');
    if (window.scrollY > 300) {
        topBtn.style.opacity = 1;
        topBtn.style.pointerEvents = 'auto';
    } else {
        topBtn.style.opacity = 0;
        topBtn.style.pointerEvents = 'none';
    }
});

document.getElementById('topBtn').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener("click", (event) => {
    let navbar = document.querySelector(".navbar-collapse");
    let toggler = document.querySelector(".navbar-toggler");

    if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
        if (navbar.classList.contains("show")) {
        bootstrap.Collapse.getInstance(navbar).hide();
    }
}
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Smooth scroll to the target section
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 120,
            behavior: 'smooth'
        });

        // Collapse the navbar after clicking a link
        let navbar = document.querySelector(".navbar-collapse");
        bootstrap.Collapse.getInstance(navbar).hide();
    });
}
);

window.onload = function() {
    window.scrollTo(0, 0);
};