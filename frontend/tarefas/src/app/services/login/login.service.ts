import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { RegisterRequest, RegisterResponse } from '../../interfaces/auth/register';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../interfaces/auth/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseApiUrl = environment.baseApiUrl;
  private loginApiUrl = `${this.baseApiUrl}/auth/login/`;

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginApiUrl, data);
  }
}
