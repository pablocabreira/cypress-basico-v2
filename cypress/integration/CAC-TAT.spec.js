/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

        it('Verifica o título da aplicação', function() {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        })

        it('Preeenche os campos obrigatórios e envia formulário', function() {
            const longText = 'Preciso de ajuda, de muita ajuda... Por favor, me ajudem que estou precisando de ajuda!'
            
            cy.fillMandatoryFieldsAndSubmit('Pablo', 'Cabreira', 'cabreir@gmail.com', longText)

/*             cy.get('.field input[name="firstName"]')
                .should('be.visible')
                .type('Pablo')
                .should('have.value', 'Pablo')
        
            cy.get('.field input[name="lastName"]')
                .should('be.visible')
                .type('Cabreira')
                .should('have.value', 'Cabreira')

            cy.get('.field input[name="email"]')
                .should('be.visible')
                .type('cabreir@gmail.com')
                .should('have.value', 'cabreir@gmail.com')
            
            cy.get('.field textarea[name="open-text-area"]')
                .should('be.visible')
                .type(longText, {delay: 0})
                .should('have.value', longText) */

            cy.submitButton()
            
            cy.get('.success')
                .should('be.visible')
                
            cy.get('.success strong')
                .should('have.text', 'Mensagem enviada com sucesso.')
        })

        it('Exibe mensagem de erro ao submeter o formulário com um e-mail inválido', function() {
            cy.get('.field input[name="firstName"]')
                .should('be.visible')
                .type('Pablo')
                .should('have.value', 'Pablo')
        
            cy.get('.field input[name="lastName"]')
                .should('be.visible')
                .type('Cabreira')
                .should('have.value', 'Cabreira')

            cy.get('.field input[name="email"]')
                .should('be.visible')
                .type('cabreir&gmail.com')
                .should('have.value', 'cabreir&gmail.com')
                
            cy.get('.field textarea[name="open-text-area"]')
                .should('be.visible')
                .type('Preciso de ajuda!')
                .should('have.value', 'Preciso de ajuda!')
            
            cy.submitButton()
            
            cy.get('.error')
                .should('be.visible')
                
            cy.get('.error strong')
                .should('have.text', 'Valide os campos obrigatórios!')
        })

        it('Campo telefone continua vazio ao receber valores não-numéricos', function() {
            cy.get('.field input[name="phone"]')
                .should('be.visible')
                .type('e')
                .should('have.value', '')
        })

        it('Telefone em branco quando o campo é obrigatório', function() {
            cy.get('.field input[name="firstName"]')
                .should('be.visible')
                .type('Pablo')
                .should('have.value', 'Pablo')
        
            cy.get('.field input[name="lastName"]')
                .should('be.visible')
                .type('Cabreira')
                .should('have.value', 'Cabreira')

            cy.get('.field input[name="email"]')
                .should('be.visible')
                .type('cabreir@gmail.com')
                .should('have.value', 'cabreir@gmail.com')
            
            cy.get('.field textarea[name="open-text-area"]')
                .should('be.visible')
                .type('Já era!')
                .should('have.value', 'Já era!')
            
            cy.get('.group input[type="checkbox"][name="phone"]').check()

            cy.submitButton()

            cy.get('.error')
                .should('be.visible')
            
            cy.get('.error strong')
                .should('have.text', 'Valide os campos obrigatórios!')
        })

        it('Preenche e limpa os campos nome, sobrenome, e-mail e telefone', function() {
            cy.get('.field input[name="firstName"]')
                .should('be.visible')
                .type('Pablo')
                .should('have.value', 'Pablo')
                .clear().should('have.value', '')
    
            cy.get('.field input[name="lastName"]')
                .should('be.visible')
                .type('Cabreira')
                .should('have.value', 'Cabreira')
                .clear().should('have.value', '')

            cy.get('.field input[name="email"]')
                .should('be.visible')
                .type('cabreir@gmail.com')
                .should('have.value', 'cabreir@gmail.com')
                .clear().should('have.value', '')
            
            cy.get('.field input[name="phone"]')
                .should('be.visible')
                .type('54991788877')
                .should('have.value', '54991788877')
                .clear().should('have.value', '')
        })

        it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
            cy.submitButton()
            
            cy.get('.error')
                .should('be.visible')
                
            cy.get('.error strong')
                .should('have.text', 'Valide os campos obrigatórios!')
        })

        it('Envia o formuário com sucesso usando um comando customizado', function() {
            cy.fillMandatoryFieldsAndSubmit('Pablito', 'Cabreirinha', 'mail@testes.com', 'Preciso de ajudinha!')
                .submitButton()
            
                cy.get('.success').should('be.visible')
        })

        it('Seleciona os produtos pelo nome, valor ou índice', ()=> {
            cy.selectProduct('YouTube', 'youtube')
            cy.selectProduct('mentoria', 'mentoria')
            cy.selectProduct(1, 'blog')
        })

        it('Marca o tipo de atendimento "Feedback"', ()=> {
            cy.get('input[type="radio"][value="feedback"]')
                .check()
                .should('be.checked')
                .should('have.value', 'feedback')
        })

        it('Marca cada tipo de atencimento', ()=> {
            cy.get('input[type="radio"]')
                .should('have.length', 3)
                .each(function($radio) {
                    cy.wrap($radio)
                        .check()
                        .should('be.checked')
                })
        })

        it('Marcam ambos checkboxes, depois desmarca o último', ()=> {
            cy.get('input[type="checkbox"]')
                .check()
                .should('be.checked')
                .last().uncheck()
                .should('not.be.checked')
        })

        it('Seleciona um arquivo da pasta fixtures', ()=> {
            cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json')
                .then(($input)=>{
                    //const file = $input[0].files
                    expect($input[0].files[0].name).to.eq('example.json')
                    })
        })

        it('Seleciona um arquivo simulando um drag-and-drop', ()=> {
            cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
                .should(function($input) {
                    expect($input[0].files[0].name).to.eq('example.json')
                })
        })

        it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=> {
            cy.fixture('example.json').as('aliasFile')
            cy.get('input[type="file"]')
                .should('not.have.value')
                .selectFile('@aliasFile', { action: 'drag-drop' })
                .should(function($input) {
                    expect($input[0].files[0].name).to.eq('example.json')
                    expect($input[0].files[0].type).to.eq('application/json')
                })
        })

})