import { UserRoles } from "../../enums/add-user-data-enums";
import { WebElementHandler } from "../../helpers/web-element-handler";

const LOCATORS = {
}

class AddUserPage{
    clickOnAddButton(){
        WebElementHandler.addButton().click();
    }
    
    clickOnDropDownList(listName : string){
        WebElementHandler.dropDownList(listName).click();
    }
    selectDropDownOption(option : any){
        WebElementHandler.dropDownOptions().contains(option).click();
    }

     selectDropDownOptionByIndex(index : number){
        WebElementHandler.dropDownOptions().eq(index).click();
    }

    typeEmployeeName(employeeName: string){
        WebElementHandler.inputFieldFor('Employee Name').type(employeeName);
    }

    typeUsername(username : string){
        WebElementHandler.inputFieldFor('Username').type(username);
    }

    typePassword(password : string){
        WebElementHandler.inputFieldFor('Password').type(password);
    }

    typeConfirmPassword(confirmPassword : string){
        WebElementHandler.inputFieldFor('Confirm Password').type(confirmPassword);
    }

    clickOnSaveBtn(){
        WebElementHandler.saveButton().click();
    }
}
export const addUserPage = new AddUserPage();