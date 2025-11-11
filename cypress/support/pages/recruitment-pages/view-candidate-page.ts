

const LOCATORS = {
  SHORTLIST_BTN: '.oxd-button--success',
  CANDIDATE_STATUS_LABEL: '.orangehrm-recruitment-status'
};

export class ViewCandidatePage{

  clickOnSuccessActionButton(action: string){
    cy.get(LOCATORS.SHORTLIST_BTN).contains(action).click();
  }

  checkCandidateStatus(status : string){
    cy.get(LOCATORS.CANDIDATE_STATUS_LABEL).should('be.visible').and('contain',status);
  }
}
export const viewCandidatePage = new ViewCandidatePage();