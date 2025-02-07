import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment-development";
import {Observable, throwError} from "rxjs";
import {map, catchError} from 'rxjs/operators';

import {GlobalResponse, JobRequest, JobResponse} from "./list-job/model/job-model";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private BASE_URL = `${environment.API_URL}/jobs`;

  constructor(private _http: HttpClient) {
  }

  public allJobs(): Observable<GlobalResponse<JobResponse[]>> {
    return this._http.get<GlobalResponse<JobResponse[]>>(this.BASE_URL);
  }

  public getJobById(id: string): Observable<JobResponse> {
    return this._http.get<GlobalResponse<JobResponse>>(`${this.BASE_URL}/${id}`).pipe(
      map(response => {
        if (!response.data) {
          throw new Error('Job data is missing');
        }
        return response.data;
      }),
      catchError(error => {
        console.error('Error getting job:', error);
        return throwError(() => error); // Proper throwError usage
      })
    );
  }

  public createJob(request: JobRequest): Observable<GlobalResponse<JobResponse>> {
    return this._http.post<GlobalResponse<JobResponse>>(this.BASE_URL, request);
  }

  public updateJob(id: number, request: JobRequest): Observable<GlobalResponse<void>> {
    return this._http.put<GlobalResponse<void>>(`${this.BASE_URL}/${id}`, request);
  }

  public deleteJob(id: number): Observable<GlobalResponse<void>> {
    return this._http.delete<GlobalResponse<void>>(`${this.BASE_URL}/${id}`);
  }

  public enableJob(id: number): Observable<GlobalResponse<void>> {
    return this._http.patch<GlobalResponse<void>>(`${this.BASE_URL}/${id}/enable`, {});
  }

  public disableJob(id: number): Observable<GlobalResponse<void>> {
    return this._http.patch<GlobalResponse<void>>(`${this.BASE_URL}/${id}/disable`, {});
  }

  public archiveJob(id: number): Observable<GlobalResponse<void>> {
    return this._http.patch<GlobalResponse<void>>(`${this.BASE_URL}/${id}/archive`, {});
  }

  public unarchiveJob(id: number): Observable<GlobalResponse<void>> {
    return this._http.patch<GlobalResponse<void>>(`${this.BASE_URL}/${id}/unarchive`, {});
  }

}
