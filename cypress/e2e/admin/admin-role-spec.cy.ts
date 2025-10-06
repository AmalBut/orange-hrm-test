import { commonHelper } from "../../support/helpers/common-helpers";
import { EmployeeHelper } from "../../support/helpers/employee-api-helper";
import { UserHelper } from "../../support/helpers/user-api-helper";
import { addUserPage } from "../../support/pages/admin-pages/add-user-page";
import { adminPage } from "../../support/pages/admin-pages/admin-page";
import { userManagementPage } from "../../support/pages/admin-pages/user-mangement-page";
import { loginPage } from "../../support/pages/login-page";

describe("Admin Role Management", () => {
  let username: string, userRole: string,status: string, employeeName: string;
  let userId: number, employeeId: string, empNumber: number;
  before(() => {
    cy.fixture("users").as("users");
      loginPage.visit();
      cy.get("@users").then((users: any) => {
        cy.loginToOrangehrm(users.valid.username, users.valid.password);
      });

    EmployeeHelper.createEmployee().then((response) => {
      expect(response.status).to.eq(200);
      employeeId = response.body.data.employeeId;
      empNumber = response.body.data.empNumber;
      UserHelper.createUser(empNumber).then((resp) => {
        expect(resp.status).to.eq(200);
        username = resp.body.data.userName;
        status = resp.body.data.status ? "Enabled" : "Disabled";
        userRole = resp.body.data.userRole.name;
        employeeName =  resp.body.data.employee.firstName + " " + resp.body.data.employee.lastName;
        userId = resp.body.data.id;
      });
    });
  });

  beforeEach(() => {
    cy.fixture("users").as("users");
    cy.fixture("messages").as("messages");
    cy.session("Login", () => {
      loginPage.visit();
      cy.get("@users").then((users: any) => {
        cy.loginToOrangehrm(users.valid.username, users.valid.password);
      });
    });
    commonHelper.visitBaseUrl();
    adminPage.openFromMenu();
  });

  it("TC11: Add New System User (Admin Role)", () => {
    userManagementPage.clickOnAddButton();

    cy.get("@users").then((users: any) => {
      let username = users.addUserData.username + commonHelper.getUniqueId();
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
      userManagementPage.checkUserDataInTable(
        username,
        users.addUserData.userRole,
        users.addUserData.employeeName,
        users.addUserData.status
      );
    });
  });

  it.only("TC12: User Search by Username, Role, name and status", () => {
    userManagementPage.typeInUsernameSearchField(username);
    userManagementPage.typeInNameSearchField(employeeName);
    userManagementPage.selectRoleInSearchField(userRole);
    userManagementPage.selectStatusInSearchField(status);
    userManagementPage.clickOnSearchButton();
    userManagementPage.checkUserDataInTable(
      username,
      userRole,
      employeeName,
      status
    );
  });

  it("TC13: Edit User Role and status", () => {

  });

  it("TC14: Delete User from the system", () => {});

  it("TC15: Add Employee with Photo & Login Details", () => {});

  it("TC16: Add Employee Validation Errors", () => {});

  it("TC17: Leave - Employee Applies, Admin Approves, Employee Checks Status", () => {});

  it("TC18: Buzz - User Adds a New Post", () => {});

  it("TC19: Recruitment – Candidates Page: Add, Search, Shortlist & Interview", () => {});

  it("TC20: Assign Job Details", () => {});

  after(() => {
    UserHelper.deleteUser(userId);
    EmployeeHelper.deleteEmployee(empNumber);
  });
});
