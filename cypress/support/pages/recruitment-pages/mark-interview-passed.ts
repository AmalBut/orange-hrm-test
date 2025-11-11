import { WebElementHandler } from "../../helpers/web-element-handler";

export class MarkInterviewPassedPage{
    typeInterviewPassedNote(note: string){
        WebElementHandler.getNoteTextarea().type(note);
    }

    clickOnInterviewPassedConfirmButton(){
        WebElementHandler.getSubmitButton().click();
    }
}
export const markInterviewPassedPage = new MarkInterviewPassedPage();