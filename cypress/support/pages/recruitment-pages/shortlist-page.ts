import { WebElementHandler } from "../../helpers/web-element-handler";

export class ShortlistPage{
    typeShortlistNote(note: string){
        WebElementHandler.getNoteTextarea().type(note);
    }

    clickOnShortlistConfirmButton(){
        WebElementHandler.getSubmitButton().click();
    }
}
export const shortlistPage = new ShortlistPage();