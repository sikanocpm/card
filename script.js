// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const warningModal = document.getElementById('warningModal');
    const enterBtn = document.getElementById('enterBtn');
    const mainContent = document.getElementById('mainContent');
    const particlesContainer = document.getElementById('particles');

    // Función para cerrar el modal de advertencia
    function closeWarningModal() {
        warningModal.classList.add('hidden');
        mainContent.classList.add('visible');
        createParticles();
    }

    // Event listener para el botón de entrar
    enterBtn.addEventListener('click', closeWarningModal);

    // También permitir cerrar con la tecla Enter
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !warningModal.classList.contains('hidden')) {
            closeWarningModal();
        }
    });

    // Función para crear partículas de fondo
    function createParticles() {
        const colors = ['#00f0ff', '#b300ff', '#ff00aa'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Posición aleatoria
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Color aleatorio
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Tamaño aleatorio
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Duración de animación aleatoria
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // Efecto de typing para el subtítulo (opcional)
    function typeEffect(element, text, speed) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Añadir efecto hover con sonido visual a los botones
    const allButtons = document.querySelectorAll('.btn-download, .btn-contact, .btn-social');
    
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Efecto de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto parallax suave en scroll
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const particles = document.querySelectorAll('.particle');
                
                particles.forEach((particle, index) => {
                    const speed = (index % 3 + 1) * 0.1;
                    particle.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });

    // Detectar cuando los elementos entran en viewport para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar secciones para animaciones de entrada
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
