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
        // Adds a new item on submit
        it('Adds a new TODO on submit', () => {
            // https://docs.cypress.io/api/commands/intercept
            // cy.server was removed in 12 ver
            const itemText = 'Learn cypress';
            cy.intercept('POST', '/api/todos', (req) => {
                const response = {
                            name: itemText,
                            id:1,
                            isComplete: false
                        }
                // send object as JSON response
                req.reply(response)
            })

            cy.get('.new-todo')
                .type(itemText)
                .type('{enter}')
                .should('have.value', '')
            cy.get('.todo-list li')
                .should('have.length', 1)
                .and('contain', itemText)

        })

        //Show ERROR message if submission failed
        it('Show ERROR message if submission failed', () =>{
            cy.intercept('POST', '/api/todos', (req) => {
               const response = {
                    statusCode: 500,
                    body: '505 Internal ERROR',
                }
               req.reply(response)
               })

            cy.get('.new-todo')
                .type('test{enter}')

            cy.get('todo-list li')
                .should('not.exist')

            cy.get('.error')
                .should('be.visible')
        })

    })

})
