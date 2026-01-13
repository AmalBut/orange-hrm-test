import { EMPLOYEE_FIELDS_NAMES } from "../../enums/fields-enum";
import { commonHelper } from "../../helpers/common-helpers";
import { WebElementHandler } from "../../helpers/web-element-handler";
import { WebTableHandler } from "../../helpers/web-table-handler";

const LOCATORS = {
  EMPLOYEE_IMAGE: ".employee-image",
  TABLE_CELLS: ".oxd-table-cell",
};

class EmployeeListPage {
  clickOnAddButton() {
    WebElementHandler.getAddButton().click();
  }

  checkEmployeeId(id: string) {
    WebElementHandler.getInputFieldFor(
      EMPLOYEE_FIELDS_NAMES.EMPLOYEE_ID
    ).should("have.value", id);
  }

  checkEmployeeImage(employeeNumber: number, imageFilePath: string) {
    console.log("empNumber: ", employeeNumber);
    cy.readFile(imageFilePath, "base64").then((expectedBase64) => {
      cy.request({
        method: "GET",
        url: `https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPhoto/empNumber/${employeeNumber}`,
        encoding: "base64",
      }).then((res) => {
        debugger;
        // expect(res.status).to.eq(200);
        console.log(res.body);
        console.log(expectedBase64);
        expect(res.body).to.eq(expectedBase64);
      });
    });
  }

  typeInEmployeeIdSearchField(id: string) {
    WebElementHandler.getInputFieldFor(EMPLOYEE_FIELDS_NAMES.EMPLOYEE_ID).type(
      id
    );
  }

  checkEmployeeInList(
    id: string,
    firstName: string,
    middleName: string,
    lastName: string
  ) {
    this.typeInEmployeeIdSearchField(id);
    commonHelper.clickOnSearchButton();
    WebTableHandler.getTableRows()
      .should("have.length", 1)
      .first()
      .within(() => {
        cy.get(LOCATORS.TABLE_CELLS).then(($cells) => {
          cy.wrap($cells[1]).invoke("text").should("eq", id);
          cy.wrap($cells[2])
            .invoke("text")
            .should("eq", `${firstName} ${middleName}`);
          cy.wrap($cells[3]).invoke("text").should("eq", lastName);
        });
      });
  }

  clickOnDeleteButtonForEmplyee(){
     WebTableHandler.getTableRows().eq(0).then(($row)=>{
        WebTableHandler.getDeleteButtonForRow($row.get(0)).click();
     });
  }

  clickOnConfirmDeleteButton(){
    WebElementHandler.getConfirmDeleteButton().click();
  }

  checkSuccessToastMessage(){
    WebElementHandler.getSuccessToast().should('be.visible').and('contain','Successfully Deleted');
  }

  checkNoRecordsFoundIsVisible(){
    WebElementHandler.getText().contains('No Records Found').should('be.visible');
  }
}
export const employeeListPage = new EmployeeListPage();
