document.addEventListener('DOMContentLoaded', function () {
  const reviewsList = document.querySelector('.reviews-list');

  // Додаємо підтримку "інерційного" свайпу для мобільних
  reviewsList.addEventListener('touchstart', function (e) {
    reviewsList.style.scrollBehavior = 'smooth';
  });

  reviewsList.addEventListener('touchend', function (e) {
    // Залишаємо стандартний інерційний скролінг
  });
});
