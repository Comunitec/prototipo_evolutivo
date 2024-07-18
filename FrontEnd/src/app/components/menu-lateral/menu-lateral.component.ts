import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faHouse,
  faBookOpen,
  faDoorOpen,
  faUser,
  faChalkboardTeacher,
  faBookOpenReader,
  faThumbsUp,
  faTrophy,
  faChevronRight,
  faChevronDown,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { RankingService } from 'src/app/services/ranking.service';

interface RankingItem {
  id: string | null;
  position: number;
  name: string;
  points: number;
  photo: string;
}

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  faHouse = faHouse;
  faUser = faUser;
  faBookOpen = faBookOpen;
  faTrophy = faTrophy;
  faDoorOpen = faDoorOpen;
  faChalkboardTeacher = faChalkboardTeacher;
  faBookOpenReader = faBookOpenReader;
  faThumbsUp = faThumbsUp;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faUserTie = faUserTie;
  rankingItems: RankingItem[] = [];

  url = "http://localhost:8800/imagem/";
  Nome = sessionStorage.getItem('Nome');
  PerfilDeAcesso = sessionStorage.getItem('PerfilDeAcesso');
  Pontos: number | null = parseInt(sessionStorage.getItem('Pontuacao') || '0', 10); // Corrige para número
  id = sessionStorage.getItem('idAluno');
  imagem = this.url + this.id;

  submenuOpen: boolean = true;

  constructor(private router: Router, private http: HttpClient, private rankingService: RankingService) {}

  ngOnInit() {
    this.carregarPontosAluno();
  }

  carregarPontosAluno() {
    const id = sessionStorage.getItem('idAluno');
    if (id) {
      this.http.get<any>(`http://localhost:8800/getPontosAluno/${id}`).subscribe(
        (data) => {
          this.Pontos = data.pontos; // 'pontos' deve corresponder ao nome do campo no JSON retornado

          // Atualiza o sessionStorage com o novo valor de Pontuacao
          if (this.Pontos !== null && this.Pontos !== undefined) {
            sessionStorage.setItem('Pontuacao', this.Pontos.toString());
          } else {
            console.error('Erro: Pontos não está definido ou é nulo.');
          }
        },
        (error) => {
          console.error('Erro ao carregar pontos do aluno:', error);
          // Trate o erro conforme necessário
        }
      );
    } else {
      console.error('Erro: idAluno não encontrado em sessionStorage.');
    }
  }

  toggleSubmenus() {
    this.submenuOpen = !this.submenuOpen;
  }

  sair() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  getFirstAndLastName(): string {
    if (!this.Nome) return '';

    const names = this.Nome.split(' ');
    if (names.length === 1) return names[0];
    return `${names[0]} ${names[names.length - 1]}`;
  }
}
