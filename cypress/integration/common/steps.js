//steps/passou comuns a mais de uma feature

Given(/^que acesso o site$/, () => {
    //rotas sem mock
    //cy.route('GET','**/api/1/databases/userdetails/collections/newtable**')
    // .as('getNewtable');

   cy.server()
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
    
});