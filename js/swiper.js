document.addEventListener('DOMContentLoaded', () => {
  const reviewsList = document.querySelector('.reviews-list');
  const reviewsItems = document.querySelectorAll('.reviews-item');
  const totalItems = reviewsItems.length;

  let currentIndex = 0; // Индекс текущего элемента
  let startX = 0;
  let currentTranslate = 0; // Текущее смещение
  let prevTranslate = 0;
  let isDragging = false;

  // Добавляем события для мыши и касания
  reviewsList.addEventListener('mousedown', startDrag);
  reviewsList.addEventListener('touchstart', startDrag);
  reviewsList.addEventListener('mousemove', drag);
  reviewsList.addEventListener('touchmove', drag);
  reviewsList.addEventListener('mouseup', endDrag);
  reviewsList.addEventListener('touchend', endDrag);
  reviewsList.addEventListener('mouseleave', endDrag);

  // Начало свайпа
  function startDrag(e) {
    isDragging = true;
    startX = getPositionX(e);
    reviewsList.style.transition = 'none'; // Убираем анимацию во время перетаскивания
  }

  // Логика перетаскивания
  function drag(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX;
    currentTranslate = prevTranslate + diff;
    reviewsList.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Конец свайпа
  function endDrag() {
    isDragging = false;
    const itemWidth = reviewsItems[0].offsetWidth + 16; // Ширина элемента + gap
    const movedBy = currentTranslate - prevTranslate;

    // Логика перехода на следующий/предыдущий элемент
    if (movedBy < -50 && currentIndex < totalItems - 1) {
      currentIndex++;
    }
    if (movedBy > 50 && currentIndex > 0) {
      currentIndex--;
    }

    setPositionByIndex();
  }

  // Получение позиции касания/мыши
  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  // Установка позиции слайда
  function setPositionByIndex() {
    const itemWidth = reviewsItems[0].offsetWidth + 16; // Ширина элемента + gap
    currentTranslate = -currentIndex * itemWidth;
    prevTranslate = currentTranslate;
    reviewsList.style.transition = 'transform 0.3s ease-in-out';
    reviewsList.style.transform = `translateX(${currentTranslate}px)`;
  }
});
