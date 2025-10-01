import { dashboardPage } from "../../support/pages/dashboard-page";
import { loginPage } from "../../support/pages/login-page";

describe('Login Cases', () => {

    beforeEach(()=>{
        cy.fixture('users').as('users');
        cy.fixture('messages').as('messages');
        loginPage.visit();
        loginPage.isLoaded();
    })

    it('TC01: Should login successfuly with valid username and password', () => {
       
        cy.get('@users').then((users:any)=>{
            cy.loginToOrangehrm(users.valid.username, users.valid.password);
        });

        dashboardPage.isLoaded();
    });

    it('TC02: Should show an error for valid username and invalid password', () => {
         cy.get('@users').then((users:any)=>{
            cy.loginToOrangehrm(users.valid.username, users.invalid.password);
        });
        cy.get('@messages').then((messages:any)=>{
            loginPage.assertInvalidCredentials(messages.invalidCred);
        });
    });

    it('TC03: Should show an error for invalid username and valid password', () => {
        
        cy.get('@users').then((users:any)=>{
            cy.loginToOrangehrm(users.invalid.username, users.valid.password);
        });
        cy.get('@messages').then((messages:any)=>{
            loginPage.assertInvalidCredentials(messages.invalidCred);
        });
    });

    it('TC04: Should show an error for invalid username and invalid password', () => {

        cy.get('@users').then((users:any)=>{
            cy.loginToOrangehrm(users.invalid.username, users.invalid.password);
        });

        cy.get('@messages').then((messages:any)=>{
            loginPage.assertInvalidCredentials(messages.invalidCred);
        });
    });  
    
    it('TC05: Should show required message when username is empty and password is valid', () => {
        cy.get('@users').then((users:any)=>{
            loginPage.typePassword(users.valid.password);
        });
        loginPage.submit();
        
        cy.get('@messages').then((messages:any)=>{
            loginPage.assertRequiredAt(0,messages.requiresMsg);
        });
    });

    it('TC06: Should show required message when username is empty and password is invalid', () => {

        cy.get('@users').then((users:any)=>{
            loginPage.typePassword(users.invalid.password);
        });
        loginPage.submit();

        cy.get('@messages').then((messages:any)=>{
            loginPage.assertRequiredAt(0,messages.requiresMsg);
        });
    }); 
    
    it('TC07: Should show required message when password is empty and username is valid', () => {
        cy.get('@users').then((users:any)=>{
            loginPage.typeUsername(users.valid.username);
        });
        loginPage.submit();
        
        cy.get('@messages').then((messages:any)=>{
            loginPage.assertRequiredAt(0,messages.requiresMsg);
        });
    });
    
    it('TC08: Should show required message when password is empty and username is invalid', () => {
        cy.get('@users').then((users:any)=>{
            loginPage.typeUsername(users.invalid.username);
        });
        loginPage.submit();

        cy.get('@messages').then((messages:any)=>{
            loginPage.assertRequiredAt(0,messages.requiresMsg);
        });
    });
    
    it('TC09: Should show required messages when both username and password are empty', () => {
        loginPage.submit();
        cy.get('@messages').then((messages:any)=>{
            loginPage.assertRequiredAt(0,messages.requiresMsg);
            loginPage.assertRequiredAt(1,messages.requiresMsg);
        });
    });
    
    it('TC10: Should mask password input by default', () => {
        loginPage.passwordShouldBeMasked();
    });
});