const LOCATORS = {
    ADD_BTN: '.oxd-button--secondary[type="button"]',
    FIELD_GROUP: '.oxd-input-group',
    DROP_DOWN_LIST: '.oxd-select-text',
    DROP_DOWN_OPTIONS: '[role="option"]',
    SAVE_BTN: '.oxd-button--secondary[type="submit"]',
    CONFIRM_DELETE_BTN: '.oxd-button--label-danger',
    SUCCESS_TOAST: '.oxd-toast--success',
    TEXT: '.oxd-text',
    NAV_ITEM: '.oxd-topbar-body-nav-tab',
    ERROR_MSG: '.oxd-input-field-error-message',
    FIRST_NAME_FIELD: '.orangehrm-firstname',
    TOP_NAV_TAB: '.oxd-topbar-body-nav-tab',
    TOP_NAV_TAB_LINK: '.oxd-topbar-body-nav-tab-link',
    TABS_ITEM: '.orangehrm-tabs-item',
    NOTE_TEXTAREA:'.oxd-textarea'

}

export class WebElementHandler {
    static getAddButton() {
        return cy.get(LOCATORS.ADD_BTN);
    }

    static getDropDownList(listName : string) {
        return cy.contains(LOCATORS.FIELD_GROUP,listName).find(LOCATORS.DROP_DOWN_LIST);
    }

    static getDropDownOptions() {
        return cy.get(LOCATORS.DROP_DOWN_OPTIONS);
    }

    static getInputFieldFor(inputFieldLabelName : string){
        return cy.contains(LOCATORS.FIELD_GROUP,inputFieldLabelName).find('input');
    }

    static getSubmitButton(){
        return cy.get(LOCATORS.SAVE_BTN);
    }
    
    static getSearchButton(){
        return cy.get(LOCATORS.SAVE_BTN).contains('Search');
    }

    static getConfirmDeleteButton(){
        return cy.get(LOCATORS.CONFIRM_DELETE_BTN).contains(' Yes, Delete ');
    }
    
    static getSuccessToast(){
        return cy.get(LOCATORS.SUCCESS_TOAST);
    }
        
    static getText(){
        return cy.get(LOCATORS.TEXT);
    }

    static getNavTab(tabName: string){
        return cy.contains(LOCATORS.NAV_ITEM, tabName);
    }

    static getErrorFor(inputFieldLabelName : string){
        return cy.contains(LOCATORS.FIELD_GROUP,inputFieldLabelName).find(LOCATORS.ERROR_MSG);
    }

    static getFirstNameErrorMsg(){
        return cy.get(LOCATORS.FIRST_NAME_FIELD).parentsUntil(LOCATORS.FIELD_GROUP).parent().find(LOCATORS.ERROR_MSG);
    }

    static getTopNvTab(navTabName:string){
        return cy.contains(LOCATORS.TOP_NAV_TAB,navTabName);
    } 
    
    static getTopNvTabLink(navTabLinkName:string){
        return cy.contains(LOCATORS.TOP_NAV_TAB_LINK,navTabLinkName);
    }

    static getTabItem(tabItemName:string){
        return cy.contains(LOCATORS.TABS_ITEM,tabItemName);
    }

    static getNoteTextarea(){
        return cy.get(LOCATORS.NOTE_TEXTAREA);
    }
}
