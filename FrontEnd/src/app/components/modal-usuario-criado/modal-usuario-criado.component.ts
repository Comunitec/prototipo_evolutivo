import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-usuario-criado',
  templateUrl: './modal-usuario-criado.component.html',
  styleUrls: ['./modal-usuario-criado.component.css']
})
export class ModalUsuarioCriadoComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalUsuarioCriadoComponent>,
    private router: Router
  ) { }

  closeModal(): void {
    this.dialogRef.close();
    if (this.router.url === '/signup') {
      this.router.navigate(['/login']);
    } else {
      // lógica para fechar o modal de gerenciamento de usuários se necessário
    }
  }
}
