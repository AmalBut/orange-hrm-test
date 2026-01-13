export interface ICreateEmployeeData {
    empNumber: number;
    firstName: string;
    middleName: string;
    lastName: string;
    employeeId: string;
    terminationId: string | null;
}

export interface ICreateEmployeeResponse {
    data: ICreateEmployeeData;
    meta: any[];
    rels: any[];
}