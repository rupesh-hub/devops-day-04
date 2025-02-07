import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment-development";
import {BehaviorSubject, Observable, tap, throwError} from "rxjs";
import {map, catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthenticationResponse, GlobalResponse, RegistrationRequest, UserResponse} from "./model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private BASE_URL = `${environment.API_URL}/authentication`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.isAuthenticatedSubject.next(!!localStorage.getItem('access_token'));
  }


  login(username: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<GlobalResponse<AuthenticationResponse>>(`${this.BASE_URL}/sign-in`, {
      email: username,
      password
    }).pipe(
      map(response => {
        if (!response || !response.data) {
          throw new Error('Invalid authentication response');
        }

        const data = response.data;
        localStorage.setItem('access_token', data.access_token || '');
        localStorage.setItem('name', data.name || '');
        localStorage.setItem('profile', data.profile || '');
        localStorage.setItem('email', data.email || '');
        this.isAuthenticatedSubject.next(true);

        return data;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  public register(registrationRequest: RegistrationRequest): Observable<UserResponse | HttpErrorResponse> {
    return this.http.post<UserResponse>(`${this.BASE_URL}/sign-up`, registrationRequest);
  }

  public isAuthenticated = (): boolean => {
    const accessToken = localStorage.getItem('access_token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    return !!(accessToken && name && email);
  }

  public getToken = (): string | null => {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    localStorage.removeItem('profile');
    localStorage.removeItem('email');
    this.isAuthenticatedSubject.next(false);
  }
}
