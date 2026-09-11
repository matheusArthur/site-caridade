(() => {
  const options = {
    alimentos: {tag:'Alimento é cuidado', title:'Mais alimento. Mais possibilidades.', description:'Arroz, feijão e outros alimentos não perecíveis podem fazer parte de uma cesta de apoio. Confira a validade e mantenha as embalagens fechadas.', tip:'Antes de doar: confira a validade e o estado da embalagem.', image:'caridade-alimentos.png', alt:'Alimentos organizados para doação', label:'Doar alimentos', href:'doacao.html'},
    roupas: {tag:'Um novo capítulo', title:'O que aqueceu você pode aquecer alguém.', description:'Roupas, casacos e calçados em bom estado podem ganhar uma nova história. Separe peças limpas e prontas para o uso.', tip:'Antes de doar: confira a limpeza e as condições das peças.', image:'roupas-organizadas-v2.png', alt:'Voluntários separando casacos e roupas em bom estado', label:'Doar roupas', href:'doacao.html'},
    higiene: {tag:'Cuidado no dia a dia', title:'O essencial também faz a diferença.', description:'Sabonetes, creme dental e outros itens de higiene fazem parte do cuidado diário. Produtos fechados e dentro da validade são uma boa forma de contribuir.', tip:'Antes de doar: prefira produtos lacrados e dentro da validade.', image:'caridade-higiene.png', alt:'Itens de higiene pessoal organizados em kits', label:'Doar itens de higiene', href:'doacao.html'},
    tempo: {tag:'Presença que transforma', title:'A sua presença também é uma doação.', description:'Compartilhe habilidades, conheça as ações e descubra como participar. Organização, escuta e disposição para colaborar também fazem parte da solidariedade.', tip:'Comece conhecendo as formas de participação no projeto.', image:'caridade-voluntarios.png', alt:'Pessoas colaborando em uma ação comunitária', label:'Conhecer o voluntariado', href:'voluntariado.html'}
  };
  const tabs = Array.from(document.querySelectorAll('[data-giving]'));
  const panel = document.getElementById('giving-panel');
  function selectTab(tab) {
    const option = options[tab.dataset.giving];
    if (!option || !panel) return;
    tabs.forEach(button => { const selected = button === tab; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; });
    panel.setAttribute('aria-labelledby', tab.id);
    ['tag','title','description','tip'].forEach(key => { document.getElementById('giving-' + key).textContent = option[key]; });
    const photo = document.getElementById('giving-photo'); photo.src = '../img/' + option.image; photo.alt = option.alt;
    const link = document.getElementById('giving-link'); link.href = option.href; link.textContent = option.label + ' ↗';
    document.getElementById('giving-index').textContent = String(tabs.indexOf(tab) + 1).padStart(2, '0') + ' / 04';
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); selectTab(tabs[next]); tabs[next].focus();
    });
  });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(element => { element.classList.add('reveal-ready'); observer.observe(element); });
  }
})();
