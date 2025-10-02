import { APP_MODULES } from "../enums/modules-enums";

const LOCATORS = {
    mainMenuItem : '.oxd-main-menu-item',
    addBtn:'.oxd-button--secondary',
    firstNameInput:'input[name="firstName"]',
    middleNameInput:'input[name="middleName"]',
    lastNameInput:'input[name="lastName"]',
    saveBtn:'.orangehrm-left-space'
}

class PIMPage{

    openFromMenu(){
        cy.contains(LOCATORS.mainMenuItem,APP_MODULES.PIM).click();
    }

    clickOnAddButton(){
       cy.contains(LOCATORS.addBtn,'Add').click(); 
    }

    typeFirstName(value : string){
        cy.get(LOCATORS.firstNameInput).type(value);
    }

    typeMiddleName(value : string){
        cy.get(LOCATORS.middleNameInput).type(value);
    }

    typeLastName(value : string){
        cy.get(LOCATORS.lastNameInput).type(value);
    }

    typeEmployeeId(value : string){
        cy.contains('.oxd-input-group','Employee Id').find('input')
    }

    clickOnSaveButton(){
        cy.get(LOCATORS.saveBtn).click();
    } 

}
export const pimPage = new PIMPage();