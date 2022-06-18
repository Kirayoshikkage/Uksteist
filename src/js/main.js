import { SelectWithSingleChoice, Select } from "./components/Select";
import { AnimationHeight } from "./components/AnimationHeight";
import { BurgerMenu } from "./components/BurgerMenu";
import { BlockFocus } from "./components/BlockFocus";
import { FadeAnimation } from "./components/FadeAnimation";
import { ModalWithTrigger } from "./components/Modal";
import { infrastructureSliders, descPlotSlider } from "./functions/sliders";
import { Tooltip } from "./components/Tooltip";
import APlayer from "aplayer";

// Определение страницы

let page = document.body.dataset.page;

// Модальное окно для секции документы

let documentsModal = new ModalWithTrigger({
  selector: ".documents .documents-modal",
  openBtn: ".documents .documents__button",
  closeBtn: ".documents .documents-modal .modal__close",
  selectorActive: "modal_active",
  apiAnimation: new FadeAnimation({
    display: "flex",
    duration: 400,
  }),
  apiBlockFocus: new BlockFocus({
    exceptionContainer: ".documents .documents-modal",
  }),
});
documentsModal.init();

// Форма в модальном окне в секции документы

let documentForm = document.querySelector(".documents .modal__form");

// Подписка на событие открытия модального окна в секции документы

documentsModal.eventOpen((e) => {
  let typeDocument = e.target.dataset.document;

  if (!typeDocument) return;

  documentForm.dataset.document = typeDocument;
});

// Отправка формы в модальном окне в секции документы

documentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);
  formData.append("document", e.target.dataset.document);
});

// Выполнение скрипта относительно страницы

if (page === "index") {
  // Выпадающее меню с выбором языка в секции хедер

  let headerSelectLang = new SelectWithSingleChoice({
    selector: ".header__select-lang",
    initialValue: "ru",
    apiAnimation: new AnimationHeight(),
    output: 5,
  });

  headerSelectLang.init();

  // Бургер меню

  let burgerMenu = new BurgerMenu({
    selector: ".burger-menu",
    trigger: ".burger-trigger",
    selectorActive: "burger-menu_active",
    triggerActive: "burger-trigger_active",
    apiAnimation: new FadeAnimation({
      display: "block",
      duration: 400,
    }),
    apiBlockFocus: new BlockFocus({
      exceptionContainer: ".burger-menu",
      single: [document.querySelector(".burger-trigger")],
    }),
  });

  burgerMenu.init();

  // Модальное окно в секции истоки

  let originsModal = new ModalWithTrigger({
    selector: ".origins .origins-modal",
    openBtn: ".origins .origins__button",
    closeBtn: ".origins .origins-modal .modal__close",
    selectorActive: "modal_active",
    apiAnimation: new FadeAnimation({
      display: "flex",
      duration: 400,
    }),
    apiBlockFocus: new BlockFocus({
      exceptionContainer: ".origins .origins-modal",
    }),
  });

  originsModal.init();

  // Карта в секции место

  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7,
      controls: [],
    });
  }

  // Инициализация слайдера в секции инфраструктура

  infrastructureSliders();

  // Тултипы в секции этапы

  let tooltips = new Tooltip({
    selectors: ".tooltip",
  });

  tooltips.init();
} else if (page === "plot") {
  // Инициализация слайдера в секции описания участка

  descPlotSlider();

  // Инициализация музыки в секции следующие шаги

  let player = new APlayer({
      container: document.getElementById("next-steps__aplayer"),
      theme: "#FADFA3",
      audio: [
        {
          name: "Uksteist - звук тишины",
          url: "../audio/jojo.mp3",
          cover: "../img/music__cover.webp",
          theme: "#314C51",
        },
      ],
    }),
    playerPic = document.querySelector(".next-steps__music .aplayer-pic");

  // Добавление фокуса иконке

  playerPic.setAttribute("tabindex", 0);

  // Подписка на событие нажатия enter для иконки

  playerPic.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      player.toggle();
    }
  });
}
