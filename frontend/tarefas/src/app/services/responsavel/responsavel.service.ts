import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Responsavel, ResponsavelRequest } from '../../interfaces/models/responsavel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsavelService {
  private baseApiUrl = environment.baseApiUrl;
  private responsavelApiUrl = `${this.baseApiUrl}/responsaveis/`;

  constructor(private http: HttpClient) {}

  getResponsaveis(): Observable<Responsavel[]> {
    return this.http.get<Responsavel[]>(this.responsavelApiUrl);
  }

  createResponsavel(data: ResponsavelRequest): Observable<Responsavel> {
    return this.http.post<Responsavel>(this.responsavelApiUrl, data);
  }
}
