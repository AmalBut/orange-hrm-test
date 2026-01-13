import { CANDIDATES_FIELDS_NAMES } from "../../enums/fields-enum";
import { RECRUITMENT_NAV_TABS } from "../../enums/nav-tabs-enum";
import { commonHelper } from "../../helpers/common-helpers";
import { WebElementHandler } from "../../helpers/web-element-handler";
import { WebTableHandler } from "../../helpers/web-table-handler";

class CandidatePage {
  openFromMenu() {
    WebElementHandler.getNavTab(RECRUITMENT_NAV_TABS.CANDIDATES).click();
  }

  clickAddCandidateButton() {
    WebElementHandler.getAddButton().click();
  }

  searchCandidate(candidateName: string, vacancyName: string) {
    WebElementHandler.getInputFieldFor(CANDIDATES_FIELDS_NAMES.CANDIDATE_NAME).type(candidateName);
    commonHelper.waitFor(2000);
    commonHelper.selectDropDownOptionByIndex(0);
    commonHelper.clickOnDropDownList(CANDIDATES_FIELDS_NAMES.VACANCY);
    commonHelper.selectDropDownOption(vacancyName);
    WebElementHandler.getSearchButton().click();
  }
  verifyCandidateIsPresentInTheSearchResults(candidateName: string) {
    WebTableHandler.getTableRows().first().invoke("text").should("contain", candidateName);
  }

  clickOnViewCandidate(){
    WebTableHandler.getTableRows().eq(0).then(($row)=>{
      WebTableHandler.getViewButtonForRow($row.get(0)).click();
    });
  }

  checkRowContainsDownloadIcon(){
    WebTableHandler.getTableRows().eq(0).then(($row)=>{
      WebTableHandler.getDownloadButtonForRow($row.get(0)).should("exist");
    });
  }
  
  checkRowContainsViewIcon(){
    WebTableHandler.getTableRows().eq(0).then(($row)=>{
      WebTableHandler.getViewButtonForRow($row.get(0)).should("exist");
    });
  }
}
export const candidatePage = new CandidatePage();
