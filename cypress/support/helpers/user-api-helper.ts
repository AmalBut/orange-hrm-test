import { ICreateUserRequest } from "../apis/payload/add-user";
import { IDeleteUserRequest } from "../apis/payload/delete-user";
import { CREATE_ADMIN_USER } from "../enums/add-user-data-enums";
import { HEADER_KEY, HEADER_VALUES } from "../enums/http";
import { commonHelper } from "./common-helpers";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
    userCrudUrl: `${baseUrl}/api/v2/admin/users`
}

const headers: Record<string, string> = {
  [HEADER_KEY.X_API_KEY]: String(HEADER_VALUES.X_API_KEY),
  [HEADER_KEY.CONTENT_TYPE]: String(HEADER_VALUES.CONTENT_TYPE)
}

export class UserHelper{
    static createUser(body ?: ICreateUserRequest, empNumber?: number){
      const payload: ICreateUserRequest = body ?? {
        username: CREATE_ADMIN_USER.USERNAME + commonHelper.getUniqueId(),
        password: String(CREATE_ADMIN_USER.PASSWORD),
        status: CREATE_ADMIN_USER.STATUS === 1 ? true : false,
        userRoleId: Number(CREATE_ADMIN_USER.USER_ROLE_ID),
        empNumber: Number(empNumber)
      }

      return cy.createUser(URLs.userCrudUrl, payload, headers);
    }

    static deleteUser(userId: number){
      const payload: IDeleteUserRequest = {
        ids: [userId]
      }
      return cy.deleteUser(URLs.userCrudUrl, payload, headers);
    }
}
