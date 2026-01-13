import { WebTableHandler } from "../../helpers/web-table-handler";

const LOCATORS = {
    TABLE_CELLS: ".oxd-table-cell",
};

class MyLeavePage{

 checkLeaveIsAdded(date: string, employeeName: string, leaveType: string, status: string) {
    WebTableHandler.getTableRows()
      .first()
      .within(() => {
        cy.get(LOCATORS.TABLE_CELLS).then(($cells) => {
          cy.wrap($cells[1]).invoke("text").should("eq", date);
          cy.wrap($cells[2]).invoke("text").should("eq", employeeName);
          cy.wrap($cells[3]).invoke("text").should("eq", leaveType);
          cy.wrap($cells[6]).invoke("text").should("include", status);
        });
      });
  }

  checkLeaveIsApproved(status: string){
   WebTableHandler.getTableRows()
      .first()
      .within(() => {
        cy.get(LOCATORS.TABLE_CELLS).then(($cells) => {
          cy.wrap($cells[6]).invoke("text").should("include", status);
        });
    });
  }

  checkLeaveBalance(){
    cy.fixture('leaves').as('leave');
    WebTableHandler.getTableRows()
      .first()
      .within(() => {
        cy.get(LOCATORS.TABLE_CELLS).then(($cells) => {
          cy.wrap($cells[5]).invoke("text").then((numberOfAppliedLeaves)=>{
            cy.get('@leave').then((leave:any)=>{
              cy.log('Number of applied leaves:', Number(numberOfAppliedLeaves))
              cy.log('Number of entitlements:', Number(leave.entitlement))
            let expectedBlanace= Number(leave.newLeave.entitlement)- Number(numberOfAppliedLeaves);
            cy.wrap($cells[4]).invoke("text").then((actualBalance)=>{
              expect(Number(actualBalance)).to.eq(expectedBlanace);
            })

            })
          })
        });
      });
  }
 } 
export const myLeavePage = new MyLeavePage();