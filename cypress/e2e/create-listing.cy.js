describe("Create listing form", () => {
  it("validates user inputs correctly based on API restrictions", () => {
    // attempt login
    cy.visit("../pages/login.html");
    cy.wait(500);
    cy.get("#login-email").type("oysRos99836@stud.noroff.no");
    cy.get("#login-password").type("Passord123");
    cy.get("#login-button").click();
    cy.wait(500);
    cy.get("#login-success").should("be.visible");
    // attempt to create listing with invalid img link
    cy.wait(500);
    cy.get("#header-create-listing-button").click({ force: true });
    cy.get("#title-input").type("Cypress test");
    cy.get("#media-input-field").type(
      "https://images.pexels.com/photos/866398/pexels-photo-866{enter}"
    );
    cy.get("#create-listing-btn").click();
    cy.wait(500);
    cy.get("#create-listing-message").should("be.visible");
    // attempt to create listing with every form filled
    cy.wait(2000);
    cy.visit("../index.html");
    cy.get("#header-create-listing-button").click({ force: true });
    cy.get("#title-input").type("Cypress test");
    cy.get("#tags-input-field").type("cypress test");
    cy.get("#media-input-field").type(
      "https://images.unsplash.com/photo-1608096299230-81c7b43d5dfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
    );
    cy.get("#description-input").type("Test desc");
    cy.get("#create-listing-btn").click();
    cy.wait(4000);
    cy.get(".listing-title");
    // Attempt to delete test listing
    cy.get("#delete-listing-btn-desktop").click();
  });
});
