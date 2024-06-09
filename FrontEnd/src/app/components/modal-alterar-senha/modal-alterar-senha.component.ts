import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alterar-senha',
  templateUrl: './modal-alterar-senha.component.html',
  styleUrls: ['./modal-alterar-senha.component.css']
})
export class ModalAlterarSenhaComponent {
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';
  senha: string = '';
  senhaVisivel: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModalAlterarSenhaComponent>) { }

  close(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close({ senhaAtual: this.senhaAtual, novaSenha: this.novaSenha });
  }
}
