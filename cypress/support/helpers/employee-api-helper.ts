import { ICreateEmployeeRequest } from "../apis/payload/add-employee";
import { CreateEmployee } from "../enums/add-employee-data-enum";
import { HeaderKey, HeaderValues } from "../enums/http";
import { commonHelper } from "./common-helpers";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
    createEmployee: `${baseUrl}/api/v2/pim/employees`
}

const headers: Record<string, string> = {
  [HeaderKey.X_API_KEY]: String(HeaderValues.X_API_KEY),
  [HeaderKey.CONTENT_TYPE]: String(HeaderValues.CONTENT_TYPE)
}

export class EmployeeHelper{
    static createEmployee(body ?: ICreateEmployeeRequest){
        const payload: ICreateEmployeeRequest = body ??{
            firstName: CreateEmployee.FIRST_NAME,
            middleName: CreateEmployee.MIDDLE_NAME,
            lastName: CreateEmployee.LAST_NAME,
            employeeId: commonHelper.getUniqueEmployeeId()
        }
        return cy.createEmployee(URLs.createEmployee, payload);
    }
}