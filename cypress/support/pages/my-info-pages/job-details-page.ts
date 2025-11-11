import { JOB_FIELDS_NAMES } from "../../enums/fields-enum";
import { APP_MODULES, MODULES_URL_FREG } from "../../enums/modules-enums";
import { MY_INFO_TABS } from "../../enums/nav-tabs-enum";
import { WebElementHandler } from "../../helpers/web-element-handler";

const LOCATORS = {
  MAIN_MENU_ITEM: ".oxd-main-menu-item",
  HEADER: "h6.oxd-topbar-header-breadcrumb-module"
};

class JobPage {
  openFromMenu() {
    cy.contains(LOCATORS.MAIN_MENU_ITEM, APP_MODULES.MY_INFO).click();
    WebElementHandler.getTabItem(MY_INFO_TABS.JOB).click();
  }

  typeInJobTitleDropDown(partialText: string) {
    WebElementHandler.getDropDownList(JOB_FIELDS_NAMES.JOB_TITLE).type(partialText);
  }

  typeInEmploymentStatusDropDown(partialText: string) {
    WebElementHandler.getDropDownList(JOB_FIELDS_NAMES.EMPLOYMENT_STATUS).type(partialText);
  }

  typeInSubUnitDropDown(partialText: string) {
    WebElementHandler.getDropDownList(JOB_FIELDS_NAMES.SUB_UNIT).type(partialText);
  }

  typeInLocationDropDown(partialText: string) {
    WebElementHandler.getDropDownList(JOB_FIELDS_NAMES.LOCATION).type(partialText);
  }

  typeInJoinedDate(date: string) {
    WebElementHandler.getInputFieldFor(JOB_FIELDS_NAMES.JOINED_DATE).clear({force: true}).type(date,{force: true});
  }

  clickOnSaveButton() {
    WebElementHandler.getSubmitButton().click();
  }

  checkJobDetailsUpdatedSuccessfully(jobTitle: string, employmentStatus: string, subUnit: string, location: string, joinedDate: string) {
    WebElementHandler.getSuccessToast().should('be.visible').and('contain.text', 'Successfully Updated');
    WebElementHandler.getInputFieldFor(JOB_FIELDS_NAMES.JOB_TITLE).should('have.value', jobTitle);
    WebElementHandler.getInputFieldFor(JOB_FIELDS_NAMES.EMPLOYMENT_STATUS).should('have.value', employmentStatus);
    WebElementHandler.getInputFieldFor(JOB_FIELDS_NAMES.SUB_UNIT).should('have.value', subUnit);
    WebElementHandler.getInputFieldFor(JOB_FIELDS_NAMES.LOCATION).should('have.value', location);
    WebElementHandler.getInputFieldFor(JOB_FIELDS_NAMES.JOINED_DATE).should('have.value', joinedDate);
  }
}
export const jobPage = new JobPage();
