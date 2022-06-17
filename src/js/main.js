import { SelectWithSingleChoice, Select } from "./components/Select";
import { AnimationHeight } from "./components/AnimationHeight";
import { BurgerMenu } from "./components/BurgerMenu";
import { BlockFocus } from "./components/BlockFocus";
import { FadeAnimation } from "./components/FadeAnimation";
import { ModalWithTrigger } from "./components/Modal";
import { infrastructureSliders, descPlotSlider } from "./functions/sliders";
import APlayer from "aplayer";

let page = document.body.dataset.page;

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

if (page === "index") {
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

  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7,
      controls: [],
    });
  }

  infrastructureSliders();
} else if (page === "plot") {
  descPlotSlider();

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

  playerPic.setAttribute("tabindex", 0);

  playerPic.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      player.toggle();
    }
  });
}
