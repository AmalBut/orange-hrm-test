import { ICreateEmployeeRequest } from "../apis/payload/add-employee";
import { IDeleteEmployeeRequest } from "../apis/payload/delete-employee";
import { CREATE_EMPLOYEE } from "../enums/add-employee-data-enum";
import { HEADER_KEY, HEADER_VALUES } from "../enums/http";
import { commonHelper } from "./common-helpers";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
    employeeCrudUrl: `${baseUrl}/api/v2/pim/employees`
}

const headers: Record<string, string> = {
  [HEADER_KEY.X_API_KEY]: String(HEADER_VALUES.X_API_KEY),
  [HEADER_KEY.CONTENT_TYPE]: String(HEADER_VALUES.CONTENT_TYPE)
}

export class EmployeeHelper{
    static createEmployee(body ?: ICreateEmployeeRequest){
        const payload: ICreateEmployeeRequest = body ??{
            firstName: CREATE_EMPLOYEE.FIRST_NAME,
            middleName: CREATE_EMPLOYEE.MIDDLE_NAME,
            lastName: CREATE_EMPLOYEE.LAST_NAME,
            employeeId: commonHelper.getUniqueId()
        }
        return cy.createEmployee(URLs.employeeCrudUrl, payload);
    }

    static deleteEmployee(userId: number){
          const payload: IDeleteEmployeeRequest = {
            ids: [userId]
          }
          return cy.deleteEmployee(URLs.employeeCrudUrl, payload, headers);
        }
}