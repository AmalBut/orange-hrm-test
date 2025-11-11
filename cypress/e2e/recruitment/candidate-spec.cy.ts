import { CREATE_CANDIDATE } from "../../support/enums/add-candidate-data-enums";
import { CANDIDATE_ACTION_BUTTONS, CANDIDATE_STATUS } from "../../support/enums/candidate-enums";
import { commonHelper } from "../../support/helpers/common-helpers";
import { EmployeeHelper } from "../../support/helpers/employee-api-helper";
import { VacancyHelper } from "../../support/helpers/vacancy-api-helper";
import { loginPage } from "../../support/pages/login-page";
import { addCandidatePage } from "../../support/pages/recruitment-pages/add-candidate-page";
import { candidatePage } from "../../support/pages/recruitment-pages/candidate-page";
import { markInterviewPassedPage } from "../../support/pages/recruitment-pages/mark-interview-passed";
import { recruitmentPage } from "../../support/pages/recruitment-pages/recruitment-page";
import { scheduleInterviewPage } from "../../support/pages/recruitment-pages/schedule-interview-page";
import { shortlistPage } from "../../support/pages/recruitment-pages/shortlist-page";
import { viewCandidatePage } from "../../support/pages/recruitment-pages/view-candidate-page";

describe('Recruitment', () => {
      const baseUrl = Cypress.config().baseUrl;
      let userId: number, employeeId: string, empNumber: number, username: string, fullName: string;
      let vacancyName: string, vacancyId: number, interviewr: string;
    
      before(() => {
        cy.fixture("users").as("users");
        cy.get("@users").then((user: any) => {

          loginPage.visit();
          cy.loginToOrangehrm(user.valid.username, user.valid.password);

          EmployeeHelper.createEmployee().then((response) => {
            expect(response.status).to.eq(200);
            empNumber = response.body.data.empNumber; 
            employeeId = response.body.data.employeeId;
            VacancyHelper.prepareVacancy(undefined, empNumber).then((resp) => {
              expect(resp.status).to.eq(200);
              vacancyId = resp.body.data.id;
              vacancyName = resp.body.data.name;
              interviewr = resp.body.data.hiringManager.lastName;
            });
          });
        });
      });
      it("TC19: Recruitment – Candidates Page: Add, Search, Shortlist & Interview", () => {
        const unique = commonHelper.getUniqueId();
        let candidateLastName = CREATE_CANDIDATE.LAST_NAME + unique;
        let candidateFullName = CREATE_CANDIDATE.FIRST_NAME + " " + CREATE_CANDIDATE.MIDDLE_NAME + " " + candidateLastName;
        recruitmentPage.openFromMenu();
        candidatePage.openFromMenu();
        candidatePage.clickAddCandidateButton();
        addCandidatePage.fillCandidateDetails(vacancyName, unique);
        addCandidatePage.submitCandidateDetails();
        candidatePage.openFromMenu();
        candidatePage.searchCandidate(candidateLastName, vacancyName);
        candidatePage.verifyCandidateIsPresentInTheSearchResults(candidateFullName);
        candidatePage.clickOnViewCandidate();
        viewCandidatePage.clickOnSuccessActionButton(CANDIDATE_ACTION_BUTTONS.SHORTLIST);
        shortlistPage.typeShortlistNote("Shortlist notes for " + candidateFullName);
        shortlistPage.clickOnShortlistConfirmButton();
        viewCandidatePage.checkCandidateStatus(CANDIDATE_STATUS.SHORTLISTED);
        viewCandidatePage.clickOnSuccessActionButton(CANDIDATE_ACTION_BUTTONS.SCHEDULE_INTERVIEW);
        scheduleInterviewPage.fillInterviewDetails(interviewr);
        scheduleInterviewPage.submitInterviewDetails();
        viewCandidatePage.checkCandidateStatus(CANDIDATE_STATUS.INTERVIEW_SCHEDULED);
        viewCandidatePage.clickOnSuccessActionButton(CANDIDATE_ACTION_BUTTONS.MARK_INTERVIEW_PASSED);
        markInterviewPassedPage.typeInterviewPassedNote("Interview passed notes for " + candidateFullName);
        markInterviewPassedPage.clickOnInterviewPassedConfirmButton();
        viewCandidatePage.checkCandidateStatus(CANDIDATE_STATUS.INTERVIEW_PASSED);
        candidatePage.openFromMenu();
        candidatePage.searchCandidate(candidateLastName, vacancyName);
        candidatePage.checkRowContainsDownloadIcon();
        candidatePage.checkRowContainsViewIcon();
      });

      after(() => {
        EmployeeHelper.deleteEmployee(empNumber);
        VacancyHelper.deleteVacancy(vacancyId);
      });

});