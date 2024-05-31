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
    const url = 'http://localhost:8800/login'; // Substitua pela URL do seu servidor Node.js
    const url2 = 'http://localhost:8800/user/';

    const dados = {
      email: this.email,
      password: this.password
    };

    this.http.post(url, dados).subscribe(
      (response: any) => {
        console.log('Resposta do servidor:', response);
        const token = response.token; // Receba o userId da resposta
        const idAluno = response.idAluno; // Receba o userId da resposta
        localStorage.setItem('token', token); // Armazene o token no LocalStorage
        //localStorage.setItem('token', token); // Armazene o token no LocalStorage
        console.log('token:', token);
        this.http.get(url2)

        
        fetch(url2 + idAluno, {headers: {'Authorization': `Bearer ${token}`} })
        .then(response => response.json())  // Convertendo a resposta para JSON
        .then(data => {
            console.log(data);  // Imprimindo a resposta no console
    
            // Extraindo o idAluno
            const idAluno = data.user.idAluno;
            const Nome = data.user.Nome;
            const Email = data.user.Email;
            const Pontuacao = data.user.Pontuacao;
            const PerfilDeAcesso = data.user.PerfilDeAcesso;
            const DataNasc = data.user.DataNasc;

    
            // Colocando dados no sessionStorage
            sessionStorage.setItem('idAluno', idAluno); // Armazene o token no sessionStorage
            sessionStorage.setItem('Nome', Nome); // Armazene o token no sessionStorage
            sessionStorage.setItem('Email', Email); // Armazene o token no sessionStorage
            sessionStorage.setItem('Pontuacao', Pontuacao); // Armazene o token no sessionStorage
            sessionStorage.setItem('PerfilDeAcesso', PerfilDeAcesso); // Armazene o token no sessionStorage
            sessionStorage.setItem('DataNasc', DataNasc); // Armazene o token no sessionStorage
            this.router.navigate(['/home-logado']);
        })
        .catch(error => {
            console.error('Erro ao fazer a solicitação:', error);
        });



      },
      (error) => {
        console.error('Erro na solicitação:', error);
        // Trate o erro, se necessário
      }
    );


  }
}
