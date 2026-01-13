import { CREATE_CANDIDATE } from "../../enums/add-candidate-data-enums";
import { CANDIDATES_FIELDS_NAMES, COMMON_FIELDS_NAMES } from "../../enums/fields-enum";
import { commonHelper } from "../../helpers/common-helpers";
import { WebElementHandler } from "../../helpers/web-element-handler";

const LOCATORS = {
  FIRST_NAME_INPUT:'input[name="firstName"]',
  MIDDLE_NAME_INPUT:'input[name="middleName"]',
  LAST_NAME_INPUT:'input[name="lastName"]',
};

export class AddCandidatePage {
  fillCandidateDetails(vacancy : string, unique:string ) {
    cy.get(LOCATORS.FIRST_NAME_INPUT).type(CREATE_CANDIDATE.FIRST_NAME);
    cy.get(LOCATORS.MIDDLE_NAME_INPUT).type(CREATE_CANDIDATE.MIDDLE_NAME);
    cy.get(LOCATORS.LAST_NAME_INPUT).type(CREATE_CANDIDATE.LAST_NAME + unique);
    WebElementHandler.getInputFieldFor(COMMON_FIELDS_NAMES.EMAIL).type(CREATE_CANDIDATE.EMAIL);
    WebElementHandler.getInputFieldFor(CANDIDATES_FIELDS_NAMES.CONTACT_NUMBER).type(CREATE_CANDIDATE.CONTACT_NUMBER);
    WebElementHandler.getInputFieldFor(CANDIDATES_FIELDS_NAMES.KEYWORDS).type(CREATE_CANDIDATE.KEYWORDS);
    WebElementHandler.getInputFieldFor(CANDIDATES_FIELDS_NAMES.DATE_OF_APPLICATION).clear().type(CREATE_CANDIDATE.DATE_OF_APPLICATION);
    WebElementHandler.getNoteTextarea().type(CREATE_CANDIDATE.NOTES);
    commonHelper.clickOnDropDownList(CANDIDATES_FIELDS_NAMES.VACANCY);
    commonHelper.selectDropDownOption(vacancy); 
 }
  submitCandidateDetails() {
    WebElementHandler.getSubmitButton().click();
    commonHelper.waitFor(2000);
  }
}
export const addCandidatePage = new AddCandidatePage();