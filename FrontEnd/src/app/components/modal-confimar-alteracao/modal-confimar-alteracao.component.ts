import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confimar-alteracao',
  templateUrl: './modal-confimar-alteracao.component.html',
  styleUrls: ['./modal-confimar-alteracao.component.css']
})
export class ModalConfimarAlteracaoComponent {
  constructor(public dialogRef: MatDialogRef<ModalConfimarAlteracaoComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
