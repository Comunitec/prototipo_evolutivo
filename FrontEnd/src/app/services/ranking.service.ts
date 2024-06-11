import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface RankingItem {
  position: number;
  name: string;
  points: number;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private rankingSource = new BehaviorSubject<RankingItem[]>([]);
  currentRanking = this.rankingSource.asObservable();

  constructor() {}

  updateRanking(ranking: RankingItem[]) {
    this.rankingSource.next(ranking);
  }

  getRanking(): Observable<RankingItem[]> {
    return this.currentRanking;
  }
}
