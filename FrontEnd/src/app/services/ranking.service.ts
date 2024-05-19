import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface RankingItem {
  position: number;
  photo: string;
  name: string;
  points: number;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  constructor(private http: HttpClient) {}

  getTopRanking(): Observable<RankingItem[]> {
    // Simulação de dados, substituir pela lógica de chamada ao backend
    const data: RankingItem[] = [
      { position: 1, photo: 'https://via.placeholder.com/50', name: 'João da Silva', points: 100 },
      { position: 2, photo: 'https://via.placeholder.com/50', name: 'Maria Oliveira', points: 90 },
      { position: 3, photo: 'https://via.placeholder.com/50', name: 'Pedro Nascimento', points: 80 },
      { position: 4, photo: 'https://via.placeholder.com/50', name: 'Mariana Ferreira', points: 70 },
      { position: 5, photo: 'https://via.placeholder.com/50', name: 'Ana Gonçalves', points: 60 },
      { position: 6, photo: 'https://via.placeholder.com/50', name: 'José Silveira', points: 60 },
    ];
    return of(data);
  }
}
