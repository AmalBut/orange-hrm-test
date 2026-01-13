import { commonHelper } from "../../support/helpers/common-helpers";
import { EmployeeHelper } from "../../support/helpers/employee-api-helper";
import { UserHelper } from "../../support/helpers/user-api-helper";
import { WebElementHandler } from "../../support/helpers/web-element-handler";
import { loginPage } from "../../support/pages/login-page";
import { jobPage } from "../../support/pages/my-info-pages/job-details-page";

describe("Job Details", () => {
 const baseUrl = Cypress.config().baseUrl;
  let userId: number, employeeId: string, empNumber: number, username: string, fullName: string;

  before(() => {
    cy.fixture("users").as("users");
    cy.fixture('post-info').as('postInfo');
    cy.get("@users").then((user: any) => {
      loginPage.visit();
      cy.loginToOrangehrm(user.valid.username, user.valid.password);
      employeeId = commonHelper.getUniqueId();
      const firstName = user.essUser.firstName;
      const middleName = user.essUser.middleName;
      const lastName = user.essUser.lastName + employeeId;
      username = user.essUser.username + employeeId;
      fullName = firstName + ' ' + lastName;
      const password = user.essUser.password;
      const userRoleId = Number(user.essUser.userRole);
      const status = user.essUser.status === 1 ? true : false;

      EmployeeHelper.createEmployee({
        firstName,
        middleName,
        lastName,
        employeeId,
      }).then((response) => {
        expect(response.status).to.eq(200);
        empNumber = response.body.data.empNumber;  
        UserHelper.createUser({
          username,
          password,
          status,
          userRoleId,
          empNumber
        }, undefined).then((resp) => {
          expect(resp.status).to.eq(200);
          userId = resp.body.data.id;
        });
      });
      commonHelper.logout();
      cy.loginToOrangehrm(username, password);
    });

  });
  it("TC20: Assign Job Details", () => {
    cy.fixture('job-details').as('job');
    cy.get('@job').then((job:any)=>{
    jobPage.openFromMenu();
    commonHelper.waitFor(2000);
    jobPage.typeInJobTitleDropDown(job.jobDetails.jobTitle);
    jobPage.typeInEmploymentStatusDropDown(job.jobDetails.employmentStatus);
    jobPage.typeInSubUnitDropDown(job.jobDetails.subUnit);
    jobPage.typeInLocationDropDown(job.jobDetails.location);
    jobPage.typeInJoinedDate(job.jobDetails.joinedDate);
    jobPage.clickOnSaveButton();
    jobPage.checkJobDetailsUpdatedSuccessfully(
        job.jobDetails.jobTitle,
        job.jobDetails.employmentStatus,
        job.jobDetails.subUnit,
        job.jobDetails.location,
        job.jobDetails.joinedDate
    );
  });
  });

    after(() => {
      cy.fixture("users").as("users");
      commonHelper.logout();
         cy.get("@users").then((user: any) => {
         cy.loginToOrangehrm(user.valid.username, user.valid.password);
         })
      UserHelper.deleteUser(userId);
      EmployeeHelper.deleteEmployee(empNumber);
  });


});
