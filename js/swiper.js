document.addEventListener('DOMContentLoaded', () => {
  const reviewsList = document.querySelector('.reviews-list');
  const reviewsItems = document.querySelectorAll('.reviews-item');
  const totalItems = reviewsItems.length;

  let currentIndex = 0;
  let startX = 0;
  let currentTranslate = 0;
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

  function startDrag(e) {
    isDragging = true;
    startX = getPositionX(e);
    reviewsList.style.transition = 'none'; // Убираем плавность во время перетаскивания
  }

  function drag(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX;
    currentTranslate = prevTranslate + diff;
    reviewsList.style.transform = `translateX(${currentTranslate}px)`;
  }

  function endDrag() {
    isDragging = false;

    const itemWidth = reviewsItems[0].offsetWidth + 16; // Ширина элемента + gap
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < totalItems - 1) {
      currentIndex++;
    }

    if (movedBy > 50 && currentIndex > 0) {
      currentIndex--;
    }

    setPositionByIndex();
  }

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  function setPositionByIndex() {
    const itemWidth = reviewsItems[0].offsetWidth + 16;
    currentTranslate = -currentIndex * itemWidth;
    prevTranslate = currentTranslate;
    reviewsList.style.transition = 'transform 0.3s ease-in-out';
    reviewsList.style.transform = `translateX(${currentTranslate}px)`;
  }
});
