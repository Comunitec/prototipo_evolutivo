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
      { position: 1, photo: 'path/to/photo1.jpg', name: 'João da Silva', points: 100 },
      { position: 2, photo: 'path/to/photo2.jpg', name: 'User 2', points: 90 },
      { position: 3, photo: 'path/to/photo3.jpg', name: 'User 3', points: 80 },
      { position: 4, photo: 'path/to/photo4.jpg', name: 'User 4', points: 70 },
      { position: 5, photo: 'path/to/photo5.jpg', name: 'User 5', points: 60 }
    ];
    return of(data);
  }
}
