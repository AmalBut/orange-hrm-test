import { LEAVE_FIELDS_NAMES } from "../../support/enums/fields-enum";
import { commonHelper } from "../../support/helpers/common-helpers";
import { userManagementPage } from "../../support/pages/admin-pages/user-mangement-page";
import { addEntitlementsPage } from "../../support/pages/leave-pages/add-entitlements-page";
import { applyLeavePage } from "../../support/pages/leave-pages/apply-leave-page";
import { leaveListPage } from "../../support/pages/leave-pages/leave-list";
import { leavePage } from "../../support/pages/leave-pages/leave-page";
import { myLeavePage } from "../../support/pages/leave-pages/my-leave-page";
import { loginPage } from "../../support/pages/login-page";
import { addEmployeePage } from "../../support/pages/pim-pages/add-employee-page";
import { employeeListPage } from "../../support/pages/pim-pages/employee-list";
import { pimPage } from "../../support/pages/pim-pages/pim-page";

describe("Leave Application functionality", () => {
  let baseUrl = Cypress.config().baseUrl;
  let username = '', empFullName='';
  before(() => {
    cy.fixture('users').as('users');
    cy.fixture('employees').as('employees');
    cy.fixture('leaves').as('leave');
    cy.fixture('messages').as('messages')
  });
  it("TC17: Leave - Employee Applies, Admin Approves, Employee Checks Status", () => {
    adminLogin();
    commonHelper.waitFor(1000);
    pimPage.openFromMenu();
    createEmployee().then((employeeId)=>{
      leavePage.openFromMenu();
      leavePage.openAddEntitlements();
      addEntitlement();
      commonHelper.logout();
      employeeLogin();
      leavePage.openFromMenu();
      leavePage.openApply();
      commonHelper.waitFor(2000);
      applyLeave().then(({date, employeeName, leaveType})=>{
        commonHelper.logout();
        adminLogin();
        leavePage.openFromMenu();
        leavePage.openLeaveList();
        leaveListPage.approveLeave(date, employeeName, leaveType);
        commonHelper.logout();
        employeeLogin();
        leavePage.openFromMenu();
        leavePage.openMyLeave();
        leavePage.searchForLeave(date,leaveType);
        cy.get('@messages').then((msg:any)=>{
          myLeavePage.checkLeaveIsApproved(msg.Scheduled);
        });
        myLeavePage.checkLeaveBalance();
      })
      commonHelper.logout();
      adminLogin();
      pimPage.openFromMenu();
      deleteEmployee(employeeId);
    });
  });

  function createEmployee():Cypress.Chainable<string>{
    const employeeId = commonHelper.getUniqueId();
    employeeListPage.clickOnAddButton();
    return cy.get("@employees").then((employee: any) => {
      const firstName = employee.newEmployee.firstName;
      const middleName = employee.newEmployee.middleName;
      const lastName = employee.newEmployee.lastName + commonHelper.getUniqueId();
      empFullName=firstName+" "+middleName+" "+lastName;
      username = employee.newEmployee.username + commonHelper.getUniqueId();
      addEmployeePage.typeFirstName(firstName);
      addEmployeePage.typeMiddleName(middleName);
      addEmployeePage.typeLastName(lastName);
      addEmployeePage.typeEmployeeId(employeeId);
      addEmployeePage.clickOnCreateLoginDetailsSwitch();
      addEmployeePage.typeUsername(username);
      addEmployeePage.typePassword(employee.newEmployee.password);
      addEmployeePage.typeConfirmPassword(employee.newEmployee.password);
      addEmployeePage.clickOnSaveButton();
      commonHelper.waitFor(5000);
      pimPage.openEmployeeList();
      employeeListPage.checkEmployeeInList(
        employeeId,
        firstName,
        middleName,
        lastName
      );
      return cy.wrap(employeeId);

    });
  }

  function addEntitlement() {
    cy.get("@leave").then((leave: any) => {
      addEntitlementsPage.typeEmployeeName(empFullName);
      commonHelper.waitFor(2000);
      commonHelper.selectDropDownOptionByIndex(0);
      commonHelper.clickOnDropDownList(LEAVE_FIELDS_NAMES.LEAVE_TYPE);
      commonHelper.selectDropDownOption(leave.newLeave.leaveType);
      addEntitlementsPage.typeEntitlementsValue(leave.newLeave.entitlement)
      addEntitlementsPage.clickOnSaveBtn();
      addEntitlementsPage.clickOnConfirmBtn();
      addEntitlementsPage.checkEntitlementInList(
        leave.newLeave.leaveType,
        leave.newLeave.entitlement
      );
      });
  }

  function applyLeave():Cypress.Chainable<{ date: string, employeeName: string, leaveType: string}> {
    return cy.get('@leave').then((leave:any)=>{        
        applyLeavePage.selectLeaveType(leave.newLeave.leaveType);
        return commonHelper.selectFutureDate().then((date) => {
        let selectedDate = date as string;
        applyLeavePage.clickOnApplyButton();
        commonHelper.waitFor(2000);
        leavePage.openMyLeave();
        return cy.get('@messages').then((msg:any)=>{
          myLeavePage.checkLeaveIsAdded(selectedDate,empFullName,leave.newLeave.leaveType, msg.pendingApproval);
          return cy.wrap({
            date: selectedDate,
            employeeName: empFullName,
            leaveType: leave.newLeave.leaveType,
        });
        });
      });
    });
  }

  function deleteEmployee(employeeId: string){
    employeeListPage.typeInEmployeeIdSearchField(employeeId);
    commonHelper.clickOnSearchButton();
    employeeListPage.clickOnDeleteButtonForEmplyee();
    employeeListPage.clickOnConfirmDeleteButton();
    employeeListPage.checkSuccessToastMessage();
    employeeListPage.checkNoRecordsFoundIsVisible();
  }

  function employeeLogin() {
    cy.get("@employees").then((emp: any) => {
      loginPage.visit();
      cy.loginToOrangehrm(username, emp.newEmployee.password);
    });
  }

  function adminLogin() {
    loginPage.visit();
    cy.get("@users").then((users: any) => {
      cy.loginToOrangehrm(users.valid.username, users.valid.password);
    });
  }
});
