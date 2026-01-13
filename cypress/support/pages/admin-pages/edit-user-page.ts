import { WebElementHandler } from "../../helpers/web-element-handler";
import { AddUserPage } from "./add-user-page";


class EditUserPage extends AddUserPage{
    selectDropDownOption(): any{
        return WebElementHandler.getDropDownOptions().then(($options) => {
        for (let i = 0; i < $options.length; i++) {
            let option = $options.eq(i);
            if (option.hasClass('--selected') || option.text().includes('-- Select --')) {
                continue;
            } else {
                // Return the chain from click() and then return the text
                return cy.wrap(option).click().then(() => {
                    return option.text();
                });
            }
        }
        return cy.wrap(''); // Return empty if no option found
    });
        
    }
}
export const editUserPage = new EditUserPage();