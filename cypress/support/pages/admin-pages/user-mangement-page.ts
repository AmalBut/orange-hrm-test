import { WebElementHandler } from "../../helpers/web-element-handler";
import { WebTableHandler } from "../../helpers/web-table-handler";

const LOCATORS = {

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
          usernameFound = true;
          expect(row.innerText).to.contain(role);
          expect(row.innerText).to.contain(name);
          expect(row.innerText).to.contain(status);
          break;
        }
      }
      expect(usernameFound).to.be.true;
    });
  }
    
}
export const userManagementPage = new UserManagementPage();