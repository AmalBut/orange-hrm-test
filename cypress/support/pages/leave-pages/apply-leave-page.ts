import { LEAVE_FIELDS_NAMES } from "../../enums/fields-enum";
import { commonHelper } from "../../helpers/common-helpers";
import { WebElementHandler } from "../../helpers/web-element-handler";

export class ApplyLeavePage {
  
  selectLeaveType(leaveType:string){
    cy.get('@leave').then((leave:any)=>{
      commonHelper.clickOnDropDownList(LEAVE_FIELDS_NAMES.LEAVE_TYPE);
      commonHelper.selectDropDownOption(leaveType);
    })
  }

  clickOnApplyButton(){
    WebElementHandler.getSubmitButton().click();
  }
}
export const applyLeavePage = new ApplyLeavePage();