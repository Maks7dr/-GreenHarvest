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
    if (window.innerWidth >= 1280) return;
    isDragging = true;
    startX = e.pageX - reviewsList.offsetLeft;
    scrollLeft = reviewsList.scrollLeft;
    reviewsList.style.cursor = 'grabbing';
    console.log('mousedown', { startX, scrollLeft });
  });

  reviewsList.addEventListener('touchstart', e => {
    if (window.innerWidth >= 1280) return;
    isDragging = true;
    startX = e.touches[0].pageX - reviewsList.offsetLeft;
    scrollLeft = reviewsList.scrollLeft;
    console.log('touchstart', { startX, scrollLeft });
  });

  // Во время свайпа
  reviewsList.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - reviewsList.offsetLeft;
    const walk = x - startX;
    reviewsList.scrollLeft = scrollLeft - walk;
    console.log('mousemove', { walk, scrollLeft: reviewsList.scrollLeft });
  });

  reviewsList.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - reviewsList.offsetLeft;
    const walk = x - startX;
    reviewsList.scrollLeft = scrollLeft - walk;
    console.log('touchmove', { walk, scrollLeft: reviewsList.scrollLeft });
  });

  // Конец свайпа
  reviewsList.addEventListener('mouseup', () => {
    isDragging = false;
    reviewsList.style.cursor = 'grab';
    console.log('mouseup');
  });

  reviewsList.addEventListener('mouseleave', () => {
    isDragging = false;
    console.log('mouseleave');
  });

  reviewsList.addEventListener('touchend', () => {
    isDragging = false;
    console.log('touchend');
  });
});
