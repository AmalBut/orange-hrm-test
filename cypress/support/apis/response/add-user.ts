import { ICreateEmployeeData } from "./add-employee";

export interface IUserRole {
    id: number;
    name: string;
    displayName: string;
}

export interface ICreateUserData {
    id: number;
    userName: string;
    deleted: boolean;
    status: boolean;
    employee: ICreateEmployeeData;
    userRole: IUserRole;
}

export interface ICreateUserResponse {
    data: ICreateUserData;
    meta: any[];
    rels: any[];
}