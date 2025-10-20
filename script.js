// fetch data.json dan render tree
async function load() {
  const res = await fetch('data.json');
  const data = await res.json();
  const container = document.getElementById('tree');
  container.appendChild(buildList(data));
}
function buildList(node) {
  const ul = document.createElement('ul');
  ul.className = 'tree';
  const li = document.createElement('li');

  const card = document.createElement('div');
  card.className = 'node';

  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = node.name || '—';

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = node.spouse ? `Spouse: ${node.spouse}` : (node.born ? `Lahir: ${node.born}` : '');

  card.appendChild(name);
  if(meta.textContent) card.appendChild(meta);

  card.addEventListener('click', (e) => {
    e.stopPropagation();
    showDetail(node);
  });

  li.appendChild(card);

  if (node.children && node.children.length) {
    const childrenUl = document.createElement('ul');
    node.children.forEach(child => {
      const childLi = document.createElement('li');
      childLi.appendChild(buildList(child));
      childrenUl.appendChild(childLi);
    });
    li.appendChild(childrenUl);
  }
  ul.appendChild(li);
  return ul;
}

function showDetail(node){
  const modal = document.getElementById('modal');
  const detail = document.getElementById('detail');
  detail.innerHTML = `<h3>${node.name || ''}</h3>
    <p>${node.born ? 'Lahir: ' + node.born + '<br>' : ''}${node.spouse ? 'Pasangan: ' + node.spouse : ''}</p>
    <p>Jumlah anak: ${node.children ? node.children.length : 0}</p>`;
  modal.classList.remove('hidden');
}
document.getElementById && document.getElementById('close')?.addEventListener('click', ()=> {
  document.getElementById('modal').classList.add('hidden');
});

load().catch(err => {
  console.error(err);
  const tree = document.getElementById('tree');
  tree.innerHTML = '<p style="color:#900">Gagal load data. Kalau lagi buka file lokal (file://) pakai simple server atau deploy ke GitHub Pages.</p>';
});
