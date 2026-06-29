// ── БУРГЕР-МЕНЮ ──
document.addEventListener('DOMContentLoaded', function() {
    var burgerBtn = document.querySelector('.burger-btn');
    var navLinks = document.querySelector('.nav-links');

    if (burgerBtn && navLinks) {
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

// ── ВАЛИДАЦИЯ EMAIL В ФУТЕРЕ ──
document.addEventListener('DOMContentLoaded', function() {
    var emailInput = document.getElementById('emailInput');
    var subscribeBtn = document.getElementById('subscribeBtn');
    var messageDiv = document.getElementById('subscribeMessage');

    if (emailInput && subscribeBtn && messageDiv) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var email = emailInput.value.trim();
            var message = '';

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
                emailInput.value = '';
                setTimeout(function() {
                    messageDiv.textContent = '';
                }, 4000);
            }

            messageDiv.textContent = message;

            if (message.includes('Please')) {
                setTimeout(function() {
                    messageDiv.textContent = '';
                }, 4000);
            }
        });

        emailInput.addEventListener('input', function() {
            messageDiv.textContent = '';
        });
    }
});

// ── МОДАЛЬНОЕ ОКНО ──
document.addEventListener('DOMContentLoaded', function() {
    var modalOverlay = document.getElementById('modalOverlay');
    var modalClose = document.getElementById('modalClose');
    var modalForm = document.getElementById('modalForm');

    if (!modalOverlay || !modalClose || !modalForm) {
        console.warn('Modal elements not found');
        return;
    }

    // Открытие модалки
    var btnNav = document.querySelector('.btn-nav');
    var btnMobile = document.querySelector('.nav-mobile-only a');

    function openModal(e) {
        if (e) e.preventDefault();
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (btnNav) btnNav.addEventListener('click', openModal);
    if (btnMobile) btnMobile.addEventListener('click', openModal);

    // Закрытие модалки
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.querySelectorAll('.modal-error').forEach(function(el) {
            el.classList.remove('visible');
        });
        document.querySelectorAll('.modal-field input').forEach(function(el) {
            el.classList.remove('error', 'success');
        });
        modalForm.reset();
        var phone = document.getElementById('modalPhone');
        if (phone) phone.value = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // ── МАСКА ФИО ──
    var nameInput = document.getElementById('modalName');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            var val = this.value;
            val = val.replace(/[^A-Za-zА-Яа-я\s]/g, '');
            val = val.replace(/(^|\s)\S/g, function(match) {
                return match.toUpperCase();
            });
            this.value = val;
        });
    }

    // ── МАСКА ТЕЛЕФОНА ──
    var phoneInput = document.getElementById('modalPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            var input = this;
            var cursorPos = input.selectionStart;
            var oldValue = input.value;
            var digits = oldValue.replace(/\D/g, '');

            if (digits.length === 0) {
                input.value = '+7';
                input.setSelectionRange(2, 2);
                return;
            }

            if (digits[0] !== '7') {
                digits = '7' + digits;
            }

            if (digits.length > 11) {
                digits = digits.slice(0, 11);
            }

            var formatted = '+7';
            if (digits.length > 1) {
                formatted += ' (' + digits.slice(1, 4);
            }
            if (digits.length >= 4) {
                formatted += ') ' + digits.slice(4, 7);
            }
            if (digits.length >= 7) {
                formatted += '-' + digits.slice(7, 9);
            }
            if (digits.length >= 9) {
                formatted += '-' + digits.slice(9, 11);
            }

            if (formatted === oldValue) return;

            var shift = formatted.length - oldValue.length;
            var newPos = cursorPos + shift;
            if (newPos < 0) newPos = 0;
            if (newPos > formatted.length) newPos = formatted.length;

            input.value = formatted;
            input.setSelectionRange(newPos, newPos);
        });

        phoneInput.addEventListener('focus', function() {
            if (this.value === '') {
                this.value = '+7';
                this.setSelectionRange(2, 2);
            }
        });

        phoneInput.addEventListener('click', function() {
            if (this.value === '') {
                this.value = '+7';
                this.setSelectionRange(2, 2);
            }
        });
    }

    // ── ОКНО ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ ──
    var privacyLink = document.getElementById('privacyPolicyLink');
    var privacyOverlay = document.getElementById('privacyOverlay');
    var privacyClose = document.getElementById('privacyClose');
    var privacyBtn = document.getElementById('privacyBtn');

    if (privacyLink && privacyOverlay) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closePrivacy() {
        if (privacyOverlay) {
            privacyOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (privacyClose) privacyClose.addEventListener('click', closePrivacy);
    if (privacyBtn) privacyBtn.addEventListener('click', closePrivacy);
    if (privacyOverlay) {
        privacyOverlay.addEventListener('click', function(e) {
            if (e.target === privacyOverlay) closePrivacy();
        });
    }

    // ── ОКНО УСПЕШНОЙ ОТПРАВКИ ──
    var successOverlay = document.getElementById('successOverlay');
    var successBtn = document.getElementById('successBtn');

    function showSuccess() {
        if (successOverlay) {
            successOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSuccess() {
        if (successOverlay) {
            successOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (successBtn) successBtn.addEventListener('click', closeSuccess);
    if (successOverlay) {
        successOverlay.addEventListener('click', function(e) {
            if (e.target === successOverlay) closeSuccess();
        });
    }

    // ── ВАЛИДАЦИЯ ──
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var name = document.getElementById('modalName');
        var phone = document.getElementById('modalPhone');
        var comment = document.getElementById('modalComment');
        var consent = document.getElementById('modalConsent');

        var nameError = document.getElementById('nameError');
        var phoneError = document.getElementById('phoneError');
        var commentError = document.getElementById('commentError');
        var consentError = document.getElementById('consentError');

        var isValid = true;

        // 1. ФИО
        var namePattern = /^[A-Za-zА-Яа-я\s]+$/;
        if (!name.value.trim() || name.value.trim().length < 2 || !namePattern.test(name.value.trim())) {
            name.classList.add('error');
            nameError.classList.add('visible');
            isValid = false;
        } else {
            name.classList.remove('error');
            name.classList.add('success');
            nameError.classList.remove('visible');
        }

        // 2. Телефон
        var phoneClean = phone.value.replace(/\D/g, '');
        if (phoneClean.length < 11) {
            phone.classList.add('error');
            phoneError.classList.add('visible');
            isValid = false;
        } else {
            phone.classList.remove('error');
            phone.classList.add('success');
            phoneError.classList.remove('visible');
        }

        // 3. Комментарий — минимум 10 символов
        var commentValue = comment.value.trim();
        if (commentValue.length > 0 && commentValue.length < 10) {
            comment.classList.add('error');
            commentError.classList.add('visible');
            isValid = false;
        } else {
            comment.classList.remove('error');
            comment.classList.add('success');
            commentError.classList.remove('visible');
        }
        // Если комментарий пустой — пропускаем (необязательное поле)

        // 4. Чекбокс
        if (!consent.checked) {
            consentError.classList.add('visible');
            isValid = false;
        } else {
            consentError.classList.remove('visible');
        }

        if (isValid) {
            closeModal();
            setTimeout(showSuccess, 300);
        }
    });

    document.querySelectorAll('.modal-field input').forEach(function(input) {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            var errorEl = this.closest('.modal-field').querySelector('.modal-error');
            if (errorEl) errorEl.classList.remove('visible');
        });
    });
});