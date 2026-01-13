export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum HEADER_KEY {
  CONTENT_TYPE = 'content-type',
  ACCEPT = 'Accept',
  X_API_KEY = 'x-api-key',
  AUTHORIZATION = 'Authorization',
  COOKIES = 'Cookies'
}

export enum HEADER_VALUES {
  CONTENT_TYPE = 'application/json',
  ACCEPT = 'application/json',
  X_API_KEY = Cypress.env("apiKey")
}