const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduced) {
 document.documentElement.classList.add('js');
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}), {threshold:0.08});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
const dialog=document.querySelector('#lightbox');
const photos=[...document.querySelectorAll('[data-photo]')];
let current=0;
function showPhoto(index){current=(index+photos.length)%photos.length;const source=photos[current].querySelector('img');const image=document.querySelector('#large-photo');image.src=source.src;image.alt=source.alt;document.querySelector('#photo-count').textContent=`${current+1} / ${photos.length}`;}
photos.forEach((button,index)=>button.addEventListener('click',()=>{showPhoto(index);dialog.showModal();document.body.style.overflow='hidden';}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.querySelector('.previous').addEventListener('click',()=>showPhoto(current-1));
dialog.querySelector('.next').addEventListener('click',()=>showPhoto(current+1));
dialog.addEventListener('close',()=>{document.body.style.overflow='';photos[current].focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(current-1);}if(event.key==='ArrowRight'){event.preventDefault();showPhoto(current+1);}});
