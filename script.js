// Efecto de movimiento 3D en la tarjeta
const card = document.querySelector('.card');
const container = document.querySelector('.container');

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-10px)
        scale(1.02)
    `;
});

container.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
});

// Animación de clic en el botón de Discord
const discordButton = document.querySelector('.discord-button');

discordButton.addEventListener('click', (e) => {
    // Crear efecto de ondas
    const ripple = document.createElement('span');
    const rect = discordButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    discordButton.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

// Agregar animación de ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efecto de partículas aleatorias
const particles = document.querySelectorAll('.particle');
particles.forEach(particle => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    particle.style.left = randomX + '%';
    particle.style.top = randomY + '%';
});
