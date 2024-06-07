import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-aula-salva',
  templateUrl: './modal-aula-salva.component.html',
  styleUrls: ['./modal-aula-salva.component.css']
})
export class ModalAulaSalvaComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalAulaSalvaComponent >,
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}

