import { ICreateEmployeeRequest } from "../apis/payload/add-employee";
import { ICreateEmployeeResponse } from "../apis/response/add-employee";
import { HttpMethod } from "../enums/http";

declare global {
  namespace Cypress {
    interface Chainable {
      createEmployee(url: string, body: ICreateEmployeeRequest, headers?: Record<string, string>): Chainable<Response<ICreateEmployeeResponse>>

    }
  }
}


Cypress.Commands.add('createEmployee',(url: string, body: ICreateEmployeeRequest, headers?: Record<string, string>)=>{
    return cy.request<ICreateEmployeeResponse>({
      method: HttpMethod.POST,
      url,
      body,
      ...(headers && { headers }),
      failOnStatusCode: false,
    })
  }
)