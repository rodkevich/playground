describe('Input form', () =>{
    beforeEach(() => {
        // navigate
        cy.visit('/')
    })
    it('Focus input on load', () =>{
        // get focused element and assert it's class
        cy.focused()
            .should('have.class', 'new-todo')
    })

    // it.only will run test atomically
    it('Accepts an input', () =>{
        const typedValue = 'Hello world';
        cy.get('.new-todo')
            .type(typedValue)
            .should('have.value', typedValue)
    })

    // group test context
    context('Form submission', () => {
        it.only('Adds a new TODO on submit', () => {
            // https://docs.cypress.io/api/commands/intercept
            // cy.server was removed in 12 ver
            cy.intercept('POST', '/api/todos', (req) => {
                expect(req.body.name === 'L1earn cypress')
                const response = {
                            name: 'Learn cypress',
                            id:1,
                            isComplete: false
                        }
                // send object as JSON response
                req.reply(response)
            })

            cy.get('.new-todo')
                .type('Learn cypress')
                .type('{enter}')
        })
    })
})