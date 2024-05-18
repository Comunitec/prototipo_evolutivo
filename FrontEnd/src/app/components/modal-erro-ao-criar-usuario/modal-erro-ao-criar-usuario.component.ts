import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-erro-ao-criar-usuario',
  templateUrl: './modal-erro-ao-criar-usuario.component.html',
  styleUrls: ['./modal-erro-ao-criar-usuario.component.css']
})
export class ModalErroAoCriarUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalErroAoCriarUsuarioComponent >,
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
