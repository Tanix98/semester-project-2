describe("Logout button", () => {
  it("logs the user out when clicked", () => {
    // login
    cy.visit("../pages/login.html");
    cy.wait(500);
    cy.get("#login-email").type("oysRos99836@stud.noroff.no");
    cy.get("#login-password").type("Passord123");
    cy.get("#login-button").click();
    cy.wait(500);
    cy.get("#login-success").should("be.visible");
    // logout
    cy.reload();
    cy.get("#user-pfp").click();
    cy.get("#log-out-btn-desktop").click();
    cy.wait(500);
    cy.get("#header-login-button");
  });
});
