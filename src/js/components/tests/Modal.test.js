/**
 * @jest-environment jsdom
 */

import { ModalWithTrigger } from "../Modal";

describe("Тестирование модального окна", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let modal = `
      <div class="modal">
        <div class="modal__body">
          <div class="container">
            <div class="modal__content">
              Lorem
              <button class="btn-reset modal__close">
                <svg class="modal__icon">
                  <use xlink:href="img/sprite.svg#modal_close"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    let trigger = '<button class="modal-trigger">Click</button>';

    document.body.insertAdjacentHTML("beforeend", modal);
    document.body.insertAdjacentHTML("beforeend", trigger);
  });

  describe("Проверка конструктора", () => {
    it("Переданные данные не валидны", () => {
      let sut = new ModalWithTrigger({
        selector: [],
        openBtn: {},
        closeBtn: 12,
        selectorActive: 343,
        apiAnimation: [],
        apiBlockFocus: {},
      });

      expect(() => sut.init()).toThrow();
    });

    it("Данные не переданы", () => {
      let sut = new ModalWithTrigger();

      expect(() => sut.init()).toThrow();
    });

    it("Переданные данные корректны", () => {
      let sut = new ModalWithTrigger({
        selector: ".modal",
        openBtn: ".modal-trigger",
        closeBtn: ".modal__close",
      });

      expect(() => sut.init()).not.toThrow();
    });
  });

  describe("Проверка состояния модального окна", () => {
    it("Проверка состояния при открытом модальном окне", () => {
      let sut = new ModalWithTrigger({
        selector: ".modal",
        openBtn: ".modal-trigger",
        closeBtn: ".modal__close",
        selectorActive: "modal_active",
      });
      sut.init();
      sut.toggleState();

      let rezult = sut.isOpen();

      expect(rezult).toBeTruthy();
    });

    it("Проверка состояния при закрытом модальном окне", () => {
      let sut = new ModalWithTrigger({
        selector: ".modal",
        openBtn: ".modal-trigger",
        closeBtn: ".modal__close",
        selectorActive: "modal_active",
      });
      sut.init();
      sut.toggleState();
      sut.toggleState();

      let rezult = sut.isOpen();

      expect(rezult).toBeFalsy();
    });
  });

  describe("Проверка подписки на событие открытия", () => {
    it("Передается функция", () => {
      let sut = new ModalWithTrigger({
          selector: ".modal",
          openBtn: ".modal-trigger",
          closeBtn: ".modal__close",
        }),
        flag = false,
        event = new Event("click");
      sut.init();

      sut.eventOpen(() => {
        flag = true;
      });
      document.querySelector(".modal-trigger").dispatchEvent(event);

      expect(flag).toBe(true);
    });

    it("Передается не функция", () => {
      let sut = new ModalWithTrigger({
        selector: ".modal",
        openBtn: ".modal-trigger",
        closeBtn: ".modal__close",
      });
      sut.init();

      expect(() => sut.eventOpen(123)).toThrow();
    });
  });
});
