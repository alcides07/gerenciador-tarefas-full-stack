import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa, TarefaOptionalRequest, TarefaRequest } from '../../interfaces/models/tarefa';
import { TarefaFilter } from '../../interfaces/filters/tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private baseApiUrl = environment.baseApiUrl;
  private tarefaApiUrl = `${this.baseApiUrl}/tarefas/`;

  constructor(private http: HttpClient) {}

  getTarefas(filters: TarefaFilter): Observable<Tarefa[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params = params.append(key, value.toString());
      }
    });

    return this.http.get<Tarefa[]>(this.tarefaApiUrl, { params });
  }

  createTarefa(data: TarefaRequest): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.tarefaApiUrl, data);
  }

  updateTarefa(data: TarefaOptionalRequest): Observable<Tarefa> {
    return this.http.patch<Tarefa>(this.tarefaApiUrl, data);
  }

  completeTarefa(id: number): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.tarefaApiUrl}${id}/`, { situacao: 'CONCLUIDA' });
  }

  deleteTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.tarefaApiUrl}${id}/`);
  }
}
