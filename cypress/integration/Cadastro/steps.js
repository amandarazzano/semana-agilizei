// implementação dos passos descritos na features
/// <reference types="cypress"  />

let Chance = require('chance');
let chance = new Chance();


When(/^informar meu dados$/, () => {
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
 ;
});
    
When(/^salvar$/, () => {
         //click
         cy.get('button#submitbtn').click();
});
    
Then(/^devo ser cadastro com sucesso$/, () => {
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


