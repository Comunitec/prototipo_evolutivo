import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfimarAlteracaoComponent } from 'src/app/components/modal-confimar-alteracao/modal-confimar-alteracao.component';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent {
  senha: string = '';

  constructor(public dialog: MatDialog) {

  }
  enviarRegistro(){
    this.openModal();
  }
  openModal(): void {
    const dialogRef = this.dialog.open(ModalConfimarAlteracaoComponent);

  }
}
