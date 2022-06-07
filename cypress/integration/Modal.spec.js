describe("Tестирование модального окна", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.viewport(1920, 1080);
  });

  it("Открытие модального окна", () => {
    cy.get("[data-test=modal-trigger]").click();
    cy.get("[data-test=modal]").should("be.visible");
  });

  it("Закрытие модального окна", () => {
    cy.get("[data-test=modal-trigger]").click();
    cy.get("[data-test=modal]").should("be.visible");
    cy.get("[data-test=modal-close]").wait(500).click();
    cy.get("[data-test=modal]").should("not.be.visible");
  });

  it("Клик вне модального окна когда оно открыто", () => {
    cy.get("[data-test=modal-trigger]").click();
    cy.get("[data-test=modal]").should("be.visible");
    cy.get("[data-test=modal-body]").wait(500).click("topRight");
    cy.get("[data-test=modal]").should("not.be.visible");
  });
});
