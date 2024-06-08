import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('idAluno'); // Verifica se o token está presente no localStorage
  }

  navigateToCursos(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['/home-logado']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
