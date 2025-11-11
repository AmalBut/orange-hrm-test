import { COMMON_FIELDS_NAMES } from "../../support/enums/fields-enum";
import { commonHelper } from "../../support/helpers/common-helpers";
import { EmployeeHelper } from "../../support/helpers/employee-api-helper";
import { loginPage } from "../../support/pages/login-page";
import { addEmployeePage } from "../../support/pages/pim-pages/add-employee-page";
import { employeeListPage } from "../../support/pages/pim-pages/employee-list";
import { pimPage } from "../../support/pages/pim-pages/pim-page";

describe("Add Employee functionality", () => {
  let baseUrl = Cypress.config().baseUrl;
  let empNumber = 0;
  function loginSession() {
    cy.fixture("users").as("users");
    cy.session(
      "user",
      () => {
        loginPage.visit();
        cy.get("@users").then((users: any) => {
          cy.loginToOrangehrm(users.valid.username, users.valid.password);
        });
      },
      {
        validate: () => {
          cy.request({
            url: `${baseUrl}/dashboard/index`,
            failOnStatusCode: false,
          })
            .its("status")
            .should("eq", 200);
        },
      }
    );
  }

  beforeEach(() => {
    cy.fixture("employees").as("employeeData");
    cy.fixture("messages").as("messages");
    loginSession();
    commonHelper.visitBaseUrl();
    commonHelper.waitFor(2000);
    pimPage.openFromMenu();
  });

  it.only("TC15: Add Employee with Photo & Login Details", () => {
    let employeeId = commonHelper.getUniqueId();
    const imageFile = "female.jpg";

    employeeListPage.clickOnAddButton();
    cy.get("@employeeData").then((employee: any) => {
      const firstName = employee.newEmployee.firstName;
      const middleName = employee.newEmployee.middleName;
      const lastName = employee.newEmployee.lastName;

      addEmployeePage.typeFirstName(firstName);
      addEmployeePage.typeMiddleName(middleName);
      addEmployeePage.typeLastName(lastName);
      addEmployeePage.typeEmployeeId(employeeId);
      addEmployeePage.clickOnCreateLoginDetailsSwitch();
      addEmployeePage.typeUsername(
        employee.newEmployee.username + commonHelper.getUniqueId()
      );
      addEmployeePage.typePassword(employee.newEmployee.password);
      addEmployeePage.typeConfirmPassword(employee.newEmployee.password);
      addEmployeePage.addEmployeeImage(imageFile);

      cy.intercept(
        "POST",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees"
      ).as("saveEmployee");
      addEmployeePage.clickOnSaveButton();
      commonHelper.waitFor(5000);

      cy.wait("@saveEmployee").then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        empNumber = interception.response?.body?.data?.empNumber;
        employeeListPage.checkEmployeeImage(
          empNumber,
          "cypress/fixtures/female.jpg"
        );
      });

      pimPage.openEmployeeList();
      employeeListPage.checkEmployeeInList(
        employeeId,
        firstName,
        middleName,
        lastName
      );

    });
  });

  it("TC16: Add Employee Validation Errors", () => {
    const wrongImageFile = "file.exe";
    let employeeId = commonHelper.getUniqueId();
    employeeListPage.clickOnAddButton();
    cy.get("@employeeData").then((employee: any) => {
      addEmployeePage.typeFirstName(employee.wrongEmployeeData.firstName);
      addEmployeePage.typeLastName(employee.newEmployee.lastName);
      addEmployeePage.typeEmployeeId(employeeId);
      addEmployeePage.clickOnCreateLoginDetailsSwitch();
      addEmployeePage.typeUsername(employee.newEmployee.username + commonHelper.getUniqueId());
      addEmployeePage.typePassword(employee.wrongEmployeeData.password);
      addEmployeePage.typeConfirmPassword(employee.wrongEmployeeData.password);
      addEmployeePage.addEmployeeImage(wrongImageFile);
      addEmployeePage.clickOnSaveButton();
      cy.get('@messages').then((msg:any)=>{
        addEmployeePage.checkRequiredMsgFor(COMMON_FIELDS_NAMES.FIRST_NAME,msg.requiresMsg);
        addEmployeePage.checkPasswordLengthError(msg.passwordAtLeast7);
        addEmployeePage.checkInvalidProfileImageError(msg.fileTypeNotAllowed);
      })
    
    });
  });

  after(() => {
    EmployeeHelper.deleteEmployee(empNumber);
  });
});
