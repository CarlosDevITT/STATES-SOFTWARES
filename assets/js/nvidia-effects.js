 // Sistema de Partículas Tech NVIDIA Style
 function createTechParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'tech-particle';
        
        // Tamanho aleatório
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Posição inicial aleatória
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        
        // Duração de animação aleatória
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Delay aleatório
        const delay = Math.random() * 5;
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
    }
}

// Efeito de Brilho ao Scroll
function addScrollGlow() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.8s ease';
                entry.target.style.filter = 'brightness(1.05)';
                setTimeout(() => {
                    entry.target.style.filter = 'brightness(1)';
                }, 600);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
}

// Efeito de Mouse Glow nos Cards
function addMouseGlowEffect() {
    const cards = document.querySelectorAll('.service-card, .project-card, .blog-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
            
            // Criar efeito de glow no mouse
            const glow = document.createElement('div');
            glow.style.position = 'absolute';
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
            glow.style.width = '100px';
            glow.style.height = '100px';
            glow.style.background = 'radial-gradient(circle, rgba(118, 185, 0, 0.1), transparent)';
            glow.style.transform = 'translate(-50%, -50%)';
            glow.style.pointerEvents = 'none';
            glow.style.transition = 'opacity 0.5s ease';
            glow.style.zIndex = '1';
            
            card.style.position = 'relative';
            card.appendChild(glow);
            
            setTimeout(() => {
                glow.style.opacity = '0';
                setTimeout(() => glow.remove(), 500);
            }, 100);
        });
    });
}

// Efeito de Digitação nos Títulos (opcional)
function addTypingEffect() {
    const title = document.querySelector('.hero-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #76b900';
        
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < text.length) {
                title.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }
}



// Inicializar todos os efeitos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    createTechParticles();
    addScrollGlow();
    addMouseGlowEffect();
    addParallaxEffect();
    
    // Opcional: Descomentar se quiser efeito de digitação
    // addTypingEffect();

    // Smooth Scroll Aprimorado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Loading Animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Efeito de Performance - Pausar animações quando fora da view
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        } else {
            entry.target.style.animationPlayState = 'paused';
        }
    });
});

document.querySelectorAll('.tech-particle').forEach(particle => {
    performanceObserver.observe(particle);
});