import { APP_MODULES, MODULES_URL_FREG } from "../../enums/modules-enums";
import { WebTableHandler } from "../../helpers/web-table-handler";

const LOCATORS = {
  mainMenuItem: ".oxd-main-menu-item",
  headerH: "h6.oxd-topbar-header-breadcrumb-module",
};

class AdminPage {
  openFromMenu() {
    cy.contains(LOCATORS.mainMenuItem, APP_MODULES.Admin).click();
  }

  checkHeader() {
    cy.get(LOCATORS.headerH).should("contain", APP_MODULES.Admin);
  }

  checkUrl() {
    cy.url().should("include", MODULES_URL_FREG.Admin);
  }
  
}
export const adminPage = new AdminPage();
