import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-aula-ja-esta-finalizada',
  templateUrl: './modal-aula-ja-esta-finalizada.component.html',
  styleUrls: ['./modal-aula-ja-esta-finalizada.component.css']
})
export class ModalAulaJaEstaFinalizadaComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalAulaJaEstaFinalizadaComponent >,
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
