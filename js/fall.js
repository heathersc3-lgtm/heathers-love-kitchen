/* Fall / harvest add-on for Heather's Love Kitchen: active ONLY Nov 1-30, 2026 (visitor's local time).
   Before Nov 1 and from Dec 1 this script does nothing and the site looks exactly as it otherwise would.
   Preview override (testing only): ?test_date=YYYY-MM-DD (or ?hlk_test_date=YYYY-MM-DD). */
(function(){
  var START=new Date(2026,10,1,0,0,0),END=new Date(2026,11,1,0,0,0); // Nov 1 - Nov 30 inclusive, local time
  var now=new Date(),t=/[?&](?:hlk_)?test_date=(\d{4})-(\d{1,2})-(\d{1,2})/.exec(location.search);
  if(t)now=new Date(+t[1],t[2]-1,+t[3],12);
  if(now<START||!(now<END))return;
  var root=document.documentElement;root.classList.add('fall');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  // ---- shared fall helpers (leaves + wind) ----
  var LEAF=[
    'M50 2L57 22 68 14 65 36 82 28 78 40 96 42 82 54 88 60 66 64 68 76 54 68 52 98 48 98 46 68 32 76 34 64 12 60 18 54 4 42 22 40 18 28 35 36 32 14 43 22Z',
    'M50 98V86C40 86 36 80 40 74 30 76 24 70 30 62 20 62 18 52 28 48 20 44 22 34 32 34 28 24 36 18 42 22 42 12 46 6 50 4 54 6 58 12 58 22 64 18 72 24 68 34 78 34 80 44 72 48 82 52 80 62 70 62 76 70 70 76 60 74 64 80 60 86 50 86Z',
    'M50 98C48 80 20 70 22 42 24 20 42 8 50 2 58 8 76 20 78 42 80 70 52 80 50 98Z'];
  var COL=['#B5401C','#D9782A','#E3A63E','#8E2C17','#A85A22','#C9902F'];
  function leafSVG(i,c,w){return '<svg viewBox="0 0 100 100" width="'+w+'" height="'+w+'" aria-hidden="true"><path d="'+LEAF[i%3]+'" fill="'+c+'"/><path d="M50 96V24" stroke="rgba(60,20,8,.45)" stroke-width="3" fill="none"/></svg>';}
  function leafLayer(n){
    var L=document.createElement('div');L.className='fl-leaves';L.setAttribute('aria-hidden','true');var h='';
    for(var i=0;i<n;i++){
      var r=function(a,b){return a+Math.random()*(b-a);};
      var d=r(13,24),st='left:'+r(-8,96).toFixed(1)+'%;--d:'+d.toFixed(1)+'s;--dl:-'+r(0,d).toFixed(1)+'s;--dx:'+r(60,240).toFixed(0)+'px;--sw:'+r(18,46).toFixed(0)+'px;--sd:'+r(2.6,4.6).toFixed(1)+'s;--rot:'+(Math.random()<.5?-1:1)*r(240,620).toFixed(0)+'deg;opacity:'+r(.7,.95).toFixed(2);
      h+='<span class="fl-leaf'+(i>=8?' fl-x':'')+'" style="'+st+'"><i>'+leafSVG(i,COL[i%COL.length],Math.round(r(20,40)))+'</i></span>';
    }
    L.innerHTML=h;return L;}
  var WIND='<svg class="fl-wind" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke-linecap="round">'+
    '<path class="w1" d="M-40 60C80 40 160 80 260 60S460 40 640 55"/>'+
    '<path class="w2" d="M-40 130C60 115 150 150 250 130S410 105 640 125"/>'+
    '<path class="w3" d="M80 170C170 158 260 182 360 166S500 150 560 160"/></g></svg>';
  var GARLAND=(function(){var s='<svg class="fl-garland" viewBox="0 0 280 34" width="280" height="34" aria-hidden="true"><path d="M6 20C60 4 100 32 140 18S220 6 274 20" stroke="#7a4a22" stroke-width="2" fill="none"/>',xs=[22,48,76,104,140,176,204,232,258];
    for(var i=0;i<xs.length;i++){var y=i%2?8:22,rot=(i%2?-30:28)+(i*7%20);s+='<g transform="translate('+(xs[i]-9)+' '+(y-6)+') rotate('+rot+' 9 9) scale(.18)"><path d="'+LEAF[i%3]+'" fill="'+COL[i%COL.length]+'"/></g>';}
    return s+'</svg>';})();
  var V='?v=fl1';
  document.addEventListener('DOMContentLoaded',function(){
    var b=document.createElement('div');b.className='fl-banner';b.setAttribute('role','note');
    b.innerHTML=leafSVG(0,'#E3A63E',16)+'<span>Happy Harvest Season<span class="fl-from"> from Heather&#39;s Love Kitchen</span></span>'+leafSVG(1,'#D9782A',16);
    document.body.insertBefore(b,document.body.firstChild);
    var hero=document.querySelector('.hero');
    if(hero){var d=document.createElement('div');d.className='fl-deco';d.setAttribute('aria-hidden','true');
      d.innerHTML='<div class="fl-sun"></div>'+WIND+'<img class="fl-scene" src="assets/fall-scene.svg'+V+'" alt="">';
      hero.insertBefore(d,hero.firstChild);}
    var foot=document.querySelector('.footer');
    if(foot){var g=document.createElement('div');g.className='fl-garland-wrap';g.setAttribute('aria-hidden','true');g.innerHTML=GARLAND;foot.insertBefore(g,foot.firstChild);}
    if(!reduce)document.body.appendChild(leafLayer(16));
  });
})();
