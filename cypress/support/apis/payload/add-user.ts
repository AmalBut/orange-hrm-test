export interface ICreateUserRequest{
    username: string;
    password: string;
    status: boolean;
    userRoleId: number;
    empNumber: number;
}