/* GAMEVERSE - script.js (JavaScript puro) */
'use strict';

/* ---------- Dados dos jogos (modal) ----------
   Sinopses sem spoilers. Datas e plataformas marcadas com "confirmar"
   devem ser conferidas nos canais oficiais. O Zelda Remake é PLACEHOLDER. */
const GAMES = {
  gta6: {
    name: 'Grand Theft Auto VI', genre: 'Ação, aventura, mundo aberto', dev: 'Rockstar Games',
    platforms: 'PlayStation 5, Xbox Series X|S (confirmar PC)', date: 'Data sujeita a mudanças: confirmar no site oficial da Rockstar',
    synopsis: 'Ambientado no estado fictício de Leonida, inspirado na Flórida, o jogo acompanha uma dupla de protagonistas que tenta sobreviver num mundo de crime, mídia e oportunismo.',
    context: 'A trama gira em torno de uma parceria forjada sob pressão, em que cada decisão aproxima os dois de um estilo de vida cada vez mais arriscado.',
    setting: 'Leonida, com a Vice City moderna e áreas rurais, pântanos e ilhas ao redor.',
    chars: ['Lucia Caminos', 'Jason Duval'],
    goals: ['Explorar um mundo aberto vivo e detalhado', 'Cumprir missões e assaltos em dupla', 'Construir reputação e recursos']
  },
  zelda: {
    name: 'The Legend of Zelda: Ocarina of Time Remake', genre: 'Ação e aventura', dev: 'Nintendo (placeholder)',
    platforms: 'A definir (placeholder)', date: 'Sem data confirmada',
    synopsis: 'Tratado aqui como REMAKE do clássico de 1998. Este card é um placeholder: não há dados oficiais confirmados. A base narrativa do jogo original acompanha Link, um jovem de Hyrule que parte numa jornada para impedir que uma força sombria domine o reino.',
    context: 'A história envolve a Triforce, a Princesa Zelda e viagens entre dois períodos da história de Hyrule.',
    setting: 'O reino de Hyrule, com florestas, montanhas, vilas e masmorras.',
    chars: ['Link', 'Princesa Zelda', 'Navi'],
    goals: ['Explorar Hyrule e suas masmorras', 'Resolver enigmas com a ocarina', 'Reunir aliados e itens importantes']
  },
  wolverine: {
    name: "Marvel's Wolverine", genre: 'Ação e aventura', dev: 'Insomniac Games',
    platforms: 'PlayStation 5', date: 'Previsto para 2026 (confirmar data no site oficial)',
    synopsis: 'Logan viaja por diferentes lugares do mundo enfrentando ameaças e perseguindo respostas sobre o próprio passado, em uma aventura de ação em terceira pessoa com combate intenso.',
    context: 'A narrativa foca no lado mais sombrio e humano do herói, longe do trabalho em equipe dos X-Men.',
    setting: 'Cenários do universo Marvel, de grandes cidades a regiões remotas.',
    chars: ['Logan / Wolverine', 'Mystique'],
    goals: ['Dominar o combate com garras e fator de cura', 'Investigar pistas do passado', 'Enfrentar inimigos poderosos']
  },
  ds2: {
    name: 'Death Stranding 2: On The Beach', genre: 'Ação, ficção científica, mundo aberto', dev: 'Kojima Productions',
    platforms: 'PlayStation 5 (confirmar outras plataformas)', date: '2025 no PlayStation 5 (confirmar demais plataformas)',
    synopsis: 'Sam Porter Bridges retoma a missão de reconectar sociedades isoladas, agora em territórios novos, num mundo marcado por criaturas do além e por ameaças humanas.',
    context: 'A sequência expande a ideia de laços entre pessoas e de reconstrução num mundo fragmentado.',
    setting: 'Regiões variadas e hostis, com clima extremo e áreas de forte presença sobrenatural.',
    chars: ['Sam Porter Bridges', 'Fragile', 'Tomorrow'],
    goals: ['Entregar cargas atravessando terrenos difíceis', 'Conectar novas regiões à rede', 'Preparar-se para ameaças imprevisíveis']
  },
  re: {
    name: 'Resident Evil Requiem', genre: 'Terror de sobrevivência, ação', dev: 'Capcom',
    platforms: 'PlayStation 5, Xbox Series X|S e PC (confirmar)', date: '2026 (confirmar data no site oficial)',
    synopsis: 'Um novo capítulo da saga leva a analista Grace Ashcroft e o veterano Leon S. Kennedy a investigar um mistério ligado a Raccoon City, em meio à tensão e ao horror típicos da série.',
    context: 'A história retoma o passado da cidade que marcou a franquia.',
    setting: 'Locais sombrios e opressivos, com ligação a Raccoon City.',
    chars: ['Grace Ashcroft', 'Leon S. Kennedy'],
    goals: ['Sobreviver gerenciando recursos escassos', 'Resolver enigmas e explorar ambientes', 'Descobrir o que aconteceu no local']
  },
  crimson: {
    name: 'Crimson Desert', genre: 'RPG de ação, mundo aberto', dev: 'Pearl Abyss',
    platforms: 'PlayStation 5, Xbox Series X|S e PC (confirmar)', date: '2026 (confirmar data no site oficial)',
    synopsis: 'Em Pywel, um continente tomado por conflitos, o mercenário Kliff luta para proteger seu grupo e reconstruir o que restou, num mundo aberto de combate físico e exploração.',
    context: 'O jogo mistura facções em guerra, aventuras pessoais e ameaças que mudam o equilíbrio de poder.',
    setting: 'Pywel, com planícies, montanhas, vilas, fortalezas e territórios selvagens.',
    chars: ['Kliff', 'Os Greymanes'],
    goals: ['Explorar o continente de Pywel', 'Enfrentar inimigos e chefes em combate dinâmico', 'Fortalecer seu grupo']
  }
};

