describe('Login form', () => {
  it('validates user inputs correctly based on API restrictions', () => {
    // attempt login with invalid email
    cy.visit('../index.html');
    cy.wait(500);
    cy.get('[data-auth="login"]').contains('Login').click({ force: true });
    cy.get('#loginEmail').type('oysteinrostvi@gmail.com', { delay: 0 });
    cy.get('#loginPassword').type('Password98', { delay: 0 });
    cy.get('[data-bs-dismiss="modal"]').contains('Login').click();
    cy.wait(500);
    cy.on('window:alert', (text) => {
      expect(text).to.contains(
        'Either your username was not found or your password is incorrect'
      );
    });
    // attempt login with invalid password
    cy.visit('../index.html');
    cy.wait(500);
    cy.get('[data-auth="login"]').contains('Login').click({ force: true });
    cy.get('#loginEmail').type('oysRos99836@stud.noroff.no', { delay: 0 });
    cy.get('#loginPassword').type('password98', { delay: 0 });
    cy.get('[data-bs-dismiss="modal"]').contains('Login').click();
    cy.wait(500);
    cy.on('window:alert', (text) => {
      expect(text).to.contains(
        'Either your username was not found or your password is incorrect'
      );
    });
    // attempt login with valid email and password
    cy.visit('../index.html');
    cy.wait(500);
    cy.get('[data-auth="login"]').contains('Login').click({ force: true });
    cy.get('#loginEmail').type('oysRos99836@stud.noroff.no', { delay: 0 });
    cy.get('#loginPassword').type('Password98', { delay: 0 });
    cy.get('[data-bs-dismiss="modal"]').contains('Login').click();
    cy.wait(500);
    cy.get('h4').contains('oystein');
  });
});
