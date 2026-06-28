// Скрипты главной страницы
document.addEventListener('DOMContentLoaded', function() {
    const mainButton = document.querySelector('.main-button');
    const backgroundSvg = document.querySelector('.background-svg');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    mainButton.addEventListener('click', function() {
        // Добавляем анимацию сплющивания
        mainButton.classList.add('squish');
        
        // Плавное исчезновение арта
        heroOverlay.classList.add('fade-out');
        
        // Создаём партиклы от кнопки
        createParticles(mainButton);
        
        // Затемнение заднего плана (SVG и body)
        backgroundSvg.style.filter = 'brightness(0.15)';
        document.body.style.backgroundColor = '#0a0a10';
        
        // Переход после завершения анимации
        setTimeout(function() {
            window.location.href = 'birthday.html';
        }, 400);
    });
});

// Функция создания партиклов
function createParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = 'rgba(122, 106, 136, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02;
            opacity -= 0.05;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}
