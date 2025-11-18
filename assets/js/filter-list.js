// Filtro de projetos melhorado
document.addEventListener('DOMContentLoaded', function() {
  // Elementos do filtro
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.grid-list > li');
  
  // Configuração das categorias
  const categoryMap = {
      'all': 'Todos os projetos',
      'website': 'Website',
      'ia': 'Inteligência Artificial', 
      'app': 'Aplicativos',
      'landing': 'Landing Page',
      'ecommerce': 'E-commerce'
  };
  
  // Função para filtrar projetos
  function filterProjects(category) {
      let visibleCount = 0;
      
      projectItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          const isVisible = category === 'all' || itemCategory === category;
          
          if (isVisible) {
              visibleCount++;
              item.style.display = 'block';
              
              // Animação de entrada
              setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'translateY(0)';
                  item.style.transition = 'all 0.4s ease';
              }, 50);
          } else {
              // Animação de saída
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
              item.style.transition = 'all 0.3s ease';
              
              setTimeout(() => {
                  item.style.display = 'none';
              }, 300);
          }
      });
      
      // Se não houver projetos na categoria selecionada
      if (visibleCount === 0) {
          showNoProjectsMessage(category);
      } else {
          hideNoProjectsMessage();
      }
      
      // Atualizar contador (opcional)
      updateProjectCounter(visibleCount, category);
  }
  
  // Mensagem quando não há projetos
  function showNoProjectsMessage(category) {
      let messageContainer = document.querySelector('.no-projects-message');
      
      if (!messageContainer) {
          messageContainer = document.createElement('div');
          messageContainer.className = 'no-projects-message';
          messageContainer.style.textAlign = 'center';
          messageContainer.style.padding = '60px 20px';
          messageContainer.style.color = 'var(--cool-gray)';
          document.querySelector('.grid-list').after(messageContainer);
      }
      
      messageContainer.innerHTML = `
          <p style="font-size: var(--fs-5); margin-bottom: 15px;">Nenhum projeto encontrado</p>
          <p style="font-size: var(--fs-7);">Não temos projetos na categoria "${categoryMap[category]}" no momento.</p>
      `;
  }
  
  function hideNoProjectsMessage() {
      const messageContainer = document.querySelector('.no-projects-message');
      if (messageContainer) {
          messageContainer.remove();
      }
  }
  
  // Contador de projetos (opcional)
  function updateProjectCounter(count, category) {
      let counterElement = document.querySelector('.project-counter');
      
      if (!counterElement) {
          counterElement = document.createElement('div');
          counterElement.className = 'project-counter';
          counterElement.style.textAlign = 'center';
          counterElement.style.marginTop = '20px';
          counterElement.style.fontSize = 'var(--fs-7)';
          counterElement.style.color = 'var(--cool-gray)';
          document.querySelector('.grid-list').after(counterElement);
      }
      
      const categoryText = category === 'all' ? 'projetos' : `projetos em ${categoryMap[category]}`;
      counterElement.textContent = `${count} ${categoryText} encontrados`;
  }
  
  // Event listeners para os botões de filtro
  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove a classe active de todos os botões
          filterButtons.forEach(btn => {
              btn.classList.remove('active');
              btn.setAttribute('aria-pressed', 'false');
          });
          
          // Adiciona a classe active ao botão clicado
          this.classList.add('active');
          this.setAttribute('aria-pressed', 'true');
          
          // Obtém o filtro do data attribute
          const filterValue = this.getAttribute('data-filter');
          
          // Filtra os projetos
          filterProjects(filterValue);
          
          // Animações nos botões
          animateFilterButtons(this);
      });
  });
  
  // Animação nos botões de filtro
  function animateFilterButtons(activeButton) {
      filterButtons.forEach(button => {
          if (button !== activeButton) {
              button.style.transform = 'scale(0.95)';
              setTimeout(() => {
                  button.style.transform = 'scale(1)';
                  button.style.transition = 'transform 0.2s ease';
              }, 200);
          }
      });
      
      activeButton.style.transform = 'scale(1.05)';
      setTimeout(() => {
          activeButton.style.transform = 'scale(1)';
          activeButton.style.transition = 'transform 0.2s ease';
      }, 150);
  }
  
  // Inicializa com todos os projetos visíveis
  filterProjects('all');
  
  // Adiciona estilos CSS dinamicamente para as animações
  addFilterStyles();
});

