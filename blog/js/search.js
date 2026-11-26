// 首页标题搜索：按关键字即时过滤文章卡片（不区分大小写，包含匹配）
(function () {
  var input = document.getElementById('search');
  var grid = document.querySelector('.grid');
  if (!input || !grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var empty = document.getElementById('empty');
  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var h3 = card.querySelector('h3');
      var title = ((h3 && h3.textContent) || '').toLowerCase();
      var hit = !q || title.indexOf(q) !== -1;
      card.hidden = !hit;
      if (hit) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  });
})();
