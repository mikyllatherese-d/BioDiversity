document.addEventListener('DOMContentLoaded', function () {
    fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('headerPlaceholder').innerHTML = html;

            const toggleButton = document.querySelector('.toggle_nav');
            const nav = document.querySelector('nav');
            const header = document.querySelector('header');

            const toggleStickyHeader = () => {
                if (window.pageYOffset > header.offsetHeight) {
                    header.classList.add('fixed');
                } else {
                    header.classList.remove('fixed');
                }
            };

            toggleStickyHeader();
            window.addEventListener('scroll', toggleStickyHeader);

            toggleButton.addEventListener('click', () => {
                toggleButton.classList.toggle('x-mark');
                nav.classList.toggle('show');
                nav.classList.toggle('hide');
            });

            document.addEventListener('click', (event) => {
                const isClickInside = nav.contains(event.target) || toggleButton.contains(event.target);
                if (!isClickInside) {
                    nav.classList.remove('show');
                    nav.classList.add('hide');
                    toggleButton.classList.remove('x-mark');
                }
            });
        })
        .catch(error => console.error('Error fetching header:', error));
});


// Smooth scroll to anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const offset = parseInt(target.getAttribute('data-offset')) || 0; // Default offset to 0 if not specified

        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});