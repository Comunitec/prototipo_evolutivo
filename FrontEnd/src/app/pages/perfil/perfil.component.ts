import { Component, OnInit } from '@angular/core';
import { faTrash, faCamera, faFloppyDisk, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlterarSenhaComponent } from 'src/app/components/modal-alterar-senha/modal-alterar-senha.component';
import { AtualizarPerfilService } from 'src/app/services/atualizar-perfil.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  faTrash = faTrash;
  faCamera = faCamera;
  faFloppyDisk = faFloppyDisk;
  faKey = faKey;
  faUser = faUser;

  emblemas: string[] = [];

  url = "http://localhost:8800/imagem/";
  Nome: string | null = sessionStorage.getItem('Nome');
  Pontos: string | null = sessionStorage.getItem('Pontuacao');
  id: string | null = sessionStorage.getItem('idAluno');
  imagem: string = this.id ? this.url + this.id : '';
  Email: string | null = sessionStorage.getItem('Email');
  DataNasc = '';

  constructor(private http: HttpClient, private dialog: MatDialog, private atualizarPerfilService: AtualizarPerfilService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    const dataNasc = sessionStorage.getItem('DataNasc');
    if (dataNasc) {
      // Converter a data para o formato ISO 8601 (yyyy-mm-dd)
      this.DataNasc = new Date(dataNasc).toISOString().substring(0, 10);
    }
  }

  atualizarPerfil() {
    const id = sessionStorage.getItem('idAluno');
    const userData = {
      Nome: this.Nome,
      Email: this.Email,
      DataNasc: this.DataNasc,
    };

    this.http.put<string[]>(`http://localhost:8800/updateAluno/${id}`, userData)
      .subscribe(
        (response) => {
          console.log("Aluno atualizado com sucesso!!!");
          this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', {
            duration: 3000,
          });

          const updatedData = {
            Nome: this.Nome,
            Email: this.Email,
            DataNasc: this.DataNasc,
            idAluno: this.id,
          };

          // Atualize o serviço com os novos valores
          this.atualizarPerfilService.changeAluno(updatedData);

        },
        (error) => {
          console.error('Erro na atualização do aluno.', error);
          this.snackBar.open('Erro ao atualizar o perfil.', 'Fechar', {
            duration: 3000,
          });
        }
      );
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalAlterarSenhaComponent, {
      width: '360px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Senha alterada:', result);
        // Aqui você pode adicionar a lógica para alterar a senha no backend
      } else {
        console.log('Alteração de senha cancelada');
      }
    });
  }
}
