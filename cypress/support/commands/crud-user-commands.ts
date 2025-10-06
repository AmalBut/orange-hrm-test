import { ICreateUserRequest } from "../apis/payload/add-user";
import { IDeleteUserRequest } from "../apis/payload/delete-user";
import { ICreateUserResponse } from "../apis/response/add-user";
import { IDeleteUserResponse } from "../apis/response/delete-user";
import { HttpMethod } from "../enums/http";

declare global {
  namespace Cypress {
    interface Chainable {
      createUser(url: string, body: ICreateUserRequest, headers?: Record<string, string>): Chainable<Response<ICreateUserResponse>>
      deleteUser(url: string, body: IDeleteUserRequest, headers?: Record<string, string>): Chainable<Response<IDeleteUserResponse>>

    }
  }
}

Cypress.Commands.add('createUser',(url: string, body: ICreateUserRequest, headers?: Record<string, string>)=>{
    return cy.request<ICreateUserResponse>({
      method: HttpMethod.POST,
      url,
      body,
      ...(headers && { headers }),
      failOnStatusCode: false,
    })
});

Cypress.Commands.add('deleteUser',(url: string, body: IDeleteUserRequest, headers?: Record<string, string>)=>{
    return cy.request<IDeleteUserResponse>({
      method: HttpMethod.DELETE,
      url,
      body,
      ...(headers && { headers }),
      failOnStatusCode: false,
    })
  }
)