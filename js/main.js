document.addEventListener('DOMContentLoaded', function() {
    // АКТИВНАЯ СТРАНИЦА В НАВИГАЦИИ
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // МОБИЛЬНОЕ МЕНЮ
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        navToggle.classList.toggle('active');
    });

    // ЗАКРЫТИЕ МЕНЮ ПО КЛИКУ СНАРУЖИ
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });

    // ЗАКРЫТИЕ ВСЕХ МОДАЛОК ПО OVERLAY
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                modal.style.display = 'none';
            }
        });
    });

    console.log('🚀 FitAI Main.js загружен');
});
