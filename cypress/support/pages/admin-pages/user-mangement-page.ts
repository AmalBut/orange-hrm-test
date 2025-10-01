import { WebElementHandler } from "../../helpers/web-element-handler";

const LOCATORS = {

}

class UserManagementPage{
    clickOnAddButton(){
        WebElementHandler.addButton().click();
    }
    
}
export const userManagementPage = new UserManagementPage();