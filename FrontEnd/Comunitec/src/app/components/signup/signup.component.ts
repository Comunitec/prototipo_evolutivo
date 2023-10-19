import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  

  constructor(private http: HttpClient) { }

  enviarRegistro() {
    const url = 'http://localhost:8080/user'; // Substitua pela URL do seu servidor Node.js

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
      },
      (error) => {
        console.error('Erro na solicitação:', error);
        // Trate o erro, se necessário
      }
    );
  }
}
