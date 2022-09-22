Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(firstName, lastName, email, openText) {
    cy.get('.field input[name="firstName"]')
        .should('be.visible')
        .type(firstName)

    cy.get('.field input[name="lastName"]')
        .should('be.visible')
        .type(lastName)

    cy.get('.field input[name="email"]')
        .should('be.visible')
        .type(email)
    
    cy.get('.field textarea[name="open-text-area"]')
        .should('be.visible')
        .type(openText)
})

Cypress.Commands.add('submitButton', function() {
    cy.contains('Enviar').click()
})

Cypress.Commands.add('selectProduct', (produto, value_produto)=> {
    cy.get('form select').select(produto)
    .should('have.value', value_produto)
})