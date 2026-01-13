export interface ICreateVacancyResponse {
  data: ICreateVacancyData;
  meta: any[];
  rels: any[];
}

export interface ICreateVacancyData {
  id: number;
  name: string;
  description: string;
  numOfPositions: number;
  status: boolean;
  isPublished: boolean;
  jobTitle: IJobTitle;
  hiringManager: IHiringManager;
}

export interface IHiringManager {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  terminationId: number | null;
}

export interface IJobTitle {
  id: number;
  title: string;
  isDeleted: boolean;
}