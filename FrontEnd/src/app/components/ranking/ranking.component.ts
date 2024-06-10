import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { faRankingStar, faTrophy} from '@fortawesome/free-solid-svg-icons';

interface Aluno {
  idAluno: number; // Adicionamos o campo para o ID real do aluno
  Nome: string;
  Pontuacao: number;
  position: number; // Inclui a posição do aluno no ranking
}

interface RankingItem {
  position: number;
  name: string;
  points: number;
  photo: string; // Adiciona o campo para a foto do aluno
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTopRanking().subscribe(data => {
      this.rankingItems = data;
    });
  }

  getTopRanking(): Observable<RankingItem[]> {
    const apiUrl = 'http://localhost:8800/ranking'; // URL correta da API
    return this.http.get<Aluno[]>(apiUrl).pipe(
      map(alunos => {
        console.log(alunos); // Verifique os dados recebidos no console
        return alunos.map(aluno => ({
          position: aluno.position,
          name: aluno.Nome,
          points: aluno.Pontuacao,
          photo: `http://localhost:8800/imagem/${aluno.idAluno}` // URL da foto do aluno usando o ID real
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
