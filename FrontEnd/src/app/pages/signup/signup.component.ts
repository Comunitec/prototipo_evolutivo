import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  Nome: string = '';
  Email: string = '';
  Senha: string = '';
  DataNasc: string = '';
  Pontuacao: number = 0;
  PerfilDeAcesso: string = "Aluno";
  selectedFile: File | null = null; // Propriedade para armazenar o arquivo selecionado

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  enviarRegistro() {
    const url = 'http://localhost:8800/addAluno'; // Substitua pela URL do seu servidor Node.js

    const formData = new FormData();
    formData.append('Nome', this.Nome);
    formData.append('Email', this.Email);
    formData.append('Senha', this.Senha);
    formData.append('DataNasc', this.DataNasc);
    formData.append('Pontuacao', this.Pontuacao.toString());
    formData.append('PerfilDeAcesso', this.PerfilDeAcesso);
    if (this.selectedFile) {
      formData.append('Foto', this.selectedFile, this.selectedFile.name);
    }

    this.http.post(url, formData).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response);
        // Faça algo com a resposta do servidor Node.js
      },
      (error) => {
        console.error('Erro na solicitação:', error);
        // Trate o erro, se necessário
      }
    );
  }
}
