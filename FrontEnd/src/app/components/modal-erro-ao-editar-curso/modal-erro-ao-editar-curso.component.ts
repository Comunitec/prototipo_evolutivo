import { Component } from '@angular/core';
import { ModalErroAoCriarUsuarioComponent } from '../modal-erro-ao-criar-usuario/modal-erro-ao-criar-usuario.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-erro-ao-editar-curso',
  templateUrl: './modal-erro-ao-editar-curso.component.html',
  styleUrls: ['./modal-erro-ao-editar-curso.component.css']
})
export class ModalErroAoEditarCursoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalErroAoCriarUsuarioComponent >,
  ) { }

  closeModal(): void {
    this.dialogRef.close();
  }
}
