import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-wquestoes',
  templateUrl: './modal-wquestoes.component.html',
  styleUrls: ['./modal-wquestoes.component.css']
})
export class ModalWQuestoesComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalWQuestoesComponent>,
  ){ }

  closeModal(): void {
    this.dialogRef.close();
  }
}