// Adiciona estilos CSS para as animações
function addFilterStyles() {
  const style = document.createElement('style');
  style.textContent = `
      .grid-list > li {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .filter-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
      }
      
      .filter-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
      }
      
      .filter-btn:hover::before {
          left: 100%;
      }
      
      .filter-btn.active {
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transform: translateY(-2px);
      }
      
      .no-projects-message {
          animation: fadeIn 0.5s ease;
      }
      
      .project-counter {
          animation: slideUp 0.4s ease;
      }
      
      @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
      }
      
      /* Melhorias para mobile */
      @media (max-width: 768px) {
          .filter-list {
              flex-wrap: wrap;
              gap: 10px;
          }
          
          .filter-btn {
              flex: 1;
              min-width: 120px;
              text-align: center;
          }
      }
      
      @media (max-width: 480px) {
          .filter-list {
              flex-direction: column;
          }
          
          .filter-btn {
              width: 100%;
          }
      }
  `;
  document.head.appendChild(style);
}

// Carrossel para as imagens dos projetos (versão simplificada)
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
      const banner = card.querySelector('.card-banner');
      const images = banner.querySelectorAll('img');
      
      // Se houver mais de uma imagem, transforma em carrossel
      if (images.length > 1) {
          createSimpleCarousel(banner, images);
      }
  });
  
  function createSimpleCarousel(container, images) {
      let currentIndex = 0;
      
      // Configuração básica do carrossel
      container.style.position = 'relative';
      container.style.overflow = 'hidden';
      
      // Esconde todas as imagens exceto a primeira
      images.forEach((img, index) => {
          img.style.position = 'absolute';
          img.style.top = '0';
          img.style.left = '0';
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.opacity = index === 0 ? '1' : '0';
          img.style.transition = 'opacity 0.5s ease-in-out';
      });
      
      // Auto-play simples
      let autoPlayInterval = setInterval(() => {
          nextSlide();
      }, 4000);
      
      function nextSlide() {
          images[currentIndex].style.opacity = '0';
          currentIndex = (currentIndex + 1) % images.length;
          images[currentIndex].style.opacity = '1';
      }
      
      // Pausa no hover
      container.addEventListener('mouseenter', () => {
          clearInterval(autoPlayInterval);
      });
      
      container.addEventListener('mouseleave', () => {
          autoPlayInterval = setInterval(nextSlide, 4000);
      });
      
      // Suporte a touch para mobile
      let startX = 0;
      let endX = 0;
      
      container.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
          clearInterval(autoPlayInterval);
      });
      
      container.addEventListener('touchend', (e) => {
          endX = e.changedTouches[0].clientX;
          handleSwipe();
          autoPlayInterval = setInterval(nextSlide, 4000);
      });
      
      function handleSwipe() {
          const swipeThreshold = 50;
          
          if (startX - endX > swipeThreshold) {
              // Swipe left - next
              nextSlide();
          } else if (endX - startX > swipeThreshold) {
              // Swipe right - previous
              images[currentIndex].style.opacity = '0';
              currentIndex = (currentIndex - 1 + images.length) % images.length;
              images[currentIndex].style.opacity = '1';
          }
      }
  }
});

// Melhorias de acessibilidade
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
      // Adiciona atributos ARIA
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', 'false');
      
      if (button.classList.contains('active')) {
          button.setAttribute('aria-selected', 'true');
      }
      
      // Navegação por teclado
      button.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              button.click();
          }
      });
  });
});