import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  enviarRegistro() {
    // Verifica se o email e a senha foram preenchidos
    if (!this.email || !this.password) {
      let message = 'Por favor, informe seu e-mail e senha para fazer login.';
      if (!this.email) {
        message = 'Informe seu e-mail para fazer login.';
      } else if (!this.password) {
        message = 'Informe sua senha para fazer login.';
      }
      this.exibirSnackBar(message);
      return; // Interrompe a execução se algum campo estiver vazio
    }

    const url = 'http://localhost:8800/login';
    const url2 = 'http://localhost:8800/user/';

    const dados = {
      email: this.email,
      password: this.password
    };

    this.http.post(url, dados).subscribe(
      (response: any) => {
        console.log('Resposta do servidor:', response);
        const token = response.token; // Receba o token da resposta
        const idAluno = response.idAluno; // Receba o userId da resposta
        localStorage.setItem('token', token); // Armazene o token no LocalStorage
        console.log('token:', token);

        fetch(url2 + idAluno, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(response => response.json())
          .then(data => {
            console.log(data);

            // Coloca os dados no sessionStorage
            sessionStorage.setItem('idAluno', data.user.idAluno);
            sessionStorage.setItem('Nome', data.user.Nome);
            sessionStorage.setItem('Email', data.user.Email);
            sessionStorage.setItem('Pontuacao', data.user.Pontuacao);
            sessionStorage.setItem('PerfilDeAcesso', data.user.PerfilDeAcesso);
            sessionStorage.setItem('DataNasc', data.user.DataNasc);

            this.router.navigate(['/home-logado']);
          })
          .catch(error => {
            console.error('Erro ao fazer a solicitação:', error);
          });

      },
      (error) => {
        console.error('Erro na solicitação:', error);
        let message = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
        if (error.status === 401) {
          message = 'E-mail ou senha incorretos. Tente novamente.';
        }
        this.exibirSnackBar(message);
      }
    );
  }

  exibirSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
