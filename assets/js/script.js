'use strict';



/**
 * add Event on elements
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header & back top btn show when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

/**
 * Service Card Flip Effect - CORRIGIDO
 */

const serviceCards = document.querySelectorAll(".service-card");

// Descrições detalhadas dos serviços
const serviceDescriptions = {
  "Gestão de Produtos": "Desenvolvemos e gerenciamos o ciclo completo de produtos digitais, desde a concepção até a entrega final, garantindo soluções que atendem às necessidades do mercado e dos usuários.",
  "Desenvolvimento Web e App": "Criamos experiências digitais excepcionais com sites modernos, sistemas web e aplicativos móveis nativos, sempre com as melhores práticas de UX e tecnologia de ponta.",
  "Suporte Técnico com IA": "Oferecemos suporte especializado 24/7 com agentes inteligentes que resolvem questões automaticamente, aprendem com cada interação e escalam para atendimento humano quando necessário.",
  "Recursos Humanos": "Implementamos soluções de RH com IA para recrutamento, treinamento e gestão de talentos, otimizando processos e potencializando o capital humano da sua organização.",
  "Design e Criativos": "Desenvolvemos identidades visuais impactantes, interfaces intuitivas e materiais criativos que comunicam sua marca de forma única e memorável.",
  "Marketing e Comunicação": "Estratégias completas de marketing digital com IA, incluindo análise de mercado, campanhas personalizadas e automação inteligente para maximizar seu ROI.",
  "Desenvolvimento de Negócios": "Consultoria especializada para expansão e inovação de negócios, utilizando análise de dados e inteligência artificial para identificar novas oportunidades de crescimento."
};

// Preparar os cards com estrutura de flip
function initializeServiceCards() {
  serviceCards.forEach(card => {
    const title = card.querySelector(".card-title").textContent;
    const description = serviceDescriptions[title];
    const originalContent = card.innerHTML;
    
    // Criar estrutura de flip
    card.innerHTML = `
      <div class="card-front">
        ${originalContent}
        <div class="click-indicator"></div>
      </div>
      <div class="card-back">
        <div class="service-description">${description}</div>
      </div>
    `;
    
    // Remover links dos títulos para prevenir comportamento padrão
    const titleLink = card.querySelector('.card-title a');
    if (titleLink) {
      titleLink.removeAttribute('href');
      titleLink.style.cursor = 'pointer';
    }
  });
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeServiceCards);
} else {
  initializeServiceCards();
}

// Adicionar eventos de clique CORRIGIDOS
addEventOnElem(serviceCards, "click", function(e) {
  // CORREÇÃO: Prevenir comportamento padrão que causa scroll
  e.preventDefault();
  e.stopPropagation();
  
  // Prevenir clique em links dentro do card
  if (e.target.closest('a') && !e.target.closest('.link-card')) {
    return;
  }
  
  // Fechar outros cards abertos
  serviceCards.forEach(otherCard => {
    if (otherCard !== this && otherCard.classList.contains('active')) {
      otherCard.classList.remove('active');
    }
  });
  
  // Toggle card atual
  this.classList.toggle('active');
  
  // Feedback tátil para mobile
  if (window.innerWidth <= 768 && 'vibrate' in navigator) {
    navigator.vibrate(10);
  }
  
  // CORREÇÃO: Prevenir scroll para o topo
  return false;
});

// Fechar cards ao clicar fora - CORRIGIDO
document.addEventListener("click", function(e) {
  if (!e.target.closest(".service-card")) {
    serviceCards.forEach(card => {
      card.classList.remove("active");
    });
  }
});

// CORREÇÃO: Prevenir toque padrão nos cards
addEventOnElem(serviceCards, "touchstart", function(e) {
  e.preventDefault();
  e.stopPropagation();
}, { passive: false });

addEventOnElem(serviceCards, "touchend", function(e) {
  e.preventDefault();
  e.stopPropagation();
  this.click();
}, { passive: false });

// Suporte para teclado
addEventOnElem(serviceCards, "keydown", function(e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    this.click();
  }
});

// Melhorar acessibilidade
addEventOnElem(serviceCards, "focus", function() {
  this.setAttribute("tabindex", "0");
});

// Efeito de hover apenas para desktop
addEventOnElem(serviceCards, "mouseenter", function() {
  if (!this.classList.contains('active') && window.innerWidth > 768) {
    this.style.transform = 'translateY(-5px) scale(1.02)';
  }
});

addEventOnElem(serviceCards, "mouseleave", function() {
  if (!this.classList.contains('active') && window.innerWidth > 768) {
    this.style.transform = '';
  }
});

// CORREÇÃO: Resetar transform quando card é desativado
serviceCards.forEach(card => {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        if (!card.classList.contains('active') && window.innerWidth > 768) {
          card.style.transform = '';
        }
      }
    });
  });
  
  observer.observe(card, { attributes: true });
});
