document.addEventListener('DOMContentLoaded', () => {
  const reviewsList = document.querySelector('.reviews-list');
  const reviewsItems = document.querySelectorAll('.reviews-item');
  const totalItems = reviewsItems.length;

  let currentIndex = 0;

  // Инициализация: показать первые элементы
  function updateActiveItems() {
    reviewsItems.forEach((item, index) => {
      item.classList.remove('active');
      if (window.innerWidth < 768) {
        // На телефоне показываем один элемент
        if (index === currentIndex) {
          item.classList.add('active');
        }
      } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        // На планшете показываем два элемента
        if (
          index === currentIndex ||
          index === (currentIndex + 1) % totalItems
        ) {
          item.classList.add('active');
        }
      } else {
        // На ноутбуке показываем все элементы
        item.classList.add('active');
      }
    });
  }

  // Изначальная установка активных элементов
  updateActiveItems();

  // Свайп логика
  let startX = 0;
  let isDragging = false;

  reviewsList.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  reviewsList.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;

    // Если свайпнули влево
    if (diff < -50) {
      currentIndex = (currentIndex + 1) % totalItems; // Циклическое переключение вперёд
      updateActiveItems();
      isDragging = false;
    }

    // Если свайпнули вправо
    if (diff > 50) {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Циклическое переключение назад
      updateActiveItems();
      isDragging = false;
    }
  });

  reviewsList.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Пересчёт активных элементов при изменении ширины окна
  window.addEventListener('resize', updateActiveItems);
});
