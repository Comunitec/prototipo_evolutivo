import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-erro-ao-salvar-aula',
  templateUrl: './modal-erro-ao-salvar-aula.component.html',
  styleUrls: ['./modal-erro-ao-salvar-aula.component.css']
})
export class ModalErroAoSalvarAulaComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalErroAoSalvarAulaComponent >,
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
