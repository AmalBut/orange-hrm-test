const LOCATORS ={
    USERNAME : 'input[name=username]',
    PASSWORD : 'input[name=password]',
    SUMBIT_BTN : 'button:submit',
    REQUIRED_MSG : '.oxd-input-field-error-message'
}

class LoginPage {
 visit(){
    cy.visit('/')
 }

 isLoaded(){
    cy.get(LOCATORS.USERNAME).should("be.visible");
 }

 typeUsername(value : string){
    cy.get(LOCATORS.USERNAME).type(value);
 }

 typePassword(value : string){
    cy.get(LOCATORS.PASSWORD).type(value);
 }

 clearUsername(){
    cy.get(LOCATORS.USERNAME).clear();
 }

 clearPassword(){
    cy.get(LOCATORS.PASSWORD).clear();
 }

 submit(){
    cy.get(LOCATORS.SUMBIT_BTN).click();
 }

 passwordShouldBeMasked(){
    cy.get(LOCATORS.PASSWORD).should('have.attr','type','password');
 }

 assertRequiredAt(index: number, text: string){
    cy.get(LOCATORS.REQUIRED_MSG).eq(index).should('contain',text);
 }

 assertInvalidCredentials(text: string){
    cy.contains(text).should("be.visible");
 }

}
export const loginPage = new LoginPage();