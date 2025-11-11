import { LEAVE_FIELDS_NAMES } from "../../enums/fields-enum";
import { APP_MODULES, MODULES_URL_FREG } from "../../enums/modules-enums";
import { LEAVE_NAV_TABS } from "../../enums/nav-tabs-enum";
import { commonHelper } from "../../helpers/common-helpers";
import { WebElementHandler } from "../../helpers/web-element-handler";

const LOCATORS = {
  MAIN_MENU_ITEM: '.oxd-main-menu-item',
  HEADER: 'h6.oxd-topbar-header-breadcrumb-module',
};

class LeavePage {
  openFromMenu() {
    cy.contains(LOCATORS.MAIN_MENU_ITEM, APP_MODULES.LEAVE).click();
  }

  checkHeader() {
    cy.get(LOCATORS.HEADER).should("contain", APP_MODULES.LEAVE);
  }

  checkUrl() {
    cy.url().should("include", MODULES_URL_FREG.LEAVE);
  }

  openAddEntitlements(){
    WebElementHandler.getNavTab(LEAVE_NAV_TABS.ENTITLEMENTS).click();
    WebElementHandler.getTopNvTabLink(LEAVE_NAV_TABS.ADD_ENTITLEMENTS).click();
  }
  
  openApply(){
    WebElementHandler.getNavTab(LEAVE_NAV_TABS.APPLY).click({force:true});
  }

  openMyLeave(){
    WebElementHandler.getNavTab(LEAVE_NAV_TABS.MY_LEAVE).click({force:true});
  }

  openLeaveList(){
    WebElementHandler.getNavTab(LEAVE_NAV_TABS.LEAVE_LIST).click({force:true});
  }

  searchForLeave(date: string, leaveType: string, employeeName?: string){
    if(employeeName!=undefined){
      WebElementHandler.getInputFieldFor(LEAVE_FIELDS_NAMES.EMPLOYEE_NAME).type(employeeName);
      commonHelper.waitFor(1000);
      commonHelper.selectDropDownOptionByIndex(0);
    }
      WebElementHandler.getInputFieldFor(LEAVE_FIELDS_NAMES.FROM_DATE).clear().type(date);
      commonHelper.clickOnDropDownList(LEAVE_FIELDS_NAMES.LEAVE_TYPE);
      commonHelper.selectDropDownOption(leaveType);
      WebElementHandler.getSearchButton().click();
  }
 
}
export const leavePage = new LeavePage();
