import { APP_MODULES, MODULES_URL_FREG } from "../../enums/modules-enums";
import { WebElementHandler } from "../../helpers/web-element-handler";

const LOCATORS = {
  MAIN_MENU_ITEM: ".oxd-main-menu-item",
  HEADER: "h6.oxd-topbar-header-breadcrumb-module",
  POST_TEXTAREA: '.oxd-buzz-post-input',
  POST_BTN: '.oxd-button--main',
  POST_CARD: '.orangehrm-buzz',
  POST_EMP_NAME: '.orangehrm-buzz-post-emp-name',
  POST_CONTENT: '.orangehrm-buzz-post-body-text',

};

class BuzzPage {
  openFromMenu() {
    cy.contains(LOCATORS.MAIN_MENU_ITEM, APP_MODULES.BUZZ).click();
  }

  checkHeader() {
    cy.get(LOCATORS.HEADER).should("contain", APP_MODULES.BUZZ);
  }

  checkUrl() {
    cy.url().should("include", MODULES_URL_FREG.BUZZ);
  }

  typeInPostTextArea(postContent: string){
    cy.get(LOCATORS.POST_TEXTAREA).type(postContent);
  }

  clickOnPostBtn(){
    cy.contains(LOCATORS.POST_BTN,'Post').click();
  }

  checkSuccessToastMessage(){
    WebElementHandler.getSuccessToast().should('be.visible').and('contain','Successfully Saved');
  }

  checkPostIsAdded(name: string, content: string){
    cy.get(LOCATORS.POST_CARD).first().within(()=>{
        cy.get(LOCATORS.POST_CONTENT).invoke('text').should('eq',content);
    })
  }
  
}
export const buzzPage = new BuzzPage();