/* ---------- Utilitários ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage indisponível */ } }
};
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Temas ---------- */
const THEMES = ['neon', 'blue', 'crimson'];
const THEME_NAMES = { neon: 'Dark Neon', blue: 'Cyber Blue', crimson: 'Dark Crimson' };
function applyTheme(t) {
  if (!THEMES.includes(t)) t = 'neon';
  document.documentElement.dataset.theme = t;
  $('#themeBtn').title = 'Tema atual: ' + THEME_NAMES[t];
  store.set('gv_theme', t);
}
applyTheme(store.get('gv_theme', 'neon'));
$('#themeBtn').addEventListener('click', () => {
  const i = THEMES.indexOf(document.documentElement.dataset.theme);
  applyTheme(THEMES[(i + 1) % THEMES.length]);
});

/* ---------- Menu mobile ---------- */
const burger = $('#burger'), nav = $('#nav');
function toggleMenu(open) {
  nav.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
}
burger.addEventListener('click', () => toggleMenu(!nav.classList.contains('open')));
$$('a', nav).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

/* ---------- Imagens ausentes: mostra um espaço reservado, sem imagem genérica ---------- */
$$('.media').forEach(m => {
  const imgs = $$('img', m);
  const check = () => m.classList.toggle('noimg', imgs.every(i => i.classList.contains('broken')));
  imgs.forEach(i => {
    i.addEventListener('error', () => { i.classList.add('broken'); check(); });
    if (i.complete && i.naturalWidth === 0 && i.getAttribute('src')) { i.classList.add('broken'); }
  });
  check();
});

/* ---------- Avaliações (localStorage) ----------
   gv_votes: { idDoJogo: [notas de todos os votos registrados neste navegador] }
   gv_mine:  { idDoJogo: nota do usuário }  */
const votes = store.get('gv_votes', {});
const mine = store.get('gv_mine', {});
const validNotes = arr => (Array.isArray(arr) ? arr : []).filter(n => Number.isInteger(n) && n >= 1 && n <= 5);

function roStars(avg) {
  return `<span class="stars-ro" aria-hidden="true">★★★★★<b style="width:${(avg / 5) * 100}%">★★★★★</b></span>`;
}
function avgHTML(id) {
  const list = validNotes(votes[id]);
  if (!list.length) return '<span>Sem avaliações</span>';
  const avg = list.reduce((a, b) => a + b, 0) / list.length;
  return `${roStars(avg)}<span><strong>${avg.toFixed(1)}</strong>/5 — ${list.length} ${list.length === 1 ? 'avaliação' : 'avaliações'}</span>`;
}
function rateHTML(id) {
  const n = mine[id] || 0;
  let h = '';
  for (let i = 1; i <= 5; i++) h += `<button type="button" class="star${i <= n ? ' on' : ''}" data-v="${i}" aria-label="${i} ${i === 1 ? 'estrela' : 'estrelas'}">★</button>`;
  return h + `<span class="rate-label">${n ? 'Sua nota: ' + n + '/5' : 'Avalie'}</span>`;
}
function paint(box, v) { $$('.star', box).forEach(s => s.classList.toggle('on', +s.dataset.v <= v)); }

function bindRate(box, id) {
  box.addEventListener('mouseover', e => { const s = e.target.closest('.star'); if (s) paint(box, +s.dataset.v); });
  box.addEventListener('mouseleave', () => paint(box, mine[id] || 0));
  box.addEventListener('click', e => {
    const s = e.target.closest('.star'); if (!s) return;
    const v = +s.dataset.v;
    const list = validNotes(votes[id]);
    if (mine[id]) { const idx = list.indexOf(mine[id]); if (idx > -1) list.splice(idx, 1); }
    list.push(v); votes[id] = list; mine[id] = v;
    store.set('gv_votes', votes); store.set('gv_mine', mine);
    refreshRatings(id);
  });
}
function refreshRatings(id) {
  $$(`[data-rating-for="${id}"]`).forEach(el => { el.innerHTML = rateHTML(id); });
  $$(`[data-avg-for="${id}"]`).forEach(el => { el.innerHTML = avgHTML(id); });
}

$$('.card').forEach(card => {
  const id = card.dataset.id;
  const avg = $('.avg', card), rate = $('.rate', card);
  avg.dataset.avgFor = id; rate.dataset.ratingFor = id;
  avg.innerHTML = avgHTML(id); rate.innerHTML = rateHTML(id);
  bindRate(rate, id);
});

/* ---------- Pesquisa + filtros combinados ---------- */
const cards = $$('.card');
let genre = 'todos';
function applyFilters() {
  const q = norm($('#search').value.trim());
  let shown = 0;
  cards.forEach(c => {
    const ok = norm(c.dataset.name).includes(q) && (genre === 'todos' || c.dataset.genres.split(' ').includes(genre));
    c.hidden = !ok; if (ok) shown++;
  });
  $('#empty').hidden = shown > 0;
}
$('#search').addEventListener('input', applyFilters);
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  genre = b.dataset.g;
  $$('.chip').forEach(c => c.classList.toggle('active', c === b));
  applyFilters();
});

/* ---------- Animação de entrada (IntersectionObserver) ---------- */
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));
} else { $$('.reveal').forEach(el => el.classList.add('in')); }

/* ---------- Modal ---------- */
const modal = $('#modal'), mcontent = $('#mcontent');
let lastFocus = null;
function openModal(id) {
  const g = GAMES[id], card = $(`.card[data-id="${id}"]`); if (!g || !card) return;
  const [a, b] = $$('img', card);
  const li = arr => arr.map(x => `<li>${esc(x)}</li>`).join('');
  mcontent.innerHTML = `
    <h2>${esc(g.name)}</h2>
    <div class="m-imgs">
      <div class="media" data-label="${esc(g.name)}"><img src="${esc(a.getAttribute('src'))}" alt="${esc(a.alt)}"></div>
      <div class="media" data-label="${esc(g.name)}"><img src="${esc(b.getAttribute('src'))}" alt="${esc(b.alt)}"></div>
    </div>
    <div class="facts">
      <div><span>Gênero</span>${esc(g.genre)}</div>
      <div><span>Desenvolvedora</span>${esc(g.dev)}</div>
      <div><span>Plataformas</span>${esc(g.platforms)}</div>
      <div><span>Lançamento</span>${esc(g.date)}</div>
    </div>
    <h4>SINOPSE</h4><p>${esc(g.synopsis)}</p>
    <h4>CONTEXTO NARRATIVO</h4><p>${esc(g.context)}</p>
    <h4>AMBIENTAÇÃO</h4><p>${esc(g.setting)}</p>
    <h4>PERSONAGENS IMPORTANTES</h4><ul>${li(g.chars)}</ul>
    <h4>OBJETIVOS PRINCIPAIS</h4><ul>${li(g.goals)}</ul>
    <h4>AVALIAÇÃO</h4>
    <div class="avg" data-avg-for="${id}">${avgHTML(id)}</div>
    <div class="rate" data-rating-for="${id}">${rateHTML(id)}</div>
    <p class="m-warn">Sinopse sem spoilers. Informações marcadas com "confirmar" ou "placeholder" não são oficiais.</p>`;
  $$('.media', mcontent).forEach(m => {
    const img = $('img', m);
    img.addEventListener('error', () => m.classList.add('noimg'));
    if (img.complete && img.naturalWidth === 0) m.classList.add('noimg');
  });
  bindRate($('.rate', mcontent), id);
  lastFocus = document.activeElement;
  modal.hidden = false; document.body.style.overflow = 'hidden';
  $('#mclose').focus();
}
function closeModal() {
  modal.hidden = true; document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}
$$('.details').forEach(btn => btn.addEventListener('click', () => openModal(btn.closest('.card').dataset.id)));
$('#mclose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

/* ---------- Comunidade ---------- */
let comments = store.get('gv_comments', []);
function renderComments() {
  const box = $('#clist');
  if (!comments.length) { box.innerHTML = '<p class="empty">Nenhum comentário ainda. Seja o primeiro a publicar!</p>'; return; }
  box.innerHTML = comments.map(c => `
    <article class="comment">
      <header><strong>${esc(c.user)}</strong><time datetime="${esc(c.iso)}">${esc(c.when)}</time></header>
      <p>${esc(c.msg)}</p>
    </article>`).join('');
}
$('#cform').addEventListener('submit', e => {
  e.preventDefault();
  const user = $('#cuser').value.trim(), msg = $('#cmsg').value.trim();
  if (!user || !msg) return;
  const now = new Date();
  comments.unshift({ user, msg, iso: now.toISOString(), when: now.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) });
  store.set('gv_comments', comments);
  renderComments();
  e.target.reset();
});
renderComments();

/* ---------- Footer ---------- */
$('#year').textContent = new Date().getFullYear();