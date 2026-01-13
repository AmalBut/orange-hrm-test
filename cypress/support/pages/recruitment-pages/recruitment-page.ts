import { APP_MODULES, MODULES_URL_FREG } from "../../enums/modules-enums";
import { RECRUITMENT_NAV_TABS } from "../../enums/nav-tabs-enum";
import { WebElementHandler } from "../../helpers/web-element-handler";

const LOCATORS = {
  MAIN_MENU_ITEM: ".oxd-main-menu-item",
  HEADER: "h6.oxd-topbar-header-breadcrumb-module",
};

class RecruitmentPage {
  openFromMenu() {
    cy.contains(LOCATORS.MAIN_MENU_ITEM, APP_MODULES.RECRUITMENT).click();
  }

  checkHeader() {
    cy.get(LOCATORS.HEADER).should("contain", APP_MODULES.RECRUITMENT);
  }

  checkUrl() {
    cy.url().should("include", MODULES_URL_FREG.RECRUITMENT);
  }
  
}
export const recruitmentPage = new RecruitmentPage();
