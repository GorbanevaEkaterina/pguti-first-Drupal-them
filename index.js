// Главный скрипт (меню, анимации, интерактив)

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Мобильное меню
    const initMobileMenu = () => {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!mobileMenuToggle || !navMenu) return;
        
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon?.classList.replace('fa-bars', 'fa-times');
            } else {
                icon?.classList.replace('fa-times', 'fa-bars');
            }
        });
        
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
    
    // 2. Плавный скролл по якорям
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
    
    // 3. Анимация появления при скролле
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
                    observer.unobserve(entry.target);
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
    
    // 4. Тень шапки при скролле
    const initHeaderScroll = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            header.style.boxShadow = currentScroll > 100 
                ? '0 2px 20px rgba(0,0,0,0.15)' 
                : '0 2px 10px rgba(0,0,0,0.1)';
        }, { passive: true });
    };
    
    // 5. Показать/скрыть все программы
    const initProgramsToggle = () => {
        const showAllButton = document.getElementById('showAllPrograms');
        const programGrid = document.querySelector('.program-grid');
        
        if (!showAllButton || !programGrid) return;
        
        showAllButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            programGrid.classList.toggle('show-all');
            
            const isExpanded = programGrid.classList.contains('show-all');
            this.textContent = isExpanded ? 'СВЕРНУТЬ' : 'ВСЕ ПРОГРАММЫ';
            
            if (!isExpanded) {
                programGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    };
    
    // 6. Показать/скрыть прошедшие события
    const initEventsToggle = () => {
        const showMoreButton = document.getElementById('showMoreEvents');
        const hiddenEvents = document.querySelectorAll('.hidden-event');
        
        if (!showMoreButton || hiddenEvents.length === 0) return;
        
        hiddenEvents.forEach(event => {
            event.style.display = 'none';
        });
        
        showMoreButton.addEventListener('click', function() {
            const isExpanded = this.textContent === 'СВЕРНУТЬ';
            
            hiddenEvents.forEach(event => {
                event.style.display = isExpanded ? 'none' : 'flex';
            });
            
            this.textContent = isExpanded ? 'ПОКАЗАТЬ ЕЩЁ' : 'СВЕРНУТЬ';
            
            if (isExpanded) {
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    };
    
    // 7. Показать/скрыть карточки поддержки
    const initSupportToggle = () => {
        const showMoreButton = document.getElementById('showMoreSupport');
        const hiddenCards = document.querySelectorAll('.hidden-support-card');
        
        if (!showMoreButton || hiddenCards.length === 0) return;
        
        hiddenCards.forEach(card => {
            card.style.display = 'none';
        });
        
        showMoreButton.addEventListener('click', function() {
            const isExpanded = this.textContent === 'СВЕРНУТЬ';
            
            hiddenCards.forEach(card => {
                card.style.display = isExpanded ? 'none' : 'block';
            });
            
            this.textContent = isExpanded ? 'ПОКАЗАТЬ ЕЩЁ' : 'СВЕРНУТЬ';
            
            if (isExpanded) {
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    };
    
    // 8. Показать/скрыть студенческую жизнь
    const initInvolvedToggle = () => {
        const showMoreButton = document.getElementById('showMoreInvolved');
        const hiddenCards = document.querySelectorAll('.hidden-involved-card');
        
        if (!showMoreButton || hiddenCards.length === 0) return;
        
        hiddenCards.forEach(card => {
            card.style.display = 'none';
        });
        
        showMoreButton.addEventListener('click', function() {
            const isExpanded = this.textContent === 'СВЕРНУТЬ';
            
            hiddenCards.forEach(card => {
                card.style.display = isExpanded ? 'none' : 'block';
            });
            
            this.textContent = isExpanded ? 'ПОКАЗАТЬ ЕЩЁ' : 'СВЕРНУТЬ';
            
            if (isExpanded) {
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    };
    
    // Инициализация модулей
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initProgramsToggle();
    initEventsToggle();
    initSupportToggle();
    initInvolvedToggle();
    
});