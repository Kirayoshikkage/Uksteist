describe("Тестирование участков", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000/");
  });

  describe("Desctop", () => {
    it("При наведении на участок, о нем показывается информация", () => {
      cy.get(".plots [data-test=plot-1]").trigger("pointerenter");
      cy.get(".plots [data-test=popup-1]").should("be.visible");
    });

    it("После того, как мышь покинула участок, информация о нем скрывается", () => {
      cy.get(".plots [data-test=plot-1]").trigger("pointerenter");
      cy.get(".plots [data-test=plot-1]").trigger("pointerleave");
      cy.get(".plots [data-test=popup-1]").should("not.be.visible");
    });

    it("При наведении на попап с информацией об участке, он не закрывается", () => {
      cy.get(".plots [data-test=plot-1]").trigger("pointerenter");
      cy.get(".plots [data-test=popup-1]").trigger("pointerenter");
      cy.get(".plots [data-test=popup-1]").should("be.visible");
    });

    it("После того, как мышь покинула попап с информацией об участке, он закрывается", () => {
      cy.get(".plots [data-test=plot-1]").trigger("pointerenter");
      cy.get(".plots [data-test=popup-1]").trigger("pointerenter");
      cy.get(".plots").trigger("pointerleave", "top");
      cy.get(".plots [data-test=popup-1]").should("not.be.visible");
    });

    it("При попадании фокуса на участок, о нем показывается информация", () => {
      cy.get(".plots [data-test=plot-1]").trigger("focus");
      cy.get(".plots [data-test=popup-1]").should("be.visible");
    });
  });

  describe("All", () => {
    it("При нажатии на крестик в информации об участке, попап закрывается", () => {
      cy.get(".plots [data-test=plot-1]").trigger("focus");
      cy.get(".plots [data-test=close-popup]").trigger("pointerdown");
      cy.get(".plots [data-test=popup-1]").should("not.be.visible");
    });

    it("При скролле страницы активный участок закрывается", () => {
      cy.get(".plots [data-test=plot-1]").trigger("pointerenter");
      cy.scrollTo(0, 500);
      cy.get(".plots [data-test=popup-1]").should("not.be.visible");
    });

    it("При изменении размеров экрана активный участок закрывается", () => {
      cy.get(".plots [data-test=plot-1]").trigger("pointerenter");
      cy.viewport(1890, 1080);
      cy.get(".plots [data-test=popup-1]").should("not.be.visible");
    });
  });

  describe("Mobile", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/", {
        onBeforeLoad: (win) => {
          Object.defineProperty(win.navigator, "userAgent", {
            value:
              "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
          });
        },
      });
    });

    it("При нажатии на участок, о нем показывается информация", () => {
      cy.get(".plots [data-test=plot-1]").trigger("pointerdown");
      cy.get(".plots [data-test=popup-1]").should("be.visible");
    });

    it("При нажатии на другой участок, информация об открытом ранее участке закрывается, новый открывается", () => {
      cy.get(".plots [data-test=plot-1]").trigger("pointerdown");
      cy.get(".plots [data-test=plot-2]").trigger("pointerdown");
      cy.get(".plots [data-test=popup-2]").should("be.visible");
      cy.get(".plots [data-test=popup-1]").should("not.be.visible");
    });
  });
});
