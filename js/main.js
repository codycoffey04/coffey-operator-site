document.addEventListener('DOMContentLoaded',() => {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('quote-modal').classList.add('open');
    });
  });
  const close = document.querySelector('#quote-modal .close');
  if(close){ close.addEventListener('click', () => { document.getElementById('quote-modal').classList.remove('open'); }); }
});