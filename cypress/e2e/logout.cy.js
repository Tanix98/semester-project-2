describe('Logout button', () => {
  it('logs the user out when clicked', () => {
    // login
    cy.visit('../index.html');
    cy.wait(500);
    cy.get('[data-auth="login"]').contains('Login').click({ force: true });
    cy.get('#loginEmail').type('oysRos99836@stud.noroff.no', { delay: 0 });
    cy.get('#loginPassword').type('Password98', { delay: 0 });
    cy.get('[data-bs-dismiss="modal"]').contains('Login').click();
    cy.wait(500);
    cy.get('h4').contains('oystein');
    // logout
    cy.get('.btn').contains('Logout').click();
    cy.get('#registerModalLabel');
  });
});
