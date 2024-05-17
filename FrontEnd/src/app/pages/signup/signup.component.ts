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
  Foto: string = '';

  selectedFile: File | null = null; // Propriedade para armazenar o arquivo selecionado

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.Foto = e.target.result.split(',')[1]; // Obtém a string base64 sem o prefixo
      };
      reader.readAsDataURL(file);
    }
  }

  enviarRegistro() {
    const url = 'http://localhost:8800/addAluno'; // Substitua pela URL do seu servidor Node.js
    
    const formData = {
      Nome: this.Nome,
      Email: this.Email,
      Senha: this.Senha,
      DataNasc: this.DataNasc,
      Pontuacao: this.Pontuacao,
      PerfilDeAcesso: this.PerfilDeAcesso,
      Foto: this.Foto // Inclui a imagem em base64
    };

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
