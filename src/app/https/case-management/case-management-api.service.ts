import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IFilterFormCase } from './interface.ts'
import { IPaginationParams } from '@vks/app/shared/models'
import { IBaseResponse } from '../base-response.interface'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CaseManagementApiService {
  baseUrl: string = 'http://localhost:5000/cases'
  constructor(private http: HttpClient) { }

  getListCase<T>(filters: IFilterFormCase, params: IPaginationParams): Observable<IBaseResponse<T>> {
    let httpParams = new HttpParams();

    if (params) {
      httpParams = httpParams.set('page', params.page.toString()).set('pageSize', params.pageSize.toString());
    }

    Object.keys(filters).forEach((key) => {
      const filterKey = key as keyof IFilterFormCase;
      if (filters[filterKey] !== undefined && filters[filterKey] !== null) {
        httpParams = httpParams.set(filterKey, filters[filterKey] as any);
      }
    });

    return this.http.get<IBaseResponse<T>>(this.baseUrl, { params: httpParams });
  }

  getCaseById<T>(id: string): Observable<IBaseResponse<T>> {
    return this.http.get<IBaseResponse<T>>(`${this.baseUrl}/${id}`);
  }

  createCase<T>(data: IFilterFormCase): Observable<IBaseResponse<T>> {
    return this.http.post<IBaseResponse<T>>(this.baseUrl, data);
  }

  updateCase<T>(id: string, data: Partial<IFilterFormCase>): Observable<IBaseResponse<T>> {
    return this.http.put<IBaseResponse<T>>(`${this.baseUrl}/${id}`, data);
  }

  deleteCase<T>(id: string): Observable<IBaseResponse<T>> {
    return this.http.delete<IBaseResponse<T>>(`${this.baseUrl}/${id}`);
  }
}
