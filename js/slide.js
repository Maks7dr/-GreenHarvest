document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reviews-item');
  const dots = document.querySelectorAll('.dot');
  const viewportWidth = window.innerWidth;
  let currentIndex = 0;

  // Оновити відображення слайдів
  const updateSlides = () => {
    const viewportWidth = window.innerWidth;

    if (viewportWidth < 768) {
      // Мобільні: показуємо один елемент
      items.forEach((item, i) => {
        item.style.display = i === currentIndex ? 'block' : 'none';
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    } else if (viewportWidth >= 768 && viewportWidth < 1280) {
      // Планшети: показуємо два елементи
      items.forEach((item, i) => {
        if (i === currentIndex || i === (currentIndex + 1) % items.length) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    } else {
      // Десктопи: показуємо всі елементи
      items.forEach(item => {
        item.style.display = 'block';
      });
      dots.forEach(dot => {
        dot.style.display = 'none'; // Ховаємо кнопки
      });
    }
  };

  // Перехід до наступного слайду
  const goToSlide = index => {
    currentIndex = index;
    updateSlides();
  };

  // Додати події кліку для крапок
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
  });

  // Ініціалізація
  updateSlides();

  // Оновлення при зміні розміру вікна
  window.addEventListener('resize', updateSlides);
});
