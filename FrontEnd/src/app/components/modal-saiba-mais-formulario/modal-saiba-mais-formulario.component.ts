import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-saiba-mais-formulario',
  templateUrl: './modal-saiba-mais-formulario.component.html',
  styleUrls: ['./modal-saiba-mais-formulario.component.css'],
})
export class ModalSaibaMaisFormularioComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalSaibaMaisFormularioComponent >,
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
