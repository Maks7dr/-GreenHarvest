document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reviews-item'); // Елементи відгуків
  const dots = document.querySelectorAll('.dot'); // Кнопки-пагінація
  const reviewsList = document.querySelector('.reviews-list'); // Контейнер відгуків

  let currentSlide = 0;
  const viewportWidth = window.innerWidth;

  // Функція для оновлення видимого слайду
  const updateSlide = () => {
    if (viewportWidth < 768) {
      // Мобільний режим: показуємо один слайд
      items.forEach((item, i) => {
        item.style.display = i === currentSlide ? 'block' : 'none';
      });
    } else if (viewportWidth >= 768 && viewportWidth < 1280) {
      // Планшетний режим: два слайди
      items.forEach((item, i) => {
        item.style.display =
          i === currentSlide || i === (currentSlide + 1) % items.length
            ? 'block'
            : 'none';
      });
    } else {
      // Десктоп: показуємо всі слайди
      items.forEach(item => {
        item.style.display = 'block';
      });
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  };

  // Перехід до наступного слайду
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % items.length;
    updateSlide();
  };

  // Обробник кліків для крапок
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateSlide();
    });
  });

  // Автоматичне гортання на планшеті
  if (viewportWidth >= 768 && viewportWidth < 1280) {
    setInterval(nextSlide, 3000); // Перегортання кожні 3 секунди
  }

  // Ініціалізація
  updateSlide();

  // Динамічне оновлення при зміні розміру вікна
  window.addEventListener('resize', () => {
    updateSlide();
  });
});
