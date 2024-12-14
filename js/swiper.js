document.addEventListener('DOMContentLoaded', function () {
  const reviewsList = document.querySelector('.reviews-list');
  const reviewsItems = document.querySelectorAll('.reviews-item');

  let currentIndex = 0; // Поточний індекс видимого елемента
  let startX = 0; // Початкова точка дотику
  let currentTranslate = 0; // Поточна позиція зсуву
  let prevTranslate = 0; // Попередня позиція
  let isDragging = false; // Чи виконується свайп

  // Додаємо події для початку свайпу
  reviewsList.addEventListener('touchstart', startSwipe);
  reviewsList.addEventListener('mousedown', startSwipe);

  // Події для закінчення свайпу
  reviewsList.addEventListener('touchend', endSwipe);
  reviewsList.addEventListener('mouseup', endSwipe);
  reviewsList.addEventListener('mouseleave', endSwipe);

  // Події для руху свайпу
  reviewsList.addEventListener('touchmove', moveSwipe);
  reviewsList.addEventListener('mousemove', moveSwipe);

  function startSwipe(event) {
    isDragging = true;
    startX = getPositionX(event);
    reviewsList.style.cursor = 'grabbing';
  }

  function endSwipe() {
    isDragging = false;
    reviewsList.style.cursor = 'grab';

    // Логіка для визначення, куди свайпнули
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < reviewsItems.length - 1) {
      currentIndex += 1;
    }

    if (movedBy > 50 && currentIndex > 0) {
      currentIndex -= 1;
    }

    setPositionByIndex();
  }

  function moveSwipe(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startX;
    reviewsList.style.transform = `translateX(${currentTranslate}px)`;
  }

  function getPositionX(event) {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
  }

  function setPositionByIndex() {
    currentTranslate = -currentIndex * reviewsItems[0].offsetWidth;
    prevTranslate = currentTranslate;
    reviewsList.style.transform = `translateX(${currentTranslate}px)`;
  }
});
