import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-recuperar-senha',
  templateUrl: './modal-recuperar-senha.component.html',
  styleUrls: ['./modal-recuperar-senha.component.css']
})
export class ModalRecuperarSenhaComponent {
  constructor(public dialogRef: MatDialogRef<ModalRecuperarSenhaComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
