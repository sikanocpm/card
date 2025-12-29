// Efecto de movimiento 3D en la tarjeta
const card = document.querySelector(".card")
const container = document.querySelector(".container")

const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches

if (isDesktop) {
  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 25
    const rotateY = (centerX - x) / 25

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(10px)
    `
  })

  container.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
  })
}

// Efecto sutil de clic en el botón de Discord
const discordButton = document.querySelector(".discord-button")
const whatsappButton = document.querySelector(".whatsapp-button")
const youtubeButton = document.querySelector(".youtube-button")
const instagramButton = document.querySelector(".instagram-button")

function createRipple(button, e) {
  const ripple = document.createElement("span")
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = e.clientX - rect.left - size / 2
  const y = e.clientY - rect.top - size / 2

  ripple.style.width = ripple.style.height = size + "px"
  ripple.style.left = x + "px"
  ripple.style.top = y + "px"
  ripple.style.position = "absolute"
  ripple.style.borderRadius = "50%"
  ripple.style.background = "rgba(255, 255, 255, 0.3)"
  ripple.style.transform = "scale(0)"
  ripple.style.animation = "ripple 0.6s ease-out"
  ripple.style.pointerEvents = "none"

  button.appendChild(ripple)
  setTimeout(() => ripple.remove(), 600)
}

discordButton.addEventListener("click", (e) => createRipple(discordButton, e))
whatsappButton.addEventListener("click", (e) => createRipple(whatsappButton, e))
youtubeButton.addEventListener("click", (e) => createRipple(youtubeButton, e))
instagramButton.addEventListener("click", (e) => createRipple(instagramButton, e))

// Agregar animación de ripple
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
