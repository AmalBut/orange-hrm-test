import { adminPage } from "../../support/pages/admin-pages/admin-page";
import { loginPage } from "../../support/pages/login-page";

describe('Validate module URLs and headers for all pages', () => {
    beforeEach(()=>{
        cy.fixture('users').as('users');
        cy.fixture('messages').as('messages');
        loginPage.visit();
        loginPage.isLoaded();
        cy.get('@users').then((users:any)=>{
            cy.loginToOrangehrm(users.valid.username, users.valid.password);
        })
    })

    it('Should open Admin page and validate the url ann header', () => {
        adminPage.openFromMenu();
        adminPage.checkHeader();
        adminPage.checkUrl();
    });

    
});