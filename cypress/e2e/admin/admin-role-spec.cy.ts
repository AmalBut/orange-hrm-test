import { commonHelper } from "../../support/helpers/common-helpers";
import { EmployeeHelper } from "../../support/helpers/employee-api-helper";
import { addUserPage } from "../../support/pages/admin-pages/add-user-page";
import { adminPage } from "../../support/pages/admin-pages/admin-page";
import { userManagementPage } from "../../support/pages/admin-pages/user-mangement-page";
import { loginPage } from "../../support/pages/login-page";

describe("Admin Role Management", () => {
  before(() => {
    cy.fixture("users").as("users");
    cy.session("Login", () => {
      loginPage.visit();
      cy.get("@users").then((users: any) => {
        cy.loginToOrangehrm(users.valid.username, users.valid.password);
      });
    });

    let employeeId;
    EmployeeHelper.createEmployee().then((response) => {
      expect(response.status).to.eq(200);
      employeeId = response.body.employeeId;
    });
  });

  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("messages").as("messages");
    loginPage.visit();
    adminPage.openFromMenu();
  });

  it.only("TC11: Add New System User (Admin Role)", () => {
    userManagementPage.clickOnAddButton();

    cy.get("@users").then((users: any) => {
      let username = users.addUserData.username + commonHelper.getUniqueEmployeeId();
      addUserPage.clickOnDropDownList("User Role");
      addUserPage.selectDropDownOption(users.addUserData.userRole);
      addUserPage.clickOnDropDownList("Status");
      addUserPage.selectDropDownOption(users.addUserData.status);
      addUserPage.typeEmployeeName(users.addUserData.employeeName);
      commonHelper.waitFor(2000);
      addUserPage.selectDropDownOptionByIndex(0);
      addUserPage.typeUsername(username);
      addUserPage.typePassword(users.addUserData.password);
      addUserPage.typeConfirmPassword(users.addUserData.confirmPassword);
      addUserPage.clickOnSaveBtn();
      commonHelper.waitFor(2000);
      userManagementPage.checkUserDataInTable(username, users.addUserData.userRole, users.addUserData.employeeName, users.addUserData.status);
    });
  });

  it("TC12: User Search by Username, Role, name and status", () => {});

  it("TC13: Edit User Role and status", () => {});

  it("TC14: Delete User from the system", () => {});

  it("TC15: Add Employee with Photo & Login Details", () => {});

  it("TC16: Add Employee Validation Errors", () => {});

  it("TC17: Leave - Employee Applies, Admin Approves, Employee Checks Status", () => {});

  it("TC18: Buzz - User Adds a New Post", () => {});

  it("TC19: Recruitment – Candidates Page: Add, Search, Shortlist & Interview", () => {});

  it("TC20: Assign Job Details", () => {});
});
