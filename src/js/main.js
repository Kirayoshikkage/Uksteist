import { SelectWithSingleChoice, Select } from "./components/Select";
import { AnimationHeight } from "./components/AnimationHeight";
import { BurgerMenu } from "./components/BurgerMenu";
import { BlockFocus } from "./components/BlockFocus";
import { FadeAnimation } from "./components/FadeAnimation";
import { ModalWithTrigger } from "./components/Modal";

let headerSelectLang = new SelectWithSingleChoice({
  selector: ".header__select-lang",
  initialValue: "ru",
  apiAnimation: new AnimationHeight(),
  output: 5,
});

headerSelectLang.init();

const burgerMenu = new BurgerMenu({
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
  selector: ".origins-modal",
  openBtn: ".origins__button",
  closeBtn: ".origins-modal .modal__close",
  selectorActive: "modal_active",
  apiAnimation: new FadeAnimation({
    display: "flex",
    duration: 400,
  }),
  apiBlockFocus: new BlockFocus({
    exceptionContainer: ".origins-modal",
  }),
});

originsModal.init();

ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 7,
    controls: [],
  });
}
