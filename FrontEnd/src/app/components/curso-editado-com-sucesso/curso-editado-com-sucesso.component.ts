import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-curso-editado-com-sucesso',
  templateUrl: './curso-editado-com-sucesso.component.html',
  styleUrls: ['./curso-editado-com-sucesso.component.css']
})
export class CursoEditadoComSucessoComponent {
    constructor(
      public dialogRef: MatDialogRef<CursoEditadoComSucessoComponent >,
    ) { }
  
    closeModal(): void {
      this.dialogRef.close();
    }
}
