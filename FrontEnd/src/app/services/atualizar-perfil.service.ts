import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtualizarPerfilService {

  constructor(private http: HttpClient) {}

  atualizarPerfil(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`/updateAluno/${id}`, userData);
  }
}
