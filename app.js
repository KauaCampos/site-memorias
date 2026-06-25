/* ==========================================================================
   APP.JS — lê o objeto DADOS (de dados.js) e monta a página
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderizarCapa();
  renderizarContador();
  renderizarTimeline();
  renderizarLivro();
  renderizarGaleria();
  renderizarFechamento();
  ativarReveal();
  ativarProgressoTimeline();
});

/* -------------------- CAPA -------------------- */
function renderizarCapa() {
  const { nomeDela, nomeDele, fraseAbertura, fotoCapa } = DADOS.capa;
  document.getElementById('capaNomeDele').textContent = nomeDele;
  document.getElementById('capaNomeDela').textContent = nomeDela;
  document.getElementById('capaFrase').textContent = fraseAbertura;

  if (fotoCapa) {
    const capa = document.getElementById('capa');
    capa.style.backgroundImage = `linear-gradient(180deg, rgba(27,14,20,0.55) 0%, rgba(27,14,20,0.88) 100%), url('${fotoCapa}')`;
  }
}

/* -------------------- CONTADOR DE DIAS -------------------- */
function renderizarContador() {
  document.getElementById('contadorTitulo').textContent = DADOS.contador.tituloContador;
  atualizarContador();
  setInterval(atualizarContador, 1000 * 60); // atualiza a cada minuto
}

function atualizarContador() {
  const inicio = new Date(DADOS.contador.dataInicio + 'T00:00:00');
  const agora = new Date();
  let diffMs = agora - inicio;

  if (diffMs < 0) diffMs = 0;

  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const anos = Math.floor(dias / 365);
  const meses = Math.floor((dias % 365) / 30);
  const diasRestantes = dias - (anos * 365 + meses * 30);

  const blocos = [
    { numero: anos, rotulo: anos === 1 ? 'ano' : 'anos' },
    { numero: meses, rotulo: meses === 1 ? 'mês' : 'meses' },
    { numero: diasRestantes < 0 ? 0 : diasRestantes, rotulo: 'dias' },
  ];

  const container = document.getElementById('contadorNumeros');
  container.innerHTML = blocos.map(b => `
    <div class="contador-bloco">
      <span class="contador-numero">${b.numero}</span>
      <span class="contador-rotulo-pequeno">${b.rotulo}</span>
    </div>
  `).join('');
}

/* -------------------- TIMELINE -------------------- */
function renderizarTimeline() {
  const lista = document.getElementById('timelineLista');
  lista.innerHTML = DADOS.timeline.map(item => `
    <div class="timeline-item reveal">
      <div class="timeline-ponto"></div>
      <p class="timeline-data">${item.data}</p>
      <h3 class="timeline-titulo">${item.titulo}</h3>
      <p class="timeline-texto">${item.texto}</p>
      ${item.foto ? `<img class="timeline-foto" src="${item.foto}" alt="${item.titulo}" loading="lazy">` : ''}
    </div>
  `).join('');
}

function ativarProgressoTimeline() {
  const progresso = document.getElementById('timelineProgresso');
  const trilho = document.querySelector('.timeline-trilho');
  if (!trilho) return;

  function atualizar() {
    const rect = trilho.getBoundingClientRect();
    const alturaJanela = window.innerHeight;
    const inicioVisivel = alturaJanela * 0.7;

    let progressoPx = inicioVisivel - rect.top;
    progressoPx = Math.max(0, Math.min(progressoPx, rect.height));
    const porcentagem = (progressoPx / rect.height) * 100;
    progresso.style.height = porcentagem + '%';

    document.querySelectorAll('.timeline-item').forEach(item => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < inicioVisivel) {
        item.classList.add('ativo');
      }
    });
  }

  window.addEventListener('scroll', atualizar);
  window.addEventListener('resize', atualizar);
  atualizar();
}

/* -------------------- LIVRO DE CARTAS -------------------- */
let paginaAtual = 0;

function renderizarLivro() {
  const livro = document.getElementById('livro');
  const total = DADOS.cartas.length;

  livro.innerHTML = DADOS.cartas.map((carta, i) => `
    <div class="pagina" style="z-index:${total - i}" data-indice="${i}">
      <p class="pagina-titulo">${carta.titulo}</p>
      <p class="pagina-texto">${carta.texto}</p>
      <span class="pagina-numero">${i + 1} / ${total}</span>
    </div>
  `).join('');

  document.getElementById('btnAnterior').addEventListener('click', () => mudarPagina(-1));
  document.getElementById('btnProxima').addEventListener('click', () => mudarPagina(1));

  atualizarIndicadorLivro();
}

function mudarPagina(direcao) {
  const total = DADOS.cartas.length;
  const novaPagina = paginaAtual + direcao;
  if (novaPagina < 0 || novaPagina > total) return;

  const paginas = document.querySelectorAll('.pagina');

  if (direcao > 0 && paginaAtual < total) {
    paginas[paginaAtual].classList.add('virada');
  } else if (direcao < 0 && novaPagina < total) {
    paginas[novaPagina].classList.remove('virada');
  }

  paginaAtual = novaPagina;
  atualizarIndicadorLivro();
}

function atualizarIndicadorLivro() {
  const total = DADOS.cartas.length;
  document.getElementById('livroIndicador').textContent =
    paginaAtual >= total ? 'fim' : `${paginaAtual + 1} de ${total}`;
  document.getElementById('btnAnterior').disabled = paginaAtual === 0;
  document.getElementById('btnProxima').disabled = paginaAtual >= total;
}

/* -------------------- GALERIA -------------------- */
function renderizarGaleria() {
  const grid = document.getElementById('galeriaGrid');
  grid.innerHTML = DADOS.galeria.map((foto, i) => `
    <div class="galeria-item reveal" data-indice="${i}">
      <img src="${foto.src}" alt="${foto.legenda || 'foto'}" loading="lazy">
      ${foto.legenda ? `<span class="galeria-legenda">${foto.legenda}</span>` : ''}
    </div>
  `).join('');

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  grid.querySelectorAll('.galeria-item').forEach((item, i) => {
    item.addEventListener('click', () => {
      lightboxImg.src = DADOS.galeria[i].src;
      lightboxImg.alt = DADOS.galeria[i].legenda || '';
      lightbox.classList.add('aberto');
    });
  });

  document.getElementById('lightboxFechar').addEventListener('click', () => {
    lightbox.classList.remove('aberto');
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('aberto');
  });
}

/* -------------------- FECHAMENTO -------------------- */
function renderizarFechamento() {
  const { titulo, texto, fotoFinal } = DADOS.fechamento;
  document.getElementById('fechamentoTitulo').textContent = titulo;
  document.getElementById('fechamentoTexto').textContent = texto;
  document.getElementById('fechamentoAssinatura').textContent =
    `— ${DADOS.capa.nomeDele}, seu benzinho <3`;

  const img = document.getElementById('fechamentoFoto');
  if (fotoFinal) {
    img.src = fotoFinal;
    img.alt = 'foto final';
  } else {
    img.style.display = 'none';
  }
}

/* -------------------- REVEAL AO ROLAR -------------------- */
function ativarReveal() {
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('ativo');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
