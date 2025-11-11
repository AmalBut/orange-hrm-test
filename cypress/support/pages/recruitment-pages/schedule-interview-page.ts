import { SCHEDULE_INTERVIEW_FIELDS_NAMES } from "../../enums/fields-enum";
import { commonHelper } from "../../helpers/common-helpers";
import { WebElementHandler } from "../../helpers/web-element-handler";

export class ScheduleInterviewPage {
  fillInterviewDetails(interviewr: string) {
    const unique = commonHelper.getUniqueId();
    WebElementHandler.getInputFieldFor(SCHEDULE_INTERVIEW_FIELDS_NAMES.INTERVIEW_TITLE).type("Interview"+unique);
    commonHelper.selectFutureDate().then((date) => {
      WebElementHandler.getInputFieldFor(SCHEDULE_INTERVIEW_FIELDS_NAMES.DATE).clear().type(date);
    });
    WebElementHandler.getInputFieldFor(SCHEDULE_INTERVIEW_FIELDS_NAMES.TIME).clear().type("01:00 PM");
    WebElementHandler.getInputFieldFor(SCHEDULE_INTERVIEW_FIELDS_NAMES.INTERVIEWER).type(interviewr);
    commonHelper.waitFor(2000);
    commonHelper.selectDropDownOptionByIndex(0); 
  }

  submitInterviewDetails() {
    WebElementHandler.getSubmitButton().click();
  }
}
export const scheduleInterviewPage = new ScheduleInterviewPage();