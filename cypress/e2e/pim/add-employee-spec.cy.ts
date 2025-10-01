import { loginPage } from "../../support/pages/login-page";
import { pimPage } from "../../support/pages/pim-page";


describe("Add Employee functionality", () => {
  beforeEach(() => {
    cy.fixture("users").as("usersData");
    cy.fixture("employees").as("employeeData");
    loginPage.visit();

    cy.get("@usersData").then((user: any) => {
      cy.loginToOrangehrm(user.valid.username, user.valid.password);
    });
    pimPage.openFromMenu();
  });

  it("Verify that user can add new employee successfully", () => {
    pimPage.clickOnAddButton();
    cy.get("@employeeData").then((emp: any) => {
      pimPage.typeFirstName(emp.fullData.firstName);
      pimPage.typeMiddleName(emp.fullData.middleName);
      pimPage.typeLastName(emp.fullData.lastName);
    });
    pimPage.clickOnSaveButton();
  });
});
