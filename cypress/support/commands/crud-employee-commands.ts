import { ICreateEmployeeRequest } from "../apis/payload/add-employee";
import { IDeleteEmployeeRequest } from "../apis/payload/delete-employee";
import { ICreateEmployeeResponse } from "../apis/response/add-employee";
import { IDeleteEmployeeResponse } from "../apis/response/delete-employee";
import { HttpMethod } from "../enums/http";

declare global {
  namespace Cypress {
    interface Chainable {
      createEmployee(url: string, body: ICreateEmployeeRequest, headers?: Record<string, string>): Chainable<Response<ICreateEmployeeResponse>>
      deleteEmployee(url: string, body: IDeleteEmployeeRequest, headers?: Record<string, string>): Chainable<Response<IDeleteEmployeeResponse>>
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

Cypress.Commands.add('deleteEmployee',(url: string, body: IDeleteEmployeeRequest, headers?: Record<string, string>)=>{
    return cy.request<IDeleteEmployeeResponse>({
      method: HttpMethod.DELETE,
      url,
      body,
      ...(headers && { headers }),
      failOnStatusCode: false,
    })
  }
)