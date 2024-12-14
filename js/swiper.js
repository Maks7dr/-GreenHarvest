document.addEventListener('DOMContentLoaded', function () {
  const reviewsList = document.querySelector('.reviews-list');
  const reviewsItems = document.querySelectorAll('.reviews-item');
  const totalItems = reviewsItems.length;

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let currentIndex = 0; // Текущий индекс активного элемента

  // Функция для прокрутки к нужному индексу
  function goToIndex(index) {
    const itemWidth = reviewsItems[0].offsetWidth + 16; // Ширина элемента + gap
    reviewsList.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth', // Плавная прокрутка
    });
  }

  // Начало свайпа
  reviewsList.addEventListener('mousedown', e => {
    if (window.innerWidth >= 1280) return; // Отключаем свайпы для ноутбуков
    isDragging = true;
    startX = e.pageX - reviewsList.offsetLeft;
    scrollLeft = reviewsList.scrollLeft;
    reviewsList.style.cursor = 'grabbing';
  });

  reviewsList.addEventListener('touchstart', e => {
    if (window.innerWidth >= 1280) return;
    isDragging = true;
    startX = e.touches[0].pageX - reviewsList.offsetLeft;
    scrollLeft = reviewsList.scrollLeft;
  });

  // Во время свайпа
  reviewsList.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - reviewsList.offsetLeft;
    const walk = x - startX; // Расстояние свайпа
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
    const itemWidth = reviewsItems[0].offsetWidth + 16; // Ширина элемента + gap
    currentIndex = Math.round(reviewsList.scrollLeft / itemWidth); // Рассчитать ближайший индекс
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= totalItems) currentIndex = totalItems - 1;
    goToIndex(currentIndex);
  });

  reviewsList.addEventListener('touchend', () => {
    isDragging = false;
    const itemWidth = reviewsItems[0].offsetWidth + 16; // Ширина элемента + gap
    currentIndex = Math.round(reviewsList.scrollLeft / itemWidth);
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= totalItems) currentIndex = totalItems - 1;
    goToIndex(currentIndex);
  });

  reviewsList.addEventListener('mouseleave', () => {
    isDragging = false;
  });
});
