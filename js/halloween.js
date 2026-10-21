/* Halloween add-on: active only before Nov 1, 2026 (visitor's local time). Afterwards it does nothing. */
(function(){
  var END=new Date(2026,10,1,0,0,0); // Nov 1 2026 local
  var now=new Date();
  var t=/[?&]hlk_test_date=([0-9-]+)/.exec(location.search); // preview/testing override only
  if(t){var p=t[1].split('-');now=new Date(+p[0],p[1]-1,+p[2],12);}
  if(!(now<END))return;
  var s=document.currentScript, font=s&&s.getAttribute('data-font');
  document.documentElement.classList.add('halloween');
  if(font){var l=document.createElement('link');l.rel='stylesheet';l.href=font;document.head.appendChild(l);}
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.createElement('div');b.className='hw-banner';b.setAttribute('role','note');
    b.textContent=(s&&s.getAttribute('data-banner'))||"Happy Halloween from Heather's Love Kitchen 🎃";
    document.body.insertBefore(b,document.body.firstChild);
    var d=document.createElement('div');d.className='hw-deco';d.setAttribute('aria-hidden','true');
    d.innerHTML=(s&&s.getAttribute('data-deco'))||'';
    var hero=document.querySelector('.hero');if(hero)hero.appendChild(d);
  });
})();
