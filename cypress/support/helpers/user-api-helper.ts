import { ICreateUserRequest } from "../apis/payload/add-user";
import { IDeleteUserRequest } from "../apis/payload/delete-user";
import { CreateUser } from "../enums/add-user-data-enums";
import { HeaderKey, HeaderValues } from "../enums/http";
import { commonHelper } from "./common-helpers";

const baseUrl = Cypress.config().baseUrl;

const URLs = {
    userCrudUrl: `${baseUrl}/api/v2/admin/users`
}

const headers: Record<string, string> = {
  [HeaderKey.X_API_KEY]: String(HeaderValues.X_API_KEY),
  [HeaderKey.CONTENT_TYPE]: String(HeaderValues.CONTENT_TYPE)
}

export class UserHelper{
    static createUser(empNumber: number){
      const payload: ICreateUserRequest = {
        username: CreateUser.USERNAME + commonHelper.getUniqueId(),
        password: String(CreateUser.PASSWORD),
        status: CreateUser.STATUS === 1 ? true : false,
        userRoleId: Number(CreateUser.USER_ROLE_ID),
        empNumber: empNumber
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
