import { ICreateVacancyRequest } from "../apis/payload/add-vacancy";
import { IDeleteVacancyRequest } from "../apis/payload/delete-vacancy";
import { ICreateVacancyResponse } from "../apis/response/add-vacancy";
import { IDeleteVacancyResponse } from "../apis/response/delete-vacancy";
import { HTTP_METHOD } from "../enums/http";

declare global {
  namespace Cypress {
    interface Chainable {
      prepareVacancy(url: string, body: ICreateVacancyRequest,  headers?: Record<string, string>): Chainable<Response<ICreateVacancyResponse>>;
      deleteVacancy(url: string, body: IDeleteVacancyRequest, headers?: Record<string, string>): Chainable<Response<IDeleteVacancyResponse>>;
    }

  }
}

Cypress.Commands.add('prepareVacancy', (url: string, body: ICreateVacancyRequest, headers?: Record<string, string>) => {
     return cy.request<ICreateVacancyResponse>({
         method: HTTP_METHOD.POST,
         url,
         body,
         ...(headers && { headers }),
         failOnStatusCode: false,
       })
});

Cypress.Commands.add('deleteVacancy',(url: string, body: IDeleteVacancyRequest, headers?: Record<string, string>)=>{
    return cy.request<IDeleteVacancyResponse>({
      method: HTTP_METHOD.DELETE,
      url,
      body,
      ...(headers && { headers }),
      failOnStatusCode: false,
    })
  }
)