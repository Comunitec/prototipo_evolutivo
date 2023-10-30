import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  enviarRegistro() {
    const url = 'http://localhost:8080/user/login'; // Substitua pela URL do seu servidor Node.js

    const dados = {
      email: this.email,
      password: this.password
    };

    this.http.post(url, dados).subscribe(
      (response: any) => {
        console.log('Resposta do servidor:', response);
        const userId = response.userId; // Receba o userId da resposta
        localStorage.setItem('userId', userId); // Armazene o userId no LocalStorage
        console.log('UserId:', userId);
        this.router.navigate(['/menu-logado']);
      },
      (error) => {
        console.error('Erro na solicitação:', error);
        // Trate o erro, se necessário
      }
    );
  }
}
