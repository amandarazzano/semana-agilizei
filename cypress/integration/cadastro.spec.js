/// <reference types="cypress"  />

    let Chance = require('chance');
    let chance = new Chance();

context('Cadastro', () => {

    it('Cadastro de usuário no site', () => {
        //rotas sem mock
        //cy.route('GET','**/api/1/databases/userdetails/collections/newtable**')
       // .as('getNewtable');

        cy.server();
        cy.route ({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable**',
            status: 200,
            response: { }
          }).as('getNewtable');

         cy.route ({
            method: 'POST' ,
            url: '**/api/1/databases/userdetails/collections/newtable**' ,
            status: 200 ,
            response: { }
          }).as('postNewtable');
                  
          cy.route ({
            method: 'POST',
            url: '**/api/1/databases/userdetails/collections/usertable**' ,
            status: 200,
            response: { }
          }).as('postUsertable');
      
        // baseUrl + Register.html
        cy.visit('Register.html');

        //type
        cy.get('input[placeholder="First Name"]').type(chance.first())
        cy.get('input[ng-model^=Last]').type(chance.last())
        cy.get('input[ng-model^=Email').type(chance.email())
        cy.get('input[ng-model^=Phone').type(chance.phone({ formatted: false}));

        //check => radio's checkboxes 
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');

        //select  => select & select2 (combos)
        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Australia', {force:true});
        cy.get('select#yearbox').select('1996');
        cy.get('select[ng-model^=month]').select('February');
        cy.get('select#daybox').select('24');

        cy.get('input#firstpassword').type('Agilizei@2020');
        cy.get('input#secondpassword').type('Agilizei@2020');

        //anexar arquivo
        cy.get('input#imagesrc').attachFile('imagem-foto.jpg')

        //click
        cy.get('button#submitbtn').click();

        cy.wait('@getNewtable').then((resNewtable) => {
            //espero resposta do status que seja 200
            expect(resNewtable.status).to.eq(200)
           /*  console.log(resNewtable.status)
            cy.log(resNewtable.status) */
        })    
         
        cy.wait('@postNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)

        })

        cy.wait('@postUsertable').then((resUsertable) => {
            expect(resUsertable.status).to.eq(200)
        })

         //url da página atual    
         cy.url().should('contain', 'WebTable');
       
    });
    
});

//elementos
//input[placeholder="First Name"]
//input[ng-model^=Last]
//input[ng-model^=Email
//input[ng-model^=Phone
//input[value="FeMale"
//input[type="checkbox"
//select#Skills
//select#countries
//select#country
//select#yearbox
//select[ng-model^month]
//select#daybox
//input#firstpassword
//input#secondpassword