import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/services/ranking.service';

interface RankingItem {
  position: number;
  photo: string;
  name: string;
  points: number;
}

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent implements OnInit {
  rankingItems: RankingItem[] = [];

  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {
    this.rankingService.getTopRanking().subscribe(data => {
      this.rankingItems = data;
    });
  }

}
