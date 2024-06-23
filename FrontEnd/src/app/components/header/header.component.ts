import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { faRightToBracket, faHouse, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faRightToBracket = faRightToBracket;
  faHouse = faHouse;
  faCircleQuestion = faCircleQuestion;

  constructor(private router: Router, private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('idAluno'); // Verifica se o token está presente no sessionStorage
  }

  navigateToCursos(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/home-logado']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
