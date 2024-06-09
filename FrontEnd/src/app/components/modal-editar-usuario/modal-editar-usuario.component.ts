import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { faTrash, faCamera, faFloppyDisk, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
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

  usuario: Usuario;

  constructor(
    private dialogRef: MatDialogRef<ModalEditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { usuario: Usuario },
    private dialog: MatDialog
  ) {
    this.usuario = data.usuario; // Recebe os dados do usuário passados para o modal
  }

  ngOnInit() {
    const dataNasc = sessionStorage.getItem('DataNasc');
    if (dataNasc) {
      // Converter a data para o formato ISO 8601 (yyyy-mm-dd)
      this.usuario.DataNasc = new Date(dataNasc).toISOString().substring(0, 10);
    }
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
