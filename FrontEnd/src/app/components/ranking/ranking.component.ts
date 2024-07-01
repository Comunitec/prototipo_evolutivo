import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    this.fetchTopRanking();
  }

  fetchTopRanking(): void {
    const apiUrl = 'http://localhost:8800/ranking';
    this.http.get<Aluno[]>(apiUrl).pipe(
      map(alunos => alunos.filter(aluno => aluno.idAluno !== 23)),
      map(filteredAlunos => {
        return filteredAlunos.map(aluno => ({
          position: aluno.position,
          name: aluno.Nome,
          points: aluno.Pontuacao,
          photo: `http://localhost:8800/imagem/${aluno.idAluno}`
        }));
      })
    ).subscribe(
      data => {
        this.rankingItems = data;
        this.rankingService.updateRanking(data); // Atualiza o serviço de ranking com os dados recebidos
      },
      error => {
        console.error('Erro ao carregar ranking:', error);
        // Lógica para tratamento de erro, se necessário
      }
    );
  }

  getBorderClass(index: number): string {
    if (index === 0) {
      return 'gold-border';
    } else if (index === 1) {
      return 'silver-border';
    } else if (index === 2) {
      return 'bronze-border';
    }
    return '';
  }

  getFirstAndLastName(fullName: string): string {
    const names = fullName.split(' ');
    if (names.length > 1) {
      return `${names[0]} ${names[names.length - 1]}`;
    }
    return fullName;
  }
}
