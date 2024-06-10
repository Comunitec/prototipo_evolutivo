import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-curso-finalizado',
  templateUrl: './modal-curso-finalizado.component.html',
  styleUrls: ['./modal-curso-finalizado.component.css']
})
export class ModalCursoFinalizadoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCursoFinalizadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

}
