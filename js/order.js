(function () {
  var y = document.getElementById('y'); if (y) y.textContent = new Date().getFullYear();
  var form = document.getElementById('order-form'); if (!form) return;
  var AJAX_URL = 'https://formsubmit.co/ajax/heathersc3@gmail.com';
  var THANKS = 'thanks.html';
  var list = document.getElementById('order-list'), empty = document.getElementById('order-empty');
  var err = document.getElementById('order-error'), hidden = document.getElementById('order_items');
  var status = document.getElementById('form-status'), btn = document.getElementById('submit-btn');
  var order = []; // [{name, qty}]

  var d = document.getElementById('ddate');
  if (d) { var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset()); d.min = t.toISOString().slice(0, 10); }

  function find(n) { for (var i = 0; i < order.length; i++) if (order[i].name === n) return i; return -1; }
  function add(n, k) {
    var i = find(n);
    if (i < 0) { if (k > 0) order.push({ name: n, qty: k }); }
    else { order[i].qty += k; if (order[i].qty <= 0) order.splice(i, 1); }
    render();
  }
  function text() { return order.map(function (o) { return o.name + ' x' + o.qty; }).join('\n'); }
  function render() {
    list.innerHTML = '';
    order.forEach(function (o) {
      var li = document.createElement('li');
      li.innerHTML = '<span class="oname"></span><span class="ctrl">' +
        '<button type="button" class="qbtn" data-act="minus" aria-label="Remove one">−</button>' +
        '<span class="qty"></span>' +
        '<button type="button" class="qbtn rm" data-act="remove" aria-label="Remove item">✕</button></span>';
      li.querySelector('.oname').textContent = o.name;
      li.querySelector('.qty').textContent = 'x' + o.qty;
      li.dataset.item = o.name;
      list.appendChild(li);
    });
    document.querySelectorAll('.item-btn').forEach(function (b) {
      var i = find(b.dataset.item), badge = b.querySelector('.badge');
      if (i >= 0) { if (!badge) { badge = document.createElement('span'); badge.className = 'badge'; b.appendChild(badge); } badge.textContent = order[i].qty; b.classList.add('on'); }
      else { if (badge) badge.remove(); b.classList.remove('on'); }
    });
    empty.hidden = order.length > 0;
    if (order.length) err.hidden = true;
    hidden.value = text();
  }
  document.querySelectorAll('.item-btn').forEach(function (b) {
    b.addEventListener('click', function () { add(b.dataset.item, 1); });
  });
  list.addEventListener('click', function (e) {
    var b = e.target.closest('.qbtn'); if (!b) return;
    var n = b.closest('li').dataset.item, act = b.dataset.act;
    if (act === 'plus') add(n, 1); else if (act === 'minus') add(n, -1);
    else { var i = find(n); if (i >= 0) { order.splice(i, 1); render(); } }
  });

  function show(msg, ok) { status.hidden = false; status.textContent = msg; status.className = 'status ' + (ok ? 'ok' : 'bad'); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hidden.value = text();
    if (!order.length) { err.hidden = false; document.getElementById('picker').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var fd = new FormData(form), data = {};
    fd.forEach(function (v, k) { if (k !== '_next') data[k] = v; });
    if (data._honey) { window.location.href = THANKS; return; }
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch(AJAX_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        var s = res.j && String(res.j.success);
        if (res.ok && s === 'true') {
          show('Thank you! 💚 Your order request was sent. Heather will reach out to confirm your delivery time and payment.', true);
          setTimeout(function () { window.location.href = THANKS; }, 1800);
        } else if (res.ok && res.j && res.j.message && /activat/i.test(res.j.message)) {
          show('Almost there! This form is waiting to be activated. Please try again soon.', false);
          btn.disabled = false; btn.textContent = 'Send Order Request 💚';
        } else { throw new Error((res.j && res.j.message) || 'send failed'); }
      })
      .catch(function () { form.submit(); }); // plain POST fallback
  });
  var fab = document.querySelector('.fab'), sec = document.getElementById('order');
  if (fab && sec && 'IntersectionObserver' in window) new IntersectionObserver(function (en) { fab.classList.toggle('hide', en[0].isIntersecting); }).observe(sec);
  render();
})();
