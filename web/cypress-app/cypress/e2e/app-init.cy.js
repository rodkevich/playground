//

describe('Init Application', ()=>{
    it.only('Loads todos on page load',()=>{

        cy.intercept('GET','/api/todos', [
            {"id": 1, "name": "Buy Milk", "isComplete": false},
            {"id": 2, "name": "Buy Eggs", "isComplete": false},
            {"id": 3, "name": "Buy Bread", "isComplete": false},
            {"id": 4, "name": "Make French Toast", "isComplete": false}
        ])
        cy.visit('/')
        cy.get('.todo-list li')
            .should('have.length', 4)
    })
})