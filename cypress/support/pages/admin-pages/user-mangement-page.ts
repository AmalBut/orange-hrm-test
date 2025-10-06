import { commonHelper } from "../../helpers/common-helpers";
import { WebElementHandler } from "../../helpers/web-element-handler";
import { WebTableHandler } from "../../helpers/web-table-handler";
import { addUserPage } from "./add-user-page";

const LOCATORS = {
  TABLE_CELLS: '.oxd-table-cell',

}

class UserManagementPage{
    clickOnAddButton(){
        WebElementHandler.addButton().click();
    }
   
  checkUserDataInTable(username: string, role: string, name: string, status: string) {
    WebTableHandler.getTableRows().then(($rows) => {
      let usernameFound = false;
      for (let row of $rows) {
        if (row.innerText.includes(username)) {
            cy.wrap(row).find(LOCATORS.TABLE_CELLS).then(($cells) => {
              cy.wrap($cells[1]).invoke('text').should('eq',username)
              cy.wrap($cells[2]).invoke('text').should('eq',role)
              cy.wrap($cells[3]).invoke('text').should('eq',name)
              cy.wrap($cells[4]).invoke('text').should('eq',status)
            });
          break;
        }
      }
    });
  }

  typeInUsernameSearchField(username: string) {
    WebElementHandler.inputFieldFor("Username").type(username);
  }

  typeInNameSearchField(name: string) {
    WebElementHandler.inputFieldFor("Name").type(name);
    commonHelper.waitFor(2000);
    addUserPage.selectDropDownOptionByIndex(0);

  }

  selectStatusInSearchField(status: string) {
    WebElementHandler.dropDownList("Status").click();
    WebElementHandler.dropDownOptions().contains(status).click();
  }

  selectRoleInSearchField(role: string) {
    WebElementHandler.dropDownList("User Role").click();
    WebElementHandler.dropDownOptions().contains(role).click();
  }

  clickOnSearchButton() {
    WebElementHandler.saveButton().click();
  }
}
export const userManagementPage = new UserManagementPage();