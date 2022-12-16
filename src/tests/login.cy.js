describe("Login form", () => {
  it("validates user inputs correctly based on API restrictions", () => {
    // attempt login with invalid email and password
    cy.visit("../pages/login.html");
    cy.wait(500);
    cy.get("#login-email").type("oysteinrostvi@gmail.com");
    cy.get("#login-password").type("Password98");
    cy.get("#login-button").click();
    cy.wait(500);
    cy.get("#login-error").should("be.visible");
    // attempt login with valid email and password
    cy.visit("../pages/login.html");
    cy.wait(500);
    cy.get("#login-email").type("oysRos99836@stud.noroff.no");
    cy.get("#login-password").type("Passord123");
    cy.get("#login-button").click();
    cy.wait(500);
    cy.get("#login-success").should("be.visible");
  });
});
