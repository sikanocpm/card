// ========================================
// SIKAN - ELEGANT LANDING PAGE
// Multi-language Support
// ========================================

// Translations
const translations = {
    es: {
        warning_title: "¡ADVERTENCIA!",
        warning_text: "El uso de archivos y scripts mostrados aquí es bajo tu propia responsabilidad.",
        enter_button: "ENTRAR",
        subtitle: "Plataforma de Acceso",
        downloads: "Descargas",
        sikanus_gg: "SIKANUS GG",
        virtual_space: "Espacio Virtual",
        recent_script: "Script Reciente",
        services: "💎 Compra de Servicios 💎",
        services_desc: "Monedas, Dinero, Carros Premium, etc.",
        communities: "Comunidades",
        whatsapp_group: "WhatsApp",
        discord_group: "Discord",
        social: "Redes Sociales",
        footer: "© 2025 SIKANUS | Acceso Restringido"
    },
    en: {
        warning_title: "WARNING!",
        warning_text: "The use of files and scripts shown here is at your own risk.",
        enter_button: "ENTER",
        subtitle: "Access Platform",
        downloads: "Downloads",
        sikanus_gg: "SIKANUS GG",
        virtual_space: "Virtual Space",
        recent_script: "Recent Script",
        services: "💎 Service Purchase 💎",
        services_desc: "Coins, Money, Premium Cars, etc.",
        communities: "Communities",
        whatsapp_group: "WhatsApp",
        discord_group: "Discord",
        social: "Social Media",
        footer: "© 2025 SIKANUS | Restricted Access"
    },
    "pt-br": {
        warning_title: "AVISO!",
        warning_text: "O uso de arquivos e scripts mostrados aqui é por sua conta e risco.",
        enter_button: "ENTRAR",
        subtitle: "Plataforma de Acesso",
        downloads: "Downloads",
        sikanus_gg: "SIKANUS GG",
        virtual_space: "Espaço Virtual",
        recent_script: "Script Recente",
        services: "💎 Compra de Serviços 💎",
        services_desc: "Moedas, Dinheiro, Carros Premium, etc.",
        communities: "Comunidades",
        whatsapp_group: "WhatsApp",
        discord_group: "Discord",
        social: "Redes Sociais",
        footer: "© 2025 SIKANUS | Acesso Restrito"
    },
    "pt-pt": {
        warning_title: "AVISO!",
        warning_text: "O uso de ficheiros e scripts mostrados aqui é da sua responsabilidade.",
        enter_button: "ENTRAR",
        subtitle: "Plataforma de Acesso",
        downloads: "Downloads",
        sikanus_gg: "SIKANUS GG",
        virtual_space: "Espaço Virtual",
        recent_script: "Script Recente",
        services: "💎 Compra de Serviços 💎",
        services_desc: "Moedas, Dinheiro, Carros Premium, etc.",
        communities: "Comunidades",
        whatsapp_group: "WhatsApp",
        discord_group: "Discord",
        social: "Redes Sociais",
        footer: "© 2025 SIKANUS | Acesso Restrito"
    },
    ru: {
        warning_title: "ВНИМАНИЕ!",
        warning_text: "Использование файлов и скриптов, показанных здесь, осуществляется на ваш риск.",
        enter_button: "ВОЙТИ",
        subtitle: "Платформа доступа",
        downloads: "Загрузки",
        sikanus_gg: "SIKANUS GG",
        virtual_space: "Виртуальное пространство",
        recent_script: "Недавний скрипт",
        services: "💎 Покупка услуг 💎",
        services_desc: "Монеты, Деньги, Премиум-автомобили и т.д.",
        communities: "Сообщества",
        whatsapp_group: "WhatsApp",
        discord_group: "Discord",
        social: "Социальные сети",
        footer: "© 2025 SIKANUS | Ограниченный доступ"
    }
};

// Variables globales
let currentLanguage = 'es';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const warningModal = document.getElementById('warning-modal');
    const enterButton = document.getElementById('enter-btn');
    const mainContent = document.getElementById('main-content');
    const langButtons = document.querySelectorAll('.lang-btn');

    // ========================================
    // SISTEMA DE IDIOMAS
    // ========================================
    
    /**
     * Actualiza el idioma de la página
     */
    function changeLanguage(lang) {
        currentLanguage = lang;
        
        // Actualizar todos los elementos con atributo data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Actualizar clase activa en botones de idioma
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Guardar preferencia de idioma
        localStorage.setItem('sikan-language', lang);
    }

    /**
     * Carga el idioma guardado o usa el idioma del navegador
     */
    function loadLanguagePreference() {
        // Verificar si hay idioma guardado
        const saved = localStorage.getItem('sikan-language');
        if (saved && translations[saved]) {
            changeLanguage(saved);
            return;
        }

        // Intentar usar el idioma del navegador
        const browserLang = navigator.language.toLowerCase();
        if (translations[browserLang]) {
            changeLanguage(browserLang);
        } else if (browserLang.includes('pt')) {
            // Para portugués, usar pt-br como default
            changeLanguage('pt-br');
        } else if (translations[browserLang.split('-')[0]]) {
            // Usar solo el código de país (ej: 'en' de 'en-US')
            changeLanguage(browserLang.split('-')[0]);
        } else {
            // Default a español
            changeLanguage('es');
        }
    }

    // Agregar event listeners a botones de idioma
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // ========================================
    // FUNCIONALIDAD DEL MODAL DE ADVERTENCIA
    // ========================================
    
    /**
     * Cierra el modal de advertencia y muestra el contenido principal
     */
    function closeWarningModal() {
        warningModal.style.transition = 'opacity 0.4s ease';
        warningModal.style.opacity = '0';
        
        setTimeout(function() {
            warningModal.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Guardar que el usuario aceptó la advertencia
            localStorage.setItem('sikan-accepted', 'true');
        }, 400);
    }

    // Event listener para el botón ENTRAR
    if (enterButton) {
        enterButton.addEventListener('click', closeWarningModal);
    }

    // Permitir cerrar con la tecla Enter
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !warningModal.classList.contains('hidden')) {
            closeWarningModal();
        }
    });

    // Cargar preferencia de idioma e iniciar
    loadLanguagePreference();

    // Verificar si ya aceptó la advertencia (opcional)
    // Descomentar para recordar si el usuario aceptó anteriormente
    // if (localStorage.getItem('sikan-accepted') === 'true') {
    //     closeWarningModal();
    // }

    // ========================================
    // EFECTOS DE INTERACCIÓN
    // ========================================
    
    /**
     * Efecto de hover suave en botones
     */
    const allButtons = document.querySelectorAll('.download-btn, .contact-btn, .social-btn, .enter-button');
    
    allButtons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            // Agregar efecto de escala suave
            if (!this.classList.contains('lang-btn')) {
                this.style.transition = 'all 0.3s ease';
            }
        });
    });

    // ========================================
    // SCROLL SMOOTH Y ANIMACIONES
    // ========================================
    
    /**
     * Observador de intersección para animaciones en scroll
     */
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

    // Aplicar observer a secciones
    const sections = document.querySelectorAll('.download-section, .services-section, .contact-section, .social-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });

    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c🚀 SIKAN - Access Platform Loaded', 'color: #ffffff; font-size: 16px; font-weight: bold;');
    console.log('%cElegant & Minimalist Design', 'color: #b0b0b0; font-size: 12px;');
});

// ========================================
// UTILIDADES GLOBALES
// ========================================

/**
 * Función auxiliar para cambiar idioma desde consola
 */
window.changeSikanLanguage = function(lang) {
    if (translations[lang]) {
        const buttons = document.querySelectorAll('[data-lang="' + lang + '"]');
        if (buttons.length > 0) {
            buttons[0].click();
            console.log('Idioma cambiado a: ' + lang);
        }
    } else {
        console.log('Idioma no disponible. Idiomas disponibles: es, en, pt-br, pt-pt, ru');
    }
};
