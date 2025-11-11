import { WebTableHandler } from "../../helpers/web-table-handler";
import { leavePage } from "./leave-page";

const LOCATORS = {
    TABLE_CELLS: ".oxd-table-cell",
    ACTION_BTN: '.oxd-table-cell-action-space'
};

class LeaveListPage{

approveLeave(date: string, employeeName: string, leaveType: string) {
        leavePage.searchForLeave(date, leaveType, employeeName); 
        WebTableHandler.getTableRows()
          .first()
          .within(() => {
            cy.contains(LOCATORS.ACTION_BTN, 'Approve').click();
          });
      }
 } 
export const leaveListPage = new LeaveListPage();