import { APP_MODULES, MODULES_URL_FREG } from "../../enums/modules-enums";
import { PIM_NAV_TABS } from "../../enums/nav-tabs-enum";
import { WebElementHandler } from "../../helpers/web-element-handler";

const LOCATORS = {
  MAIN_MENU_ITEM: ".oxd-main-menu-item",
  HEADER: "h6.oxd-topbar-header-breadcrumb-module",
};

class PIMPage {
  openFromMenu() {
    cy.contains(LOCATORS.MAIN_MENU_ITEM, APP_MODULES.PIM).click();
  }

  checkHeader() {
    cy.get(LOCATORS.HEADER).should("contain", APP_MODULES.PIM);
  }

  checkUrl() {
    cy.url().should("include", MODULES_URL_FREG.ADMIN);
  }

  openEmployeeList(){
    WebElementHandler.getNavTab(PIM_NAV_TABS.EMPLOYEE_LIST).click();
  }
}
export const pimPage = new PIMPage();
