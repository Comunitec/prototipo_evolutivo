import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-erro-ao-criar-usuario',
  templateUrl: './modal-erro-ao-criar-usuario.component.html',
  styleUrls: ['./modal-erro-ao-criar-usuario.component.css']
})
export class ModalErroAoCriarUsuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalErroAoCriarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
