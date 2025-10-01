const LOCATORS = {
    ADD_BTN: '.oxd-button--secondary[type="button"]',
    FIELD_GROUP: '.oxd-input-group',
    DROP_DOWN_LIST: '.oxd-select-text',
    DROP_DOWN_OPTIONS: '[role="option"]',
    SAVE_BTN: '.oxd-button--secondary[type="submit"]'
}

export class WebElementHandler {
    static addButton() {
        return cy.get(LOCATORS.ADD_BTN);
    }

    static dropDownList(listName : string) {
        return cy.contains(LOCATORS.FIELD_GROUP,listName).find(LOCATORS.DROP_DOWN_LIST);
    }

    static dropDownOptions() {
        return cy.get(LOCATORS.DROP_DOWN_OPTIONS);
    }

    static inputFieldFor(inputFieldLabelName : string){
        return cy.contains(LOCATORS.FIELD_GROUP,inputFieldLabelName).find('input');
    }

    static saveButton(){
        return cy.get(LOCATORS.SAVE_BTN);

    }

}
