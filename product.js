const grid=document.getElementById('productGrid');
const search=document.getElementById('productSearch');
const filter=document.getElementById('productFilter');
const empty=document.getElementById('emptyState');
const modal=document.getElementById('productModal');
const modalTitle=document.getElementById('modalTitle');
const modalText=document.getElementById('modalText');
const modalPrice=document.getElementById('modalPrice');
const modalImage=document.getElementById('modalImage');
const modalOfficial=document.getElementById('modalOfficial');
function render(){
 const q=search.value.trim().toLowerCase(); const f=filter.value;
 grid.innerHTML=''; let count=0;
 VITAL_LIFE_PRODUCTS.forEach((p,i)=>{
   const hit=!q || `${p.name} ${p.jp} ${p.category} ${p.desc}`.toLowerCase().includes(q);
   const cat=f==='all'||p.category===f; if(!hit||!cat)return; count++;
   const card=document.createElement('article'); card.className='product-card';
   card.innerHTML=`
    <div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="image-fallback">ReFa</div></div>
    <div class="product-number">${String(i+1).padStart(2,'0')}</div>
    <div class="product-meta">${p.category}</div>
    <h3>${p.name}</h3>
    <div class="product-price">${p.price}</div>
    <p>${p.desc}</p>
    <div class="product-actions"><button class="detail-btn">詳細を見る</button><a class="official-link" href="${p.url}" target="_blank" rel="noopener">公式商品情報 ↗</a></div>`;
   card.querySelector('.detail-btn').addEventListener('click',()=>openModal(p)); grid.appendChild(card);
 }); empty.style.display=count?'none':'block';
}
function openModal(p){
 modalTitle.textContent=p.name; modalText.textContent=p.desc; modalPrice.textContent=p.price; modalImage.src=p.image; modalImage.alt=p.name; modalOfficial.href=p.url;
 modal.setAttribute('aria-hidden','false'); modal.classList.add('is-open');
}
function closeModal(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');}
search.addEventListener('input',render);filter.addEventListener('change',render);document.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
render();
