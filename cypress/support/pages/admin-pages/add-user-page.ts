import { WebElementHandler } from "../../helpers/web-element-handler";

export class AddUserPage{
    clickOnAddButton(){
        WebElementHandler.getAddButton().click();
    }

    typeEmployeeName(employeeName: string){
        WebElementHandler.getInputFieldFor('Employee Name').type(employeeName);
    }

    typeUsername(username : string){
        WebElementHandler.getInputFieldFor('Username').type(username);
    }

    typePassword(password : string){
        WebElementHandler.getInputFieldFor('Password').type(password);
    }

    typeConfirmPassword(confirmPassword : string){
        WebElementHandler.getInputFieldFor('Confirm Password').type(confirmPassword);
    }

    clickOnSaveBtn(){
        WebElementHandler.getSubmitButton().click();
    }
}
export const addUserPage = new AddUserPage();