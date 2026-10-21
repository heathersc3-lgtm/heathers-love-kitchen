/* Halloween add-on for Heather's Love Kitchen: active only before Nov 1, 2026 (visitor's local time).
   On/after Nov 1 this script does nothing and the site looks exactly as it normally does. */
(function(){
  var END=new Date(2026,10,1,0,0,0); // Nov 1 2026, local time
  var now=new Date();
  var t=/[?&]hlk_test_date=([0-9-]+)/.exec(location.search); // preview/testing override only
  if(t){var p=t[1].split('-');now=new Date(+p[0],p[1]-1,+p[2],12);}
  if(!(now<END))return;
  var V='?v=hw3';
  document.documentElement.classList.add('halloween');
  function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html)e.innerHTML=html;e.setAttribute('aria-hidden','true');return e;}
  var MOON='<svg class="hw-glyph" viewBox="0 0 24 24" width="18" height="18"><path d="M15 3a9 9 0 1 0 6 15.5A7.5 7.5 0 0 1 15 3z" fill="#f1e6cf"/></svg>';
  var BAT='<svg class="hw-glyph" viewBox="-11 -6 22 10" width="26" height="12"><path fill="#c9b6f2" d="M0,0 C-2,-3 -6,-5 -10,-3 C-8,-2 -8.5,0 -9.5,2 C-7,0.5 -5,1.5 -3,3 C-2,1.5 -1,1 0,2 C1,1 2,1.5 3,3 C5,1.5 7,0.5 9.5,2 C8.5,0 8,-2 10,-3 C6,-5 2,-3 0,0 Z"/></svg>';
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.createElement('div');b.className='hw-banner';b.setAttribute('role','note');
    b.innerHTML=MOON+'<span>Happy Halloween from Heather&#39;s Love Kitchen</span>'+BAT;
    document.body.insertBefore(b,document.body.firstChild);
    var hero=document.querySelector('.hero');
    if(hero){hero.insertBefore(el('div','hw-deco',
      '<div class="hw-ground"></div><img class="hw-scene" src="assets/hw-scene.svg'+V+'" alt="">'+
      '<div class="hw-fog f1"></div><div class="hw-fog f2"></div>'+
      '<img class="hw-witch" src="assets/hw-witch.svg'+V+'" alt="">'),hero.firstChild);}
    var foot=document.querySelector('.footer');
    if(foot){foot.insertBefore(el('div','hw-circle-wrap','<img class="hw-circle" src="assets/hw-circle.svg'+V+'" alt="">'),foot.firstChild);
      foot.appendChild(el('img','hw-hand')).src='assets/hw-hand.svg'+V;}
  });
})();
