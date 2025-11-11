import { commonHelper } from "../../support/helpers/common-helpers";
import { EmployeeHelper } from "../../support/helpers/employee-api-helper";
import { UserHelper } from "../../support/helpers/user-api-helper";
import { buzzPage } from "../../support/pages/buzz-pages/buzz-page";
import { loginPage } from "../../support/pages/login-page";

describe("Add Post functionality", () => {
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
  it("TC18: Buzz - User Adds a New Post", () => {
      cy.get('@postInfo').then((postInfo:any)=>{
            buzzPage.openFromMenu();
            commonHelper.waitFor(2000);
            const content= postInfo.postContent + commonHelper.getRandomString();
            buzzPage.typeInPostTextArea(content);
            buzzPage.clickOnPostBtn();
            buzzPage.checkSuccessToastMessage();
            buzzPage.openFromMenu();
            commonHelper.waitFor(2000);
            buzzPage.checkPostIsAdded(fullName, content)
      })
  });

    after(() => {
      commonHelper.logout();
         cy.get("@users").then((user: any) => {
         cy.loginToOrangehrm(user.valid.username, user.valid.password);
         })
      UserHelper.deleteUser(userId);
      EmployeeHelper.deleteEmployee(empNumber);
  });
});
