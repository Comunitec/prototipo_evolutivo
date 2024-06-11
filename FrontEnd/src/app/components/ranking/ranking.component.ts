import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { faRankingStar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { RankingService } from 'src/app/services/ranking.service';

interface Aluno {
  idAluno: number;
  Nome: string;
  Pontuacao: number;
  position: number;
}

interface RankingItem {
  position: number;
  name: string;
  points: number;
  photo: string;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  faRankingStar = faRankingStar;
  faTrophy = faTrophy;
  rankingItems: RankingItem[] = [];

  constructor(private http: HttpClient, private rankingService: RankingService) {}

  ngOnInit(): void {
    this.getTopRanking().subscribe(data => {
      this.rankingService.updateRanking(data);
    });

    this.rankingService.getRanking().subscribe(data => {
      this.rankingItems = data;
    });
  }

  getTopRanking(): Observable<RankingItem[]> {
    const apiUrl = 'http://localhost:8800/ranking';
    return this.http.get<Aluno[]>(apiUrl).pipe(
      map(alunos => {
        console.log(alunos);
        return alunos.map(aluno => ({
          position: aluno.position,
          name: aluno.Nome,
          points: aluno.Pontuacao,
          photo: `http://localhost:8800/imagem/${aluno.idAluno}`
        }));
      })
    );
  }

  getBorderClass(index: number): string {
    if (index === 0) {
      return 'primeiro';
    } else if (index === 1) {
      return 'segundo';
    } else if (index === 2) {
      return 'terceiro';
    } else {
      return '';
    }
  }
}
