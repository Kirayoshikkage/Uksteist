/**
 * @jest-environment jsdom
 */

import { Plots } from "../Plots";
import { BlockFocus } from "../BlockFocus";

describe("Тестирование участков", () => {
  beforeEach(() => {
    document.body.innerHTML = "";

    let sutHTML = `
    <section class="plots">
      <div class="container">
        <svg
          class="plots-location plots__plots-location"
          viewBox="0 0 630 729"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g class="plots-location__plot" tabIndex="0" data-plot="1">
            <path
              d="M517.003 54.2V99H513.739V57.144H502.795V54.2H517.003Z"
              fill="#F8F8F8"
              class="plots-location__number"
            />
            <path
              d="M610 50.4328L417 37L445.158 117H548.698L604.72 82.6716L610 50.4328Z"
              fill="white"
              class="plots-location__bg"
            />
          </g>
          <path
            d="M626 40.4839L450.321 723L4 294.092L87.9819 4L626 40.4839Z"
            stroke="white"
            stroke-opacity="0.6"
            stroke-width="6"
          />
        </svg>
        <div class="plots-popup plots__plots-popup">
          <div class="plots-popup__item" data-popup="1">
            <div class="plots-popup__content">
              <h3 class="plots-popup__subtitle">Участок №1</h3>
              <p class="plots-popup__status">Свободен</p>
              <table class="plots-popup__table">
                <tr>
                  <td class="plots-popup__cell plots-popup__cell_prop">
                    Площадь участка:
                  </td>
                  <td class="plots-popup__cell plots-popup__cell_value">3000 м2</td>
                </tr>
                <tr>
                  <td class="plots-popup__cell plots-popup__cell_prop">
                    Площадь застройки:
                  </td>
                  <td class="plots-popup__cell plots-popup__cell_value">300 м2</td>
                </tr>
                <tr>
                  <td class="plots-popup__cell plots-popup__cell_prop">Адрес:</td>
                  <td class="plots-popup__cell plots-popup__cell_value">
                    Vainu tee 12
                  </td>
                </tr>
                <tr>
                  <td class="plots-popup__cell plots-popup__cell_prop">
                    Стоимость:
                  </td>
                  <td class="plots-popup__cell plots-popup__cell_value">
                    350 000 €
                  </td>
                </tr>
              </table>
              <a
                href="plot-5.html"
                class="btn-reset button button_color-white button_border-white plots-popup__button button_animation-one"
              >
                Подробнее
              </a>
              <button type="button" class="btn-reset plots-popup__close">
                <svg class="plots-popup__icon">
                  <use xlink:href="img/sprite.svg#modal_close"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

    document.body.insertAdjacentHTML("beforeend", sutHTML);
  });

  describe("Тестирование конструктора", () => {
    it("Переданы валидные данные", () => {
      let sut = new Plots({
        container: ".plots",
        blockFocus: new BlockFocus({
          exceptionContainer: ".plots__plots-popup",
        }),
      });

      expect(() => sut.init()).not.toThrow();
    });

    it("Переданы невалидные данные", () => {
      let sut = new Plots({
        container: 123,
        blockFocus: "display:none",
      });

      expect(() => sut.init()).toThrow();
    });

    it("Переданы пустые данные", () => {
      let sut = new Plots({});

      expect(() => sut.init()).toThrow();
    });

    it("Данные не переданы", () => {
      let sut = new Plots();

      expect(() => sut.init()).toThrow();
    });
  });

  describe("Тестирование интерфейса", () => {
    describe("Тестирование получения попапа по ид", () => {
      it("Переданные данные корректны, попап существует", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        let rezult = sut.getPopup(1);

        expect(rezult).not.toBeUndefined();
      });

      it("Переданные данные корректны, попап не существует", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        let rezult = sut.getPopup("10");

        expect(rezult).toBeUndefined();
      });

      it("Переданные данные некорректны", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        let rezult = sut.getPopup([1]);

        expect(rezult).toBeUndefined();
      });

      it("Данные не переданы", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        let rezult = sut.getPopup();

        expect(rezult).toBeUndefined();
      });
    });

    describe("Тестирование получения участка по ид", () => {
      it("Переданные данные корректны, участок существует", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        let rezult = sut.getPlot(1);

        expect(rezult).not.toBeUndefined();
      });

      it("Переданные данные корректны, участок не существует", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        let rezult = sut.getPlot("10");

        expect(rezult).toBeUndefined();
      });

      it("Переданные данные некорректны", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        let rezult = sut.getPlot([1]);

        expect(rezult).toBeUndefined();
      });

      it("Данные не переданы", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        let rezult = sut.getPlot();

        expect(rezult).toBeUndefined();
      });
    });

    describe("Тестирование получения открытого элемента", () => {
      it("Есть открытый элемент", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();
        document.querySelector('[data-plot="1"]').dataset.open = "true";

        let rezult = sut.getOpenElement();

        expect(rezult).not.toBeUndefined();
      });

      it("Все элементы закрыты", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        let rezult = sut.getOpenElement();

        expect(rezult).toBeUndefined();
      });
    });

    describe("Тестирование добавления нового девайса с событиями", () => {
      it("Девайс передан в неверном формате", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        expect(() =>
          sut.addDevice([], {
            click: (e) => {},
          })
        ).toThrow();
      });

      it("Список событий передан неверном форматом", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        expect(() => sut.addEvents("desctop", "")).toThrow();
      });

      it("Такого девайса нету в списке доступных", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        expect(() =>
          sut.addDevice("123", {
            click: (e) => {},
          })
        ).toThrow();
      });

      it("Такой девайс уже существует", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        sut.addDevice("test", {
          mouseenter: () => {},
        });

        expect(() => {
          sut.addDevice("test", {
            click: (e) => {},
          });
        }).toThrow();
      });

      it("Добавление нового девайса", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        expect(() => {
          sut.addDevice("test", {
            click: () => {},
          });
        }).not.toThrow();
      });
    });

    describe("Тестирование добавления нового события для девайса", () => {
      it("В качестве девайса передан неверный формат данных", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        expect(() =>
          sut.addEvents([], {
            click: (e) => {},
          })
        ).toThrow();
      });

      it("Список событий передан неверном форматом", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        expect(() => sut.addEvents("desctop", "")).toThrow();
      });

      it("Такой девайс еще не был добавлен", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        expect(() =>
          sut.addEvents("test", {
            click: (e) => {},
          })
        ).toThrow();
      });

      it("Добавление нового события", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.addDevice("test", {
          mouseenter: () => {},
        });
        sut.init();

        expect(() => {
          sut.addEvents("test", {
            click: (e) => {},
          });
        }).not.toThrow();
      });
    });

    describe("Тестирование получения списка доступных девайсов", () => {
      it("Получение списка", () => {
        let sut = new Plots({
          container: ".plots",
          blockFocus: new BlockFocus({
            exceptionContainer: ".plots__plots-popup",
          }),
        });
        sut.init();

        expect(sut.getListAvailableDevices()).not.toBe([]);
      });
    });
  });
});
