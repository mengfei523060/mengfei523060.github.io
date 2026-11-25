/* ============================================================
   梦飞的网络导航 —— 页面脚本
   ============================================================ */
(function () {
  /* ---------- 星空背景 ---------- */
  var cv = document.getElementById('stars'), ctx = cv.getContext('2d');
  var stars = [], W, H, raf = 0, rid = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function starColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--star').trim() || '#6d8bc0';
  }
  var SC = starColor();
  function resize() {
    W = cv.width = innerWidth * DPR; H = cv.height = innerHeight * DPR;
    cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
    var n = Math.floor(innerWidth * innerHeight / 6500);
    stars = [];
    for (var i = 0; i < n; i++) {
      stars.push({ x: Math.random() * W, y: Math.random() * H,
        r: (Math.random() * 1.1 + .3) * DPR,
        p: Math.random() * Math.PI * 2, s: Math.random() * 1.2 + .3 });
    }
    SC = starColor();
    if (reduce.matches) play();
  }
  function draw(t) {
    raf = 0;
    ctx.clearRect(0, 0, W, H);
    var tt = t / 1000;
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      var a = .35 + .55 * (0.5 + 0.5 * Math.sin(tt * st.s + st.p));
      ctx.globalAlpha = a; ctx.fillStyle = SC;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reduce.matches) raf = requestAnimationFrame(draw);
  }
  /* 用户偏好「减弱动态效果」时只渲染一帧静态星空，不做持续动画 */
  function play() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(draw);
  }
  addEventListener('resize', function () { clearTimeout(rid); rid = setTimeout(resize, 150); });
  if (reduce.addEventListener) reduce.addEventListener('change', play);
  else if (reduce.addListener) reduce.addListener(play);
  resize(); play();

  /* ---------- 站点图标（优先 data-icon 精确文件，再按域名探测本地扩展名，失败退回在线 favicon，再退回字母） ---------- */
  document.querySelectorAll('.favi[data-domain], .favi[data-icon]').forEach(function (el) {
    var d = el.dataset.domain;
    var kinds = ['png', 'ico', 'svg', 'webp'];
    var sources = (el.dataset.icon ? [el.dataset.icon] : []).concat(d ? kinds.map(function (k) { return 'icon/' + d + '.' + k; })
      .concat(['https://' + d + '/favicon.ico', 'https://icons.duckduckgo.com/ip3/' + d + '.ico']) : []);
    (function load(i) {
      if (i >= sources.length) return;
      var img = new Image();
      img.alt = '';
      img.referrerPolicy = 'no-referrer';
      img.onload = function () { el.textContent = ''; el.appendChild(img); };
      img.onerror = function () { load(i + 1); };
      img.src = sources[i];
    })(0);
  });
})();
