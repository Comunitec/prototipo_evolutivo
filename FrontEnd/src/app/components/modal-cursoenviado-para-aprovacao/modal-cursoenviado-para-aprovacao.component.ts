import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cursoenviado-para-aprovacao',
  templateUrl: './modal-cursoenviado-para-aprovacao.component.html',
  styleUrls: ['./modal-cursoenviado-para-aprovacao.component.css']
})
export class ModalCursoenviadoParaAprovacaoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalCursoenviadoParaAprovacaoComponent >,
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
