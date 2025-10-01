const LOCATORS = {
    TABLE: '.oxd-table',
    TABLE_ROWS: '.oxd-table-card',
    TABLE_CELLS: '.oxd-table-cell',
    TABLE_HEADER_CELLS: '.oxd-table-header-cell'
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

}