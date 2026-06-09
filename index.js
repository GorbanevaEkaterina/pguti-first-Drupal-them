/**
 * ПГУТИ - Основной файл скриптов
 * Мобильное меню, анимации, интерактивные элементы
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. МОБИЛЬНОЕ МЕНЮ
    // ========================================
    const initMobileMenu = () => {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!mobileMenuToggle || !navMenu) return;
        
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Меняем иконку гамбургер ↔ крестик
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon?.classList.replace('fa-bars', 'fa-times');
            } else {
                icon?.classList.replace('fa-times', 'fa-bars');
            }
        });
        
        // Закрытие меню при клике на ссылку
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon?.classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    };
    
    // ========================================
    // 2. ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК
    // ========================================
    const initSmoothScroll = () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    };
    
    // ========================================
    // 3. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ
    // ========================================
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Отключаем наблюдение после появления
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll(
            '.feature-card, .program-card, .event-card, .support-card, .journey-btn, .faculty-card'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };
    
    // ========================================
    // 4. ИЗМЕНЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ
    // ========================================
    const initHeaderScroll = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            header.style.boxShadow = currentScroll > 100 
                ? '0 2px 20px rgba(0,0,0,0.15)' 
                : '0 2px 10px rgba(0,0,0,0.1)';
        }, { passive: true }); // Оптимизация производительности
    };
    
    // ========================================
    // 5. ПОКАЗ/СКРЫТИЕ ВСЕХ ПРОГРАММ
    // ========================================
    const initProgramsToggle = () => {
        const showAllButton = document.getElementById('showAllPrograms');
        const programGrid = document.querySelector('.program-grid');
        
        if (!showAllButton || !programGrid) return;
        
        showAllButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            programGrid.classList.toggle('show-all');
            
            const isExpanded = programGrid.classList.contains('show-all');
            this.textContent = isExpanded ? 'СВЕРНУТЬ' : 'ВСЕ ПРОГРАММЫ';
            
            // Плавная прокрутка к началу секции при сворачивании
            if (!isExpanded) {
                programGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    };
    
    // ========================================
// 6. ПОКАЗ/СКРЫТИЕ ПРОШЕДШИХ СОБЫТИЙ
// ========================================
const initEventsToggle = () => {
    const showMoreButton = document.getElementById('showMoreEvents');
    const hiddenEvents = document.querySelectorAll('.hidden-event');
    
    if (!showMoreButton || hiddenEvents.length === 0) return;
    
    // Скрываем все скрытые элементы сразу при инициализации
    hiddenEvents.forEach(event => {
        event.style.display = 'none';
    });
    
    showMoreButton.addEventListener('click', function() {
        const isExpanded = this.textContent === 'СВЕРНУТЬ';
        
        hiddenEvents.forEach(event => {
            event.style.display = isExpanded ? 'none' : 'flex';
        });
        
        this.textContent = isExpanded ? 'ПОКАЗАТЬ ЕЩЁ' : 'СВЕРНУТЬ';
        
        // Прокрутка к кнопке при сворачивании
        if (isExpanded) {
            this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
};
    
    // ========================================
    // ИНИЦИАЛИЗАЦИЯ ВСЕХ МОДУЛЕЙ
    // ========================================
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initProgramsToggle();
    initEventsToggle();
    
});