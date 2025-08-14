import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { RegisterRequest, RegisterResponse } from '../../interfaces/auth/register';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private baseApiUrl = environment.baseApiUrl;
  private registroApiUrl = `${this.baseApiUrl}/auth/register/`;

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.registroApiUrl, data);
  }
}
