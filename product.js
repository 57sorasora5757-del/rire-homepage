const grid = document.getElementById('productGrid');
const search = document.getElementById('productSearch');
const filter = document.getElementById('productFilter');
const empty = document.getElementById('emptyState');

const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalPrice = document.getElementById('modalPrice');
const modalImage = document.getElementById('modalImage');
const modalOfficial = document.getElementById('modalOfficial');

function createProductImage(product) {

  const wrap = document.createElement('div');
  wrap.className = 'product-image-wrap';

  const img = document.createElement('img');
  img.className = 'product-image';
  img.alt = product.name;
  img.loading = 'lazy';

  const fallback = document.createElement('div');
  fallback.className = 'image-fallback';

  fallback.innerHTML = `
    <div>
      <strong>ReFa</strong>
      <span>${product.jp}</span>
    </div>
  `;

  img.src = product.image;

  img.addEventListener('error', function () {
    img.style.display = 'none';
    fallback.style.display = 'grid';
  });

  wrap.appendChild(img);
  wrap.appendChild(fallback);

  return wrap;
}


function render() {

  const q = search.value.trim().toLowerCase();
  const f = filter.value;

  grid.innerHTML = '';

  let count = 0;

  VITAL_LIFE_PRODUCTS.forEach((p, i) => {

    const text = `
      ${p.name}
      ${p.jp}
      ${p.category}
      ${p.desc}
    `.toLowerCase();

    const hit = !q || text.includes(q);
    const categoryMatch = f === 'all' || p.category === f;

    if (!hit || !categoryMatch) {
      return;
    }

    count++;

    const card = document.createElement('article');
    card.className = 'product-card';

    const image = createProductImage(p);

    card.appendChild(image);

    const number = document.createElement('div');
    number.className = 'product-number';
    number.textContent = String(i + 1).padStart(2, '0');

    const meta = document.createElement('div');
    meta.className = 'product-meta';
    meta.textContent = p.category;

    const title = document.createElement('h3');
    title.textContent = p.name;

    const jp = document.createElement('div');
    jp.className = 'product-jp';
    jp.textContent = p.jp;

    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = p.price;

    const description = document.createElement('p');
    description.textContent = p.desc;

    const actions = document.createElement('div');
    actions.className = 'product-actions';

    const detailButton = document.createElement('button');
    detailButton.className = 'detail-btn';
    detailButton.type = 'button';
    detailButton.textContent = '詳細を見る';

    detailButton.addEventListener('click', function () {
      openModal(p);
    });

    const official = document.createElement('a');
    official.className = 'official-link';
    official.href = p.url;
    official.target = '_blank';
    official.rel = 'noopener noreferrer';
    official.textContent = '公式商品情報 ↗';

    actions.appendChild(detailButton);
    actions.appendChild(official);

    card.appendChild(number);
    card.appendChild(meta);
    card.appendChild(title);
    card.appendChild(jp);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(actions);

    grid.appendChild(card);
  });

  empty.style.display = count ? 'none' : 'block';
}


function openModal(p) {

  modalTitle.textContent = p.name;
  modalText.textContent = p.desc;
  modalPrice.textContent = p.price;

  modalImage.src = p.image;
  modalImage.alt = p.name;

  modalOfficial.href = p.url;

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('is-open');
}


function closeModal() {

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}


search.addEventListener('input', render);

filter.addEventListener('change', render);

document
  .querySelector('.modal-close')
  .addEventListener('click', closeModal);

modal.addEventListener('click', function (e) {

  if (e.target === modal) {
    closeModal();
  }

});


document.addEventListener('keydown', function (e) {

  if (e.key === 'Escape') {
    closeModal();
  }

});


render();
