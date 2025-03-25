export interface IFilterFormCase {
  title?: string;
  case_id?: string;
  department?: string;
  type?: string;
  description?: string;
  last_update_date?: string;
}

export interface IParamsPagination {
    pageSize: number
    page: number
}

export interface ICaseResponse {
    id: 0
    code: string
    name: string
    departmentName: string
    statusName: string
    actualTime: string
    updatedAt: string
}
export interface IListCaseResponse {
    content: ICaseResponse[]
    totalRecords: number
}
