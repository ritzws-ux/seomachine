// SEOMachine Site — Alpine.js App

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    view: 'home',
    articles: [],
    search: '',
    activeCategory: '',

    async init() {
      try {
        const res = await fetch('./articles.json');
        this.articles = await res.json();
      } catch (e) {
        console.error('articles.json 로드 실패:', e);
      }
    },

    get categories() {
      const cats = [...new Set(this.articles.map(a => a.category))];
      return cats;
    },

    get filteredArticles() {
      return this.articles.filter(a => {
        const q = this.search.toLowerCase();
        const matchSearch = !q ||
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q));
        const matchCat = !this.activeCategory || a.category === this.activeCategory;
        return matchSearch && matchCat;
      });
    },

    formatDate(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    },
  }));
});

// Copy code block to clipboard
function copyCode(btn) {
  const block = btn.parentElement;
  const lines = Array.from(block.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE || (n.nodeName !== 'BUTTON' && n.nodeName !== 'BR'))
    .map(n => n.textContent)
    .join('')
    .trim();

  navigator.clipboard.writeText(lines).then(() => {
    const orig = btn.textContent;
    btn.textContent = '완료!';
    setTimeout(() => btn.textContent = orig, 1500);
  }).catch(() => {
    btn.textContent = '실패';
    setTimeout(() => btn.textContent = '복사', 1500);
  });
}
