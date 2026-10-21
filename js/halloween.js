/* Halloween add-on for Heather's Love Kitchen: active only before Nov 1, 2026 (visitor's local time).
   On/after Nov 1 this script does nothing and the site looks exactly as it normally does. */
(function(){
  var END=new Date(2026,10,1,0,0,0); // Nov 1 2026, local time
  var now=new Date();
  var t=/[?&]hlk_test_date=([0-9-]+)/.exec(location.search); // preview/testing override only
  if(t){var p=t[1].split('-');now=new Date(+p[0],p[1]-1,+p[2],12);}
  if(!(now<END))return;
  var s=document.currentScript;
  document.documentElement.classList.add('halloween');
  function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html)e.innerHTML=html;e.setAttribute('aria-hidden','true');return e;}
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.createElement('div');b.className='hw-banner';b.setAttribute('role','note');
    b.textContent=(s&&s.getAttribute('data-banner'))||"Happy Halloween from Heather's Love Kitchen";
    document.body.insertBefore(b,document.body.firstChild);
    var hero=document.querySelector('.hero');
    if(hero){hero.appendChild(el('div','hw-deco',
      '<span class="bat b1">🦇</span><span class="bat b2">🦇</span><span class="bat b3">🦇</span>'+
      '<span class="ghost">👻</span><span class="p1">🎃</span><span class="p2">🎃</span>'+
      '<img class="hw-witch" src="assets/hw-witch.svg?v=hw2" alt="">'));}
    var foot=document.querySelector('.footer');
    if(foot){var bats='';for(var i=1;i<=7;i++)bats+='<img class="hw-cbat c'+i+'" src="assets/hw-bat.svg?v=hw2" alt="">';
      foot.insertBefore(el('div','hw-cave','<img class="hw-circle" src="assets/hw-circle.svg?v=hw2" alt=""><img class="hw-cave-rock" src="assets/hw-cave.svg?v=hw2" alt="">'+bats),foot.firstChild);}
  });
})();
