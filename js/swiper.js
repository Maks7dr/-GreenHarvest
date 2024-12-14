document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1, // За замовчуванням показується 1 елемент
    spaceBetween: 16, // Відстань між елементами
    loop: true, // Зациклення
    breakpoints: {
      768: {
        slidesPerView: 2, // На планшетах показувати 2 елементи
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 3, // На ноутбуках і більше - 3 елементи
        spaceBetween: 32,
      },
    },
  });
});
