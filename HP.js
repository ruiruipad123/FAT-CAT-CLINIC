function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// スライド
let i = 1;
setInterval(() => {
  i++;
  if (i > 3) i = 1;
  const slide = document.getElementById("slide");
  if(slide) slide.src = `https://picsum.photos/800/300?${i}`;
}, 3000);

// スクロールアニメーション (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.hp-section').forEach(section => {
    observer.observe(section);
  });

  // Current day in Tokyo (Asia/Tokyo)
  const tokyoDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const currentDay = tokyoDate.getDay(); // 0(Sun) - 6(Sat)

  // Map to column index (1-based for array access of siblings)
  const dayToCol = {
      4: 2, // 木
      5: 3, // 金
      6: 4, // 土
      0: 5, // 日
      1: 6, // 月
      2: 7, // 火
      3: 8  // 水
  };
  
  const colIndex = dayToCol[currentDay];
  const table = document.querySelector('.schedule-table');
  
  if (table) {
      const rows = table.querySelectorAll('tr');
      
      // Header row
      if (rows[0] && rows[0].children[colIndex - 1]) {
          rows[0].children[colIndex - 1].classList.add('current-day-highlight');
      }
      
      // 優先指名権 row
      if (rows[1] && rows[1].children[colIndex - 1]) {
          rows[1].children[colIndex - 1].classList.add('current-day-highlight');
      }
      
      // 事前予約 row (水曜日はrowspanされているため存在しない)
      if (currentDay !== 3) {
          if (rows[2] && rows[2].children[colIndex - 1]) {
              rows[2].children[colIndex - 1].classList.add('current-day-highlight');
          }
      }
  }
});
