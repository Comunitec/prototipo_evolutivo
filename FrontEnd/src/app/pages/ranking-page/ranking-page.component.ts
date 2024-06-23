import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent implements OnInit {
  faTrophy = faTrophy;

  rankingItems: RankingItem[] = [];
  podeVerMenuLateral: boolean = false;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('idAluno');
  }

  carregarMenuLateral(){
    if (this.isLoggedIn()) {
      this.podeVerMenuLateral = true;
    }
  }

  ngOnInit(): void {
    this.carregarMenuLateral();
    const apiUrl = 'http://localhost:8800/ranking'; // URL correta da API
    this.http.get<Aluno[]>(apiUrl).pipe(
      map(alunos => {
        // Filtrando os alunos com idAluno diferente de 23
        const filteredAlunos = alunos.filter(aluno => aluno.idAluno !== 23);
        return filteredAlunos.map(aluno => ({
          position: aluno.position,
          name: aluno.Nome,
          points: aluno.Pontuacao,
          photo: `http://localhost:8800/imagem/${aluno.idAluno}` // URL da foto do aluno usando o ID real
        }));
      })
    ).subscribe(data => {
      this.rankingItems = data;
    });
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
}
