import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'; // Importe o MatDialog
import { ModalUsuarioCriadoComponent } from 'src/app/components/modal-usuario-criado/modal-usuario-criado.component';
import { ModalErroAoCriarUsuarioComponent } from 'src/app/components/modal-erro-ao-criar-usuario/modal-erro-ao-criar-usuario.component'

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

  constructor(private http: HttpClient, private dialog: MatDialog) { } // Injete o MatDialog no construtor

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  enviarRegistro() {
    const url = 'http://localhost:8800/addAluno';

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
        this.openModal();
      },
      (error) => {
        console.error('Erro na solicitação:', error);
        this.openModalErro();
      }
    );
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalUsuarioCriadoComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openModalErro(): void {
    const dialogRef = this.dialog.open(ModalErroAoCriarUsuarioComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
