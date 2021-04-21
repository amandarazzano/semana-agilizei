/// <reference types="cypress"  />

context('Listagem', () => {
    it('Listagem sem registros', () => {
        cy.server()
        cy.route ({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-vazio'
          }).as('getNewtable');

          cy.route ({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/usertable?**' ,
            status: 200,
            response: 'fx:webtable-get-vazio'
            }).as('getUsertable');      

     cy.visit('WebTable.html');   

     cy.get('div[role=row]').should('have.length', 1)
    });

    it('Listagem com apenas um registro', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-unico'
            })

     cy.route ({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/usertable?**' ,
            status: 200,
            response: 'fx:webtable-get-unico'
            }).as('getUsertable');     

    cy.visit('WebTable.html');

    //interagir com elementos da tabela
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone')
    cy.get('@gridCellPhone').should('contain.text', '1234567890');

    // para interagir com as linhas usar:
    // 1 => .first()
    // 2
    // 3 =>
    // 4 => .eq(3) 
    // 5 => .last()
  });

});