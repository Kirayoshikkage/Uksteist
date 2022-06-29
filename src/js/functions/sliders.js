import Swiper, { Pagination, Thumbs, Keyboard, A11y } from "swiper";

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

function descPlotSlider() {
  var swiper = new Swiper(".desc-plot__thumbs", {
    modules: [Thumbs, A11y],
    keyboard: {
      enabled: true,
    },
    spaceBetween: 5,
    slidesPerView: 4,
    watchSlidesProgress: true,
  });

  var swiper2 = new Swiper(".desc-plot__slider", {
    modules: [Thumbs, A11y],
    thumbs: {
      swiper: swiper,
    },
  });

  swiper.slides.forEach((slide, index) => {
    slide.addEventListener("keydown", (e) => {
      if (e.code !== "Enter" && e.code !== "Space") return;
      swiper2.slideTo(index);
    });
  });
}

export { infrastructureSliders, descPlotSlider };
