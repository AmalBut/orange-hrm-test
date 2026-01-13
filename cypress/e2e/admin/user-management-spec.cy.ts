import { commonHelper } from "../../support/helpers/common-helpers";
import { EmployeeHelper } from "../../support/helpers/employee-api-helper";
import { UserHelper } from "../../support/helpers/user-api-helper";
import { addUserPage } from "../../support/pages/admin-pages/add-user-page";
import { adminPage } from "../../support/pages/admin-pages/admin-page";
import { editUserPage } from "../../support/pages/admin-pages/edit-user-page";
import { userManagementPage } from "../../support/pages/admin-pages/user-mangement-page";
import { loginPage } from "../../support/pages/login-page";

describe("User Management", () => {
  let username: string, userRole: string, status: string, employeeName: string;
  let userId: number, employeeId: string, empNumber: number;
  let isDeleteUserCase = false;
  let baseUrl = Cypress.config().baseUrl; 
function loginSession() {
  cy.session('user', () => {
     cy.fixture("users").as("users");
    loginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.loginToOrangehrm(users.valid.username, users.valid.password);
    });
  }, {
    validate: () => {
      cy.request({url:`${baseUrl}/dashboard/index`, failOnStatusCode: false}).its('status').should('eq', 200);
    }
  });
}

  before(() => {
    cy.fixture("users").as("users");
    loginSession();
    EmployeeHelper.createEmployee().then((response) => {
      expect(response.status).to.eq(200);
      employeeId = response.body.data.employeeId;
      empNumber = response.body.data.empNumber;

      UserHelper.createUser(undefined,empNumber).then((resp) => {
        expect(resp.status).to.eq(200);
        username = resp.body.data.userName;
        status = resp.body.data.status ? "Enabled" : "Disabled";
        userRole = resp.body.data.userRole.name;
        employeeName =
          resp.body.data.employee.firstName +
          " " +
          resp.body.data.employee.lastName;
        userId = resp.body.data.id;
      });
    });
  });

  beforeEach(() => {
    loginSession();
    commonHelper.visitBaseUrl();
    commonHelper.waitFor(2000);
    adminPage.openFromMenu();
  });

  it("TC11: Add New System User (Admin Role)", () => {
    userManagementPage.clickOnAddButton();

    cy.get("@users").then((users: any) => {
      let username = users.addUserData.username + commonHelper.getUniqueId();
      commonHelper.clickOnDropDownList("User Role");
      commonHelper.selectDropDownOption(users.addUserData.userRole);
      commonHelper.clickOnDropDownList("Status");
      commonHelper.selectDropDownOption(users.addUserData.status);
      addUserPage.typeEmployeeName(users.addUserData.employeeName);
      commonHelper.waitFor(2000);
      commonHelper.selectDropDownOptionByIndex(0);
      addUserPage.typeUsername(username);
      addUserPage.typePassword(users.addUserData.password);
      addUserPage.typeConfirmPassword(users.addUserData.confirmPassword);
      addUserPage.clickOnSaveBtn();
      commonHelper.waitFor(2000);
      userManagementPage.checkUserDataInTable(
        username,
        users.addUserData.userRole,
        users.addUserData.employeeName,
        users.addUserData.status
      );
    });
  });

  it("TC12: User Search by Username, Role, name and status", () => {
    userManagementPage.typeInUsernameSearchField(username);
    userManagementPage.typeInNameSearchField(employeeName);
    userManagementPage.selectRoleInSearchField(userRole);
    userManagementPage.selectStatusInSearchField(status);
    commonHelper.clickOnSearchButton();
    userManagementPage.checkUserDataInTable(
      username,
      userRole,
      employeeName,
      status
    );
  });

  it("TC13: Edit User Role and status", () => {
    userManagementPage.clickOnEditButtonForUser(username);
    commonHelper.clickOnDropDownList("User Role");
    editUserPage.selectDropDownOption().then((newUserRole: any) => {
      userRole=newUserRole;
      commonHelper.clickOnDropDownList("Status");
      editUserPage.selectDropDownOption().then((newStatus: any) => {
        status=newStatus;
        editUserPage.clickOnSaveBtn();
        commonHelper.waitFor(5000);
        userManagementPage.typeInUsernameSearchField(username);
        commonHelper.clickOnSearchButton();
        userManagementPage.checkUserDataInTable(
          username,
          newUserRole,
          employeeName,
          newStatus
        );
      });
    });
  });

  it("TC14: Delete User from the system", () => {
    isDeleteUserCase = true;
    userManagementPage.fillSearchFields(username, userRole, employeeName, status);
    commonHelper.clickOnSearchButton();
    userManagementPage.clickOnDeleteButtonForUser();
    userManagementPage.clickOnConfirmDeleteButton();
    userManagementPage.checkSuccessToastMessage();
    userManagementPage.checkNoRecordsFoundIsVisible();
  });

  after(() => {
    if (!isDeleteUserCase) {
      UserHelper.deleteUser(userId);
    }
    EmployeeHelper.deleteEmployee(empNumber);
  });
});
