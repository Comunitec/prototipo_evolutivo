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
import { AtualizarPerfilService } from 'src/app/services/atualizar-perfil.service';

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
  Pontos = sessionStorage.getItem('Pontuacao');
  id = sessionStorage.getItem('idAluno');
  imagem = this.url + this.id;

  submenuOpen: boolean = true;

  constructor(private router: Router, private atualizarPerfilService: AtualizarPerfilService) {}

  ngOnInit() {
    this.atualizarPerfilService.currentAluno.subscribe(aluno => {
      this.Nome = aluno.Nome;
      this.Pontos = aluno.Pontuacao;
      this.id = aluno.idAluno;
      this.imagem = this.url + this.id;
    });
  }

  toggleSubmenus() {
    this.submenuOpen = !this.submenuOpen;
  }

  sair() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
