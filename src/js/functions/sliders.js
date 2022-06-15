import Swiper, { Navigation, Pagination, Keyboard, A11y } from "swiper";

function infrastructureSliders() {
  var menu = [
    "Новые дороги",
    "Уличное освещение",
    "Маяк",
    "Забор",
    "Общая зона",
    "Скамейки с крышей",
    "Дорожка",
    "Детская площадка",
    "Песочница",
    "Входная группа",
    "Коммуникации",
    "Лес",
    "И ваш участок земли",
  ];
  var mySwiper = new Swiper(".infrastructure__slider", {
    modules: [Pagination, Keyboard, A11y],
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    spaceBetween: 16,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + menu[index] + "</span>";
      },
    },
  });
}

export { infrastructureSliders };
