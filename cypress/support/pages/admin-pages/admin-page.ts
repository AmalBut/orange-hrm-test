import { APP_MODULES, MODULES_URL_FREG } from "../../enums/modules-enums";

const LOCATORS = {
  MAIN_MENU_ITEM: ".oxd-main-menu-item",
  HEADER: "h6.oxd-topbar-header-breadcrumb-module",
};

class AdminPage {
  openFromMenu() {
    cy.contains(LOCATORS.MAIN_MENU_ITEM, APP_MODULES.ADMIN).click();
  }

  checkHeader() {
    cy.get(LOCATORS.HEADER).should("contain", APP_MODULES.ADMIN);
  }

  checkUrl() {
    cy.url().should("include", MODULES_URL_FREG.ADMIN);
  }
  
}
export const adminPage = new AdminPage();
