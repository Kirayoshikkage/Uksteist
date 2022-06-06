describe("Тестирование выпадающего меню", () => {
  describe("Выпадающее меню с одиночным выбором", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit("http://localhost:3000/");
    });

    it("Открытие выпадающего меню", () => {
      cy.get("[data-test=select-lang-trigger]").click();
      cy.get("[data-test=select-lang-body]").should("be.visible");
    });

    it("Выбор элемента в выпадающем меню", () => {
      cy.get("[data-test=select-lang-trigger]").click();
      cy.get("[data-test=select-lang-item").click();
      cy.get("[data-test=select-lang-item").should(
        "have.class",
        "select__item_selected"
      );
      cy.get("[data-test=select-lang-body]").should("not.be.visible");
      cy.get("[data-test=select-lang-current-item").contains("Ua");
    });

    it("Закрытие выпадающего меню", () => {
      cy.get("[data-test=select-lang-trigger]").click();
      cy.get("[data-test=select-lang-trigger]").click();
    });
  });
});
