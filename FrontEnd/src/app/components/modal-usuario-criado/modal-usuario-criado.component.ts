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
    this.router.navigate(['/']);
  }
}
