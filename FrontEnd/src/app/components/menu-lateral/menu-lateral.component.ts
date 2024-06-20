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

  url = "http://localhost:8800/imagem/";
  Nome = sessionStorage.getItem('Nome');
  PerfilDeAcesso = sessionStorage.getItem('PerfilDeAcesso');
  Pontos: string | null = sessionStorage.getItem('Pontuacao'); // Tipo string | null

  id = sessionStorage.getItem('idAluno');
  imagem = this.url + this.id;

  submenuOpen: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar se Pontos é null antes de usar
    if (this.Pontos === null) {
      this.Pontos = ''; // Definir um valor padrão ou tratar conforme necessário
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
