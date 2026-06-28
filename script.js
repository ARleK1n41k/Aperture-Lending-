// ── БУРГЕР-МЕНЮ ──
document.addEventListener('DOMContentLoaded', function() {
    var burgerBtn = document.querySelector('.burger-btn');
    var navLinks = document.querySelector('.nav-links');

    if (burgerBtn && navLinks) {
        // Создаём overlay (затемнение)
        var overlay = document.createElement('div');
        overlay.classList.add('nav-overlay');
        document.body.appendChild(overlay);

        function toggleMenu() {
            var isOpen = navLinks.classList.contains('open');

            burgerBtn.classList.toggle('active');
            navLinks.classList.toggle('open');
            overlay.classList.toggle('active');

            if (!isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        burgerBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (!navLinks.classList.contains('open')) {
                    return;
                }

                var href = link.getAttribute('href');
                var isAnchor = href && href.startsWith('#') && href.length > 1;
                var target = isAnchor ? document.querySelector(href) : null;

                if (target) {
                    e.preventDefault();
                }

                toggleMenu();

                if (target) {
                    setTimeout(function() {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }, 320);
                }
            });
        });
    }
});

// ── Плавное скрытие/появление навбара при скролле ──
var nav = document.querySelector('nav');
var lastScroll = 0;

window.addEventListener('scroll', function() {
    if (!nav) return;

    var currentScroll = window.scrollY;

    var navLinks = document.querySelector('.nav-links');
    var isMenuOpen = navLinks ? navLinks.classList.contains('open') : false;

    if (isMenuOpen) {
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
        nav.style.transition = 'transform 0.3s ease';
    } else {
        nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ── Активная ссылка в навбаре при скролле ──
var sections = document.querySelectorAll('section[id], div[id]');
var navLinksAll = document.querySelectorAll('.nav-links a:not(.btn-nav-mobile)');

window.addEventListener('scroll', function() {
    var current = '';

    sections.forEach(function(section) {
        var sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(function(link) {
        link.style.opacity = '0.85';
        if (link.getAttribute('href') === '#' + current) {
            link.style.opacity = '1';
        }
    });
});

// ── Активация иконок Lucide ──
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// ── ВАЛИДАЦИЯ EMAIL ──
document.addEventListener('DOMContentLoaded', function() {
    var emailInput = document.getElementById('emailInput');
    var subscribeBtn = document.getElementById('subscribeBtn');
    var messageDiv = document.getElementById('subscribeMessage');

    if (emailInput && subscribeBtn && messageDiv) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var email = emailInput.value.trim();
            var message = '';

            // Проверка на пустоту и наличие @
            if (email === '') {
                message = 'Please enter your email address.';
                messageDiv.style.color = '#EF4444';
            } else if (!email.includes('@')) {
                message = 'Please enter a valid email address with @.';
                messageDiv.style.color = '#EF4444';
            } else if (!email.includes('.')) {
                message = 'Please enter a valid email address with a domain (e.g. .com).';
                messageDiv.style.color = '#EF4444';
            } else {
                message = 'Thank you for subscribing!';
                messageDiv.style.color = '#22C55E';
                emailInput.value = ''; // очищаем поле
                // Можно добавить сброс через 3 секунды
                setTimeout(function() {
                    messageDiv.textContent = '';
                }, 4000);
            }

            messageDiv.textContent = message;

            // Сброс сообщения через 4 секунды (если ошибка)
            if (message.includes('Please')) {
                setTimeout(function() {
                    messageDiv.textContent = '';
                }, 4000);
            }
        });

        // Очистка сообщения при вводе
        emailInput.addEventListener('input', function() {
            messageDiv.textContent = '';
        });
    }
});