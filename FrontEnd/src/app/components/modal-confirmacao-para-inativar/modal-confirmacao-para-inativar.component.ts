import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacao-para-inativar',
  templateUrl: './modal-confirmacao-para-inativar.component.html',
  styleUrls: ['./modal-confirmacao-para-inativar.component.css']
})
export class ModalConfirmacaoParaInativarComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacaoParaInativarComponent>
  ) { }

  closeModal(confirmed: boolean): void {
    this.dialogRef.close(confirmed); // Retorna true ou false ao fechar o modal
  }
}
