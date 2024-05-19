import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  rankingItems: RankingItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const apiUrl = 'http://localhost:8800/ranking'; // URL correta da API
    this.http.get<Aluno[]>(apiUrl).pipe(
      map(alunos => {
        return alunos.map(aluno => ({
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
}
