import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-mat-realizada',
  templateUrl: './modal-mat-realizada.component.html',
  styleUrls: ['./modal-mat-realizada.component.css']
})
export class ModalMatRealizadaComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalMatRealizadaComponent>,
  ){ }

  closeModal(): void {
    this.dialogRef.close();
  }

}
