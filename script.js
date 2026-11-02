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

const music = document.querySelector('#wedding-music');
const musicToggle = document.querySelector('#music-toggle');
const musicStatus = document.querySelector('#music-status');
let musicStarting = false;
function syncMusicControl() {
 const playing = !music.paused;
 musicToggle.textContent = playing ? 'Pause music' : 'Play music';
 musicToggle.setAttribute('aria-pressed', String(playing));
}
async function startMusic(automatic = false) {
 if (musicStarting) return;
 musicStarting = true;
 musicStatus.textContent = '';
 try { await music.play(); }
 catch (error) {
  if (!automatic) musicStatus.textContent = error.name === 'NotAllowedError'
   ? 'Tap Play music to listen.'
   : 'Music could not load. Please try again.';
 } finally { musicStarting = false; syncMusicControl(); }
}
musicToggle.addEventListener('click', () => {
 if (musicStarting) return;
 if (music.paused) startMusic();
 else music.pause();
});
music.addEventListener('play', syncMusicControl);
music.addEventListener('pause', syncMusicControl);
music.addEventListener('error', () => {
 musicStatus.textContent = 'Music could not load. Please try again.';
 syncMusicControl();
});
music.volume = 0.5;
const welcome = document.querySelector('#welcome');
const openInvitation = document.querySelector('#open-invitation');
let invitationOpening = false;
function revealInvitation(withMusic) {
 if (invitationOpening) return;
 invitationOpening = true;
 // Invoke play directly in the tap handler, before any animation or await.
 if (withMusic) startMusic();
 welcome.classList.add('opening');
 window.setTimeout(() => {
  welcome.close();
  document.body.classList.remove('welcome-active');
  const title = document.querySelector('.hero h1');
  title.setAttribute('tabindex', '-1');
  title.focus({preventScroll: true});
 }, reduced ? 160 : 1000);
}
openInvitation.addEventListener('click', () => revealInvitation(true));
welcome.addEventListener('cancel', event => {
 event.preventDefault();
 revealInvitation(false);
});
if (typeof welcome.showModal === 'function') {
 welcome.showModal();
 document.body.classList.add('welcome-active');
}
