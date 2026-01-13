import { LEAVE_FIELDS_NAMES } from "../../enums/fields-enum";
import { WebElementHandler } from "../../helpers/web-element-handler";
import { WebTableHandler } from "../../helpers/web-table-handler";

const LOCATORS = {
  UPDATE_CONFIRM_BTN: '.oxd-button--secondary',  
  TABLE_CELLS: ".oxd-table-cell",
};

class AddEntitlementsPage {

  typeEmployeeName(employeeName: string) {
    WebElementHandler.getInputFieldFor("Employee Name").type(employeeName);
  }

  typeEntitlementsValue(value: string) {
    WebElementHandler.getInputFieldFor(LEAVE_FIELDS_NAMES.ENTITLEMENTS).type(value);
  }

  clickOnSaveBtn(){
    WebElementHandler.getSubmitButton().click();
  }

  clickOnConfirmBtn(){
    cy.contains(LOCATORS.UPDATE_CONFIRM_BTN,'Confirm').click();
  }

   checkEntitlementInList(leaveType: string, days: string) {
      WebTableHandler.getTableRows()
        .first()
        .within(() => {
          cy.get(LOCATORS.TABLE_CELLS).then(($cells) => {
            cy.wrap($cells[1]).invoke("text").should("eq", leaveType);
            cy.wrap($cells[5])
              .invoke("text")
              .should("eq", days);
          });
        });
    }
}
export const addEntitlementsPage = new AddEntitlementsPage();
