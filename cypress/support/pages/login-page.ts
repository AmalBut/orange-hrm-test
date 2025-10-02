const LOCATORS ={
    username : 'input[name=username]',
    password : 'input[name=password]',
    submitBtn : 'button:submit',
    requiredMsg : '.oxd-input-field-error-message'
}

class LoginPage {
 visit(){
    cy.visit('/')
 }

 isLoaded(){
    cy.get(LOCATORS.username).should("be.visible");
 }

 typeUsername(value : string){
    cy.get(LOCATORS.username).type(value);
 }

 typePassword(value : string){
    cy.get(LOCATORS.password).type(value);
 }

 clearUsername(){
    cy.get(LOCATORS.username).clear();
 }

 clearPassword(){
    cy.get(LOCATORS.password).clear();
 }

 submit(){
    cy.get(LOCATORS.submitBtn).click();
 }

 passwordShouldBeMasked(){
    cy.get(LOCATORS.password).should('have.attr','type','password');
 }

 assertRequiredAt(index: number, text: string){
    cy.get(LOCATORS.requiredMsg).eq(index).should('contain',text);
 }

 assertInvalidCredentials(text: string){
    cy.contains(text).should("be.visible");
 }

}
export const loginPage = new LoginPage();