import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IFilterFormCase } from '@vks/app/https/case-management/interface.ts'
import { IPaginationParams } from '@vks/app/shared/models'
import { IBaseResponse } from "@vks/app/https/base-response.interface"
import { Observable } from 'rxjs'
import { ICase } from './case-management.interface'

@Injectable({
  providedIn: 'root',
})
export class CaseManagementHttpService {
  baseUrl: string = 'http://localhost:5000/cases'
  constructor(private http: HttpClient) { }

  getListCase() {
    const data = this.http.get<ICase[]>(this.baseUrl);

    return data;
  }

  getCaseFiltered(query: IFilterFormCase) {
    console.log('query', query);

    let httpParams = new HttpParams();

    Object.keys(query).forEach((key) => {
      const value = query[key as keyof IFilterFormCase];
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value);
      }
    });

    return this.http.get<ICase[]>(this.baseUrl, { params: httpParams });
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
