import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { faTrash, faCamera, faFloppyDisk, faKey, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlterarSenhaComponent } from 'src/app/components/modal-alterar-senha/modal-alterar-senha.component';

interface Usuario {
  idAluno: number;
  Nome: string;
  Email: string;
  DataNasc: string;
  photoUrl?: string;
  Pontuacao: number;
}

@Component({
  selector: 'app-modal-editar-usuario',
  templateUrl: './modal-editar-usuario.component.html',
  styleUrls: ['./modal-editar-usuario.component.css']
})
export class ModalEditarUsuarioComponent implements OnInit {
  faTrash = faTrash;
  faCamera = faCamera;
  faFloppyDisk = faFloppyDisk;
  faKey = faKey;
  faUser = faUser;
  faXmark = faXmark;

  usuario: Usuario;

  constructor(
    private dialogRef: MatDialogRef<ModalEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { usuario: Usuario },
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.usuario = { ...data.usuario };
  }

  ngOnInit() {
    // Inicializa os dados do usuário no modal
    const dataNasc = sessionStorage.getItem('DataNasc');
    if (dataNasc) {
      this.usuario.DataNasc = new Date(dataNasc).toISOString().substring(0, 10);
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalAlterarSenhaComponent, {
      width: '360px',
      data: { idAluno: this.usuario.idAluno }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Senha alterada:', result);
        // Lógica para alterar a senha no backend, se necessário
      } else {
        console.log('Alteração de senha cancelada');
      }
    });
  }

  salvarAlteracoes(): void {
    const url = `http://localhost:8800/updateAluno/${this.usuario.idAluno}`; // Rota para atualizar o aluno

    this.http.put(url, this.usuario).subscribe(
      response => {
        console.log('Usuário atualizado com sucesso:', response);
        this.dialogRef.close(true); // Fechar modal em caso de sucesso
      },
      error => {
        console.error('Erro ao atualizar o usuário:', error);
        // Tratar erro aqui, se necessário
      }
    );
    window.location.reload();
  }

  cancelar(): void {
    this.dialogRef.close(false); // Fechar modal indicando cancelamento

  }
}
