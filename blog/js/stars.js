/* 星空背景（与导航页同款） */
(function () {
  var cv = document.getElementById('stars');
  if (!cv) return;
  var ctx = cv.getContext('2d');
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
  function play() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(draw);
  }
  addEventListener('resize', function () { clearTimeout(rid); rid = setTimeout(resize, 150); });
  if (reduce.addEventListener) reduce.addEventListener('change', play);
  else if (reduce.addListener) reduce.addListener(play);
  resize(); play();
})();
