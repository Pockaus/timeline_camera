document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalExtra = document.getElementById('modal-extra'); // Novo elemento para infos extras
  const modalClose = document.getElementById('modal-close');

  // Adicionando informações extras para o modal
  const extraInfo = {
    '1826': 'Esta foi a primeira fotografia permanente do mundo, criada com uma câmera obscura e uma placa de estanho sensibilizada. Um marco fundamental na história da fotografia.',
    'kodak': 'A Kodak revolucionou a fotografia ao tornar as câmeras acessíveis ao público em geral, iniciando a fotografia amadora e o conceito de "apertar o botão".',
    'security': 'As câmeras analógicas para segurança começaram a ser usadas em ambientes públicos e privados para vigilância, marcando o início da monitorização por vídeo.',
    'ccd': 'Sensores CCD trouxeram a captura eletrônica de imagens, que foi a base para o desenvolvimento das câmeras digitais que conhecemos hoje.',
    'digital': 'As câmeras digitais se popularizaram, permitindo que as pessoas vissem as fotos instantaneamente em visores LCD e armazenassem em cartões de memória, eliminando a necessidade de filmes.',
    'smartphone': 'A integração de câmeras em smartphones massificou a fotografia móvel, tornando-a acessível a bilhões de pessoas e impulsionando o compartilhamento em redes sociais.',
    'ai': 'A integração de inteligência artificial em câmeras trouxe recursos avançados como reconhecimento facial, detecção de objetos e automação de configurações, melhorando a qualidade e a funcionalidade.',
    'iot': 'Câmeras conectadas à internet, parte da Internet das Coisas (IoT), oferecem interfaces multimodais e abrem caminho para aplicações de realidade aumentada e monitoramento remoto avançado.',
  };

  // Clique na bolinha
  const circles = document.querySelectorAll('.timeline-item .circle');
  circles.forEach(circle => {
    circle.style.cursor = 'pointer'; // Adiciona cursor de ponteiro para indicar clicável
    circle.addEventListener('click', e => {
      e.stopPropagation(); // Evita que o clique na bolinha propague para o item pai

      const item = circle.parentElement; // Pega o item da linha do tempo pai
      const img = item.querySelector('.content img');
      const title = item.querySelector('.content h2').textContent;
      const description = item.querySelector('.content p').textContent;
      const id = circle.getAttribute('data-id'); // Pega o ID da bolinha

      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalExtra.textContent = extraInfo[id] || ''; // Preenche com info extra ou vazio

      modal.style.display = 'flex'; // Exibe o modal
      modalImage.classList.remove('zoomed'); // Garante que não comece com zoom
      modalImage.style.transform = 'scale(1)'; // Reseta o zoom da imagem
    });
  });

  // Fecha modal no X
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Fecha modal clicando fora do conteúdo
  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Zoom na imagem do modal com scroll do mouse
  let scale = 1;
  modalImage.addEventListener('wheel', (e) => {
    e.preventDefault(); // Impede o scroll da página

    const zoomSpeed = 0.1; // Velocidade do zoom
    
    if (e.deltaY < 0) { // Scroll para cima (zoom in)
      scale += zoomSpeed;
    } else { // Scroll para baixo (zoom out)
      scale -= zoomSpeed;
    }

    // Limita o zoom para não ficar muito pequeno ou muito grande
    scale = Math.max(0.5, Math.min(3, scale)); 
    modalImage.style.transform = `scale(${scale})`;
  });

  // Desativa o zoom da imagem ao fechar o modal
  modal.addEventListener('transitionend', () => {
    if (modal.style.display === 'none') {
      scale = 1; // Reseta o scale para 1
      modalImage.style.transform = 'scale(1)'; // Reseta a imagem para o tamanho original
    }
  });

});