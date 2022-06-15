import { SelectWithSingleChoice, Select } from "./components/Select";
import { AnimationHeight } from "./components/AnimationHeight";
import { BurgerMenu } from "./components/BurgerMenu";
import { BlockFocus } from "./components/BlockFocus";
import { FadeAnimation } from "./components/FadeAnimation";
import { ModalWithTrigger } from "./components/Modal";
import { infrastructureSliders } from "./functions/sliders";

let headerSelectLang = new SelectWithSingleChoice({
  selector: ".header__select-lang",
  initialValue: "ru",
  apiAnimation: new AnimationHeight(),
  output: 5,
});

headerSelectLang.init();

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

let documentForm = document.querySelector(".documents .modal__form");

documentsModal.eventOpen((e) => {
  let typeDocument = e.target.dataset.document;

  if (!typeDocument) return;

  documentForm.dataset.document = typeDocument;
});

documentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(e.currentTarget);
  formData.append("document", e.target.dataset.document);
});

ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 7,
    controls: [],
  });
}

infrastructureSliders();
