import { Component } from '@angular/core';
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
export class MenuLateralComponent {
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
  Pontos = sessionStorage.getItem('Pontuacao');
  id = sessionStorage.getItem('idAluno');
  imagem = this.url+this.id

  submenuOpen: boolean = true;


  // ngOnInit(){
  // fetch(this.url + this.id)
  // .then(data => {
  //   this.imagem = data;
  //     console.log(data);  // Imprimindo a resposta no console

  // })
  // .catch(error => {
  //     console.error('Erro ao fazer a solicitação:', error);
  // });
  // }




  toggleSubmenus() {
    this.submenuOpen = !this.submenuOpen;
  }
}
