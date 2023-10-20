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
      name: this.name,
      email: this.email,
      password: this.password,
      preferences: 0,
      ranking: 0,
      points:0,
      
    };

    this.http.post(url, dados).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response);
        // Faça algo com a resposta do servidor Node.js
      console.log('Dados a serem enviados:', dados);
       this.router.navigate(['/main']);
      },
      (error) => {
        console.error('Erro na solicitação:', error);
        // Trate o erro, se necessário
      }
    );
  }
}
