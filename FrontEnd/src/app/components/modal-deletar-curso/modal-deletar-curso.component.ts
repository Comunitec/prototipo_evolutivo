import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-deletar-curso',
  templateUrl: './modal-deletar-curso.component.html',
  styleUrls: ['./modal-deletar-curso.component.css']
})
export class ModalDeletarCursoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDeletarCursoComponent>
  ) { }
  faTriangleExclamation = faTriangleExclamation;

  closeModal(confirmed: boolean): void {
    this.dialogRef.close(confirmed); // Retorna true ou false ao fechar o modal
  }
}
