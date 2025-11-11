import { commonHelper } from "../../helpers/common-helpers";
import { WebElementHandler } from "../../helpers/web-element-handler";
import { WebTableHandler } from "../../helpers/web-table-handler";
import { addUserPage } from "./add-user-page";

const LOCATORS = {
  TABLE_CELLS: ".oxd-table-cell",
};

class UserManagementPage {
  clickOnAddButton() {
    WebElementHandler.getAddButton().click();
  }

  checkUserDataInTable(
    username: string,
    role: string,
    name: string,
    status: string
  ) {
    WebTableHandler.getTableRows().then(($rows) => {
      let usernameFound = false;
      for (let row of $rows) {
        if (row.innerText.includes(username)) {
          cy.wrap(row)
            .find(LOCATORS.TABLE_CELLS)
            .then(($cells) => {
              cy.wrap($cells[1]).invoke("text").should("eq", username);
              cy.wrap($cells[2]).invoke("text").should("eq", role);
              cy.wrap($cells[3]).invoke("text").should("eq", name);
              cy.wrap($cells[4]).invoke("text").should("eq", status);
            });
          break;
        }
      }
    });
  }

  typeInUsernameSearchField(username: string) {
    WebElementHandler.getInputFieldFor("Username").type(username);
  }

  typeInNameSearchField(name: string) {
    WebElementHandler.getInputFieldFor("Name").type(name);
    commonHelper.waitFor(2000);
    commonHelper.selectDropDownOptionByIndex(0);
  }

  selectStatusInSearchField(status: string) {
    WebElementHandler.getDropDownList("Status").click();
    WebElementHandler.getDropDownOptions().contains(status).click();
  }

  selectRoleInSearchField(role: string) {
    WebElementHandler.getDropDownList("User Role").click();
    WebElementHandler.getDropDownOptions().contains(role).click();
  }

  clickOnEditButtonForUser(username: string) {
    WebTableHandler.getTableRows().then(($rows) => {
      for (let $row of $rows) {
        if ($row.innerText.includes(username)) {
          WebTableHandler.getEditButtonForRow($row).click();
          break;
        }
      }
    });
  }

  clickOnDeleteButtonForUser(){
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

  fillSearchFields(username: string, role: string, name: string, status: string){
    this.typeInUsernameSearchField(username);
    this.selectRoleInSearchField(role);
    this.typeInNameSearchField(name);
    this.selectStatusInSearchField(status);
  }

  checkNoRecordsFoundIsVisible(){
    WebElementHandler.getText().contains('No Records Found').should('be.visible');
  }
}
export const userManagementPage = new UserManagementPage();
