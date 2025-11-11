const LOCATORS = {
    TABLE: '.oxd-table',
    TABLE_ROWS: '.oxd-table-card',
    TABLE_CELLS: '.oxd-table-cell',
    TABLE_HEADER_CELLS: '.oxd-table-header-cell',
    EDIT_BTN: 'button.oxd-table-cell-action-space .bi-pencil-fill',
    DELETE_BTN: 'button.oxd-table-cell-action-space .bi-trash',
    VIEW_BTN: 'button.oxd-table-cell-action-space .bi-eye-fill',
    DOWNLOAD_BTN: 'button.oxd-table-cell-action-space .bi-download',
}

export class WebTableHandler {
    static getTable() {
        return cy.get(LOCATORS.TABLE);
    }

    static getTableRows() {
        return cy.get(LOCATORS.TABLE_ROWS);
    }

    static getTableCells() {
        return cy.get(LOCATORS.TABLE_CELLS);
    }

    static getEditButtonForRow(row: HTMLElement) {
        return cy.wrap(row).find(LOCATORS.EDIT_BTN);
    }

    static getDeleteButtonForRow(row: HTMLElement) {
        return cy.wrap(row).find(LOCATORS.DELETE_BTN);
    }

    static getViewButtonForRow(row: HTMLElement) {
        return cy.wrap(row).find(LOCATORS.VIEW_BTN);
    } 
    
    static getDownloadButtonForRow(row: HTMLElement) {
        return cy.wrap(row).find(LOCATORS.VIEW_BTN);
    }
}