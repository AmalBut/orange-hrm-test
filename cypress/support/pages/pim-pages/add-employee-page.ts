import { COMMON_FIELDS_NAMES } from "../../enums/fields-enum";
import { WebElementHandler } from "../../helpers/web-element-handler";

const LOCATORS = {
    FIRST_NAME_INPUT:'input[name="firstName"]',
    MIDDLE_NAME_INPUT:'input[name="middleName"]',
    LAST_NAME_INPUT:'input[name="lastName"]',
    CREATE_LOGIN_DETAILS_SWITCH: '.oxd-switch-input',
    FILE_INPUT_FOR_IMAGE: '.oxd-file-input',
    IMAGE_ERROR_MSG:'.orangehrm-employee-image .oxd-input-field-error-message'
}

class AddEmployeePage {
  typeFirstName(value: string) {
    cy.get(LOCATORS.FIRST_NAME_INPUT).type(value);
  }

  typeMiddleName(value: string) {
    cy.get(LOCATORS.MIDDLE_NAME_INPUT).type(value);
  }

  typeLastName(value: string) {
    cy.get(LOCATORS.LAST_NAME_INPUT).type(value);
  }

  typeEmployeeId(value: string) {
    cy.contains(".oxd-input-group", "Employee Id")
      .find("input")
      .clear()
      .type(value);
  }

  clickOnSaveButton() {
    WebElementHandler.getSubmitButton().click();
  }

  clickOnCreateLoginDetailsSwitch() {
    cy.get(LOCATORS.CREATE_LOGIN_DETAILS_SWITCH).click();
  }

  typeUsername(username: string) {
    WebElementHandler.getInputFieldFor("Username").type(username);
  }

  typePassword(password: string) {
    WebElementHandler.getInputFieldFor("Password").type(password);
  }

  typeConfirmPassword(password: string) {
    WebElementHandler.getInputFieldFor("Confirm Password").type(password);
  }

  addEmployeeImage(imageFile: any) {
    cy.get(LOCATORS.FILE_INPUT_FOR_IMAGE).selectFile(
      `cypress/fixtures/${imageFile}`,
      { force: true }
    );
  }

  checkRequiredMsgFor(inputFieldLabelName: string, errorMsg:string) {
    WebElementHandler.getFirstNameErrorMsg().should("contain",errorMsg);
  }

  checkPasswordLengthError(errorMsg: string) {
    WebElementHandler.getErrorFor(COMMON_FIELDS_NAMES.PASSWORD).should("contain",errorMsg);
  }

  checkInvalidProfileImageError(errorMsg: string){
    cy.get(LOCATORS.IMAGE_ERROR_MSG).should('contain',errorMsg).and('be.visible')
  }
}
export const addEmployeePage = new AddEmployeePage();