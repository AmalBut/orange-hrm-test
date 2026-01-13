import { ICreateVacancyRequest } from "../apis/payload/add-vacancy";
import { IDeleteVacancyRequest } from "../apis/payload/delete-vacancy";
import { CREATE_VACANCY_DATA } from "../enums/add-vacancy-data-enum";
import { HEADER_KEY, HEADER_VALUES } from "../enums/http";
import { commonHelper } from "./common-helpers";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
  vacancyCrudUrl: `${baseUrl}/api/v2/recruitment/vacancies`
}

const headers: Record<string, string> = {
  [HEADER_KEY.X_API_KEY]: String(HEADER_VALUES.X_API_KEY),
  [HEADER_KEY.CONTENT_TYPE]: String(HEADER_VALUES.CONTENT_TYPE)
}

export class VacancyHelper {

  static prepareVacancy(body ?: ICreateVacancyRequest, empNumber?: number) {
        const payload: ICreateVacancyRequest = body ?? {
          name: CREATE_VACANCY_DATA.NAME + commonHelper.getUniqueId(),
          jobTitleId: Number(CREATE_VACANCY_DATA.JOB_TITLE_ID),
          employeeId: Number(empNumber),
          numOfPositions: Number(CREATE_VACANCY_DATA.NUMBER_OF_POSITIONS),
          description: String(CREATE_VACANCY_DATA.DESCRIPTION),
          status: CREATE_VACANCY_DATA.STATUS === 1 ? true : false,
          isPublished: CREATE_VACANCY_DATA.IS_PUBLISHED === 1 ? true : false
        }
        return cy.prepareVacancy(URLs.vacancyCrudUrl, payload, headers);
  }

  static deleteVacancy(vacancyId: number) {
    const payload: IDeleteVacancyRequest = {
        ids: [vacancyId]
    }
    return cy.deleteVacancy(URLs.vacancyCrudUrl, payload, headers);
  }
}