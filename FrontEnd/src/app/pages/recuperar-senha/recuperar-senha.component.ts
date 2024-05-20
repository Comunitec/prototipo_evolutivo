import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalRecuperarSenhaComponent } from 'src/app/components/modal-recuperar-senha/modal-recuperar-senha.component';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {
  email: string = '';

    constructor(public dialog: MatDialog) {

    }
    enviarRegistro(){
      this.openModal();
    }
    openModal(): void {
      const dialogRef = this.dialog.open(ModalRecuperarSenhaComponent);

    }



}
