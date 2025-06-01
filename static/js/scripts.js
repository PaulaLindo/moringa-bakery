window.addEventListener('scroll', () => {
    let topBtn = document.getElementById('topBtn');
    if (window.scrollY > 300) {
        topBtn.style.opacity = '1';
        topBtn.style.pointerEvents = 'auto';
        topBtn.style.transform = 'translateY(0)';
    } else {
        topBtn.style.opacity = '0';
        topBtn.style.pointerEvents = 'none';
        topBtn.style.transform = 'translateY(100px)';
    }

    // Shrink navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 60) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    }
    
    // Highlight nav link for section in view
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let scrollPos = window.scrollY + 100; // Adjust 100 to match your navbar+offset

    sections.forEach(section => {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${section.id}`
                );
            });
        }
    });
});

document.getElementById('topBtn').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll with offset and collapse on nav-link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();

                // Collapse navbar first (for mobile)
                const navbarCollapse = document.querySelector('.navbar-collapse');
                let needsDelay = false;
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, {toggle: false});
                    bsCollapse.hide();
                    needsDelay = true;
                }

                // Wait for collapse animation (Bootstrap default is 350ms)
                setTimeout(() => {
                    const fixedNavbar = document.querySelector('nav.navbar');
                    let offset = 0;
                    if (fixedNavbar) {
                        offset = fixedNavbar.getBoundingClientRect().height - 80;
                    } else {
                        offset = 16;
                    }
                    console.log('Offset for scroll:', offset);
                    const top = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });

                    // Set active state
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }, needsDelay ? 400 : 0); // Wait only if menu was open
            }
        }
    });

    // Touch support for active state
    link.addEventListener('touchstart', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Remove active state when toggler is clicked
const navbarToggler = document.querySelector('.navbar-toggler');
if (navbarToggler) {
    navbarToggler.addEventListener('click', () => {
        setTimeout(() => {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.blur();
                link.classList.remove('active');
            });
        }, 300);
    });
}

// Remove active state on document click (outside nav)
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('nav-link')) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    }
});

// Always scroll to top on reload
window.onload = function() {
    window.scrollTo(0, 0);
};