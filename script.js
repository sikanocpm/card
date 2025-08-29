// Animaciones y efectos interactivos para la tarjeta SIKAN

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar todas las funcionalidades
  initImageFallback()
  initSocialHover()
  initLinkAnimations()
  initTooltips()
  initScrollAnimations()
  initParticleEffect()
  initProfileDownload()
  initTypingEffect()
})

function initProfileDownload() {
  const downloadBtn = document.getElementById("downloadProfile")

  downloadBtn.addEventListener("click", () => {
    // Crear enlace de descarga para el archivo de perfil existente
    const a = document.createElement("a")
    a.href = "perfil-gamer.mobileconfig"
    a.download = "perfil-gamer.mobileconfig"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    // Mostrar notificación con instrucciones específicas para iOS
    showNotification(
      "Perfil descargado. Ve a Configuración > General > Administración de dispositivos y VPN > Perfiles para instalarlo",
    )
  })
}

// Función para generar UUID
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Manejo de imagen de perfil con fallback
function initImageFallback() {
  const profileImg = document.getElementById("profileImg")

  // Si la imagen no se puede cargar, usar un placeholder
  profileImg.onerror = function () {
    this.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiMwMDY0QzgiLz4KPHRleHQgeD0iNjAiIHk9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCI+U0s8L3RleHQ+Cjwvc3ZnPg=="
    this.alt = "SIKAN Logo"
  }
}

// Efectos hover para redes sociales
function initSocialHover() {
  const socialLinks = document.querySelectorAll(".social-link")

  socialLinks.forEach((link) => {
    const icon = link.querySelector(".social-icon")

    link.addEventListener("mouseenter", function () {
      // Efecto de rotación en el ícono
      icon.style.transform = "rotate(10deg) scale(1.1)"

      this.style.boxShadow = "0 15px 35px rgba(0, 100, 200, 0.4), 0 0 20px rgba(0, 100, 200, 0.2)"
    })

    link.addEventListener("mouseleave", function () {
      icon.style.transform = "rotate(0deg) scale(1)"
      this.style.boxShadow = ""
    })

    // Efecto de click
    link.addEventListener("click", function (e) {
      // Solo prevenir default si no tiene href real
      if (this.getAttribute("href") === "#") {
        e.preventDefault()
      }

      // Animación de click
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)

      // Mostrar notificación solo para enlaces sin URL real
      if (this.getAttribute("href") === "#") {
        const platform = this.dataset.platform
        showNotification(`Abriendo ${platform}...`)
      }
    })
  })
}

// Animaciones para enlaces personalizados
function initLinkAnimations() {
  const customLinks = document.querySelectorAll(".custom-link")

  customLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".link-icon")
      icon.style.transform = "scale(1.1) rotate(5deg)"

      // Efecto de onda
      createRipple(this)
    })

    link.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".link-icon")
      icon.style.transform = "scale(1) rotate(0deg)"
    })

    link.addEventListener("click", function (e) {
      // Solo prevenir default si no tiene href real
      if (this.getAttribute("href") === "#") {
        e.preventDefault()
      }

      // Animación de click
      this.style.transform = "translateX(10px) scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""
      }, 200)

      // Mostrar notificación solo para enlaces sin URL real
      if (this.getAttribute("href") === "#") {
        const linkType = this.classList[1] // whatsapp, telegram, etc.
        showNotification(`Abriendo ${linkType}...`)
      }
    })
  })
}

// Crear efecto de onda (ripple)
function createRipple(element) {
  const ripple = document.createElement("div")
  ripple.style.position = "absolute"
  ripple.style.borderRadius = "50%"
  ripple.style.background = "rgba(0, 100, 200, 0.3)"
  ripple.style.transform = "scale(0)"
  ripple.style.animation = "ripple 0.6s linear"
  ripple.style.left = "50%"
  ripple.style.top = "50%"
  ripple.style.width = "20px"
  ripple.style.height = "20px"
  ripple.style.marginLeft = "-10px"
  ripple.style.marginTop = "-10px"
  ripple.style.pointerEvents = "none"

  element.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}

// Sistema de tooltips
function initTooltips() {
  const socialLinks = document.querySelectorAll(".social-link")
  let tooltip = null

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function (e) {
      const platform = this.dataset.platform
      showTooltip(e, `Sígueme en ${platform}`)
    })

    link.addEventListener("mouseleave", () => {
      hideTooltip()
    })

    link.addEventListener("mousemove", (e) => {
      updateTooltipPosition(e)
    })
  })

  function showTooltip(e, text) {
    tooltip = document.createElement("div")
    tooltip.className = "tooltip"
    tooltip.textContent = text
    document.body.appendChild(tooltip)

    updateTooltipPosition(e)

    setTimeout(() => {
      if (tooltip) {
        tooltip.classList.add("show")
      }
    }, 100)
  }

  function updateTooltipPosition(e) {
    if (tooltip) {
      tooltip.style.left = e.pageX + 10 + "px"
      tooltip.style.top = e.pageY - 40 + "px"
    }
  }

  function hideTooltip() {
    if (tooltip) {
      tooltip.classList.remove("show")
      setTimeout(() => {
        if (tooltip && tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip)
        }
        tooltip = null
      }, 300)
    }
  }
}

// Animaciones de scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos para animación de entrada
  const animatedElements = document.querySelectorAll(".social-section, .links-section")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Efecto de partículas sutil
function initParticleEffect() {
  const card = document.querySelector(".card")

  // Crear partículas ocasionales
  setInterval(() => {
    if (Math.random() > 0.7) {
      createParticle(card)
    }
  }, 3000)
}

function createParticle(container) {
  const particle = document.createElement("div")
  particle.style.position = "absolute"
  particle.style.width = "4px"
  particle.style.height = "4px"
  particle.style.background = "#0064C8"
  particle.style.borderRadius = "50%"
  particle.style.pointerEvents = "none"
  particle.style.opacity = "0.6"
  particle.style.left = Math.random() * 100 + "%"
  particle.style.top = "100%"
  particle.style.animation = "float 4s linear forwards"

  container.appendChild(particle)

  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle)
    }
  }, 4000)
}

// Sistema de notificaciones
function showNotification(message) {
  // Remover notificación existente
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        /* Actualizado gradiente de notificación de rojo a azul */
        background: linear-gradient(135deg, #0064C8, #0080FF);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        /* Actualizado sombra de notificación de rojo a azul */
        box-shadow: 0 4px 15px rgba(0, 100, 200, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Agregar estilos CSS adicionales para animaciones
const additionalStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-400px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .social-icon, .link-icon {
        transition: transform 0.3s ease;
    }
    
    .custom-link:active {
        transform: translateX(5px) scale(0.98);
    }
    
    .social-link:active {
        transform: translateY(-3px) scale(0.95);
    }
`

// Inyectar estilos adicionales
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)

// Efecto de typing para el nombre (opcional)
function initTypingEffect() {
  const nameElement = document.querySelector(".profile-name")
  const originalText = "SIKAN"
  const verifiedBadge = nameElement.querySelector(".verified-badge")

  // Solo ejecutar si se desea el efecto de typing
  if (window.location.hash === "#typing") {
    nameElement.innerHTML = ""
    let i = 0

    const typeWriter = () => {
      if (i < originalText.length) {
        nameElement.innerHTML += originalText.charAt(i)
        i++
        setTimeout(typeWriter, 150)
      } else {
        nameElement.appendChild(verifiedBadge)
      }
    }

    setTimeout(typeWriter, 1000)
  }
}

// Detectar dispositivos móviles para optimizaciones
function isMobile() {
  return window.innerWidth <= 768
}

// Optimizaciones para móviles
if (isMobile()) {
  // Reducir animaciones en móviles para mejor rendimiento
  document.documentElement.style.setProperty("--animation-duration", "0.2s")
}

// Manejo de errores global
window.addEventListener("error", (e) => {
  console.log("Error capturado:", e.message)
})

// Log de inicialización
console.log("🎮 SIKAN Card inicializada correctamente")
console.log("✨ Todas las animaciones y efectos están activos")
