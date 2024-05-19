import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-salvar-curso',
  templateUrl: './modal-salvar-curso.component.html',
  styleUrls: ['./modal-salvar-curso.component.css'],
})
export class ModalSalvarCursoComponent {
  constructor(public dialogRef: MatDialogRef<ModalSalvarCursoComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
