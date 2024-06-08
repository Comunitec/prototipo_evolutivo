import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-curso-criado',
  templateUrl: './modal-curso-criado.component.html',
  styleUrls: ['./modal-curso-criado.component.css']
})
export class ModalCursoCriadoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCursoCriadoComponent>,
  ) { }

  closeModal(): void {
    this.dialogRef.close();

  }
}

