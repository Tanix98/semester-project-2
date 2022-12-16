describe('Create post form', () => {
  it('validates user inputs correctly based on API restrictions', () => {
    // attempt login
    cy.visit('../index.html');
    cy.wait(500);
    cy.get('[data-auth="login"]').contains('Login').click({ force: true });
    cy.get('#loginEmail').type('oysRos99836@stud.noroff.no', { delay: 0 });
    cy.get('#loginPassword').type('Password98', { delay: 0 });
    cy.get('[data-bs-dismiss="modal"]').contains('Login').click();
    cy.wait(500);
    cy.get('h4').contains('oystein');
    // attempt to create post without title
    cy.get('.btn').contains('New Post').click();
    cy.get('#postTags').type('cypress test', { delay: 0 });
    cy.get('#postMedia').type(
      'https://images.pexels.com/photos/866398/pexels-photo-866398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      { delay: 0 }
    );
    cy.get('#postBody').type('Test body', { delay: 0 });
    cy.get('[data-action="submit"]').click();
    cy.wait(500);
    cy.get('input:invalid');
    // attempt to create post with invalid img link
    cy.get('.btn').contains('New Post').click();
    cy.get('#postTitle').type('Cypress test', { delay: 0 });
    cy.get('#postTags').type('cypress test', { delay: 0 });
    cy.get('#postMedia').type(
      'https://images.pexels.com/photos/866398/pexels-photo-866398.jph=750&dpr=2',
      { delay: 0 }
    );
    cy.get('#postBody').type('Test body', { delay: 0 });
    cy.get('[data-action="submit"]').click();
    cy.wait(2000);
    cy.get('[data-bs-dismiss="modal"]');
    // attempt to create post with every form filled
    cy.visit('../index.html');
    cy.get('.btn').contains('New Post').click();
    cy.get('#postTitle').type('Cypress test', { delay: 0 });
    cy.get('#postTags').type('cypress test', { delay: 0 });
    cy.get('#postMedia').type(
      'https://images.pexels.com/photos/866398/pexels-photo-866398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      { delay: 0 }
    );
    cy.get('#postBody').type('Test body', { delay: 0 });
    cy.get('[data-action="submit"]').click();
    cy.wait(4000);
    cy.get('[data-action="delete"]');
  });
});
