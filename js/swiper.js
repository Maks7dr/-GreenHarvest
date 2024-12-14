document.addEventListener('DOMContentLoaded', function () {
  const reviewsList = document.querySelector('.reviews-list');
  if (!reviewsList) {
    console.error('Element .reviews-list not found');
    return;
  }

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  // Начало свайпа
  reviewsList.addEventListener('mousedown', e => {
    if (window.innerWidth >= 1280) return; // Отключаем свайпы для ноутбуков
    isDragging = true;
    startX = e.pageX - reviewsList.offsetLeft;
    scrollLeft = reviewsList.scrollLeft;
    reviewsList.style.cursor = 'grabbing';
  });

  reviewsList.addEventListener('touchstart', e => {
    if (window.innerWidth >= 1280) return; // Отключаем свайпы для ноутбуков
    isDragging = true;
    startX = e.touches[0].pageX - reviewsList.offsetLeft;
    scrollLeft = reviewsList.scrollLeft;
  });

  // Во время свайпа
  reviewsList.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - reviewsList.offsetLeft;
    const walk = x - startX;
    reviewsList.scrollLeft = scrollLeft - walk;
  });

  reviewsList.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - reviewsList.offsetLeft;
    const walk = x - startX;
    reviewsList.scrollLeft = scrollLeft - walk;
  });

  // Конец свайпа
  reviewsList.addEventListener('mouseup', () => {
    isDragging = false;
    reviewsList.style.cursor = 'grab';
  });

  reviewsList.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  reviewsList.addEventListener('touchend', () => {
    isDragging = false;
  });
});
