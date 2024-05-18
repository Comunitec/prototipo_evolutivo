import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/services/ranking.service';
import{faRankingStar} from '@fortawesome/free-solid-svg-icons'

interface RankingItem {
  position: number;
  photo: string;
  name: string;
  points: number;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  faRankingStar = faRankingStar;

  rankingItems: RankingItem[] = [];

  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {
    this.rankingService.getTopRanking().subscribe(data => {
      this.rankingItems = data;
    });
  }
}
