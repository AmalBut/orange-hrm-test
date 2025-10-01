import { APP_MODULES, MODULES_URL_FREG } from "../../enums/modules-enums";
import { WebTableHandler } from "../../helpers/web-table-handler";

const LOCATORS = {
  mainMenuItem: ".oxd-main-menu-item",
  headerH: "h6.oxd-topbar-header-breadcrumb-module",
};

class AdminPage {
  openFromMenu() {
    cy.contains(LOCATORS.mainMenuItem, APP_MODULES.Admin).click();
  }

  checkHeader() {
    cy.get(LOCATORS.headerH).should("contain", APP_MODULES.Admin);
  }

  checkUrl() {
    cy.url().should("include", MODULES_URL_FREG.Admin);
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
export const adminPage = new AdminPage();
