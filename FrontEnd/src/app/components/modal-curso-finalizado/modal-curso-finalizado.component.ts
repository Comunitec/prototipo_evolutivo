import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-curso-finalizado',
  templateUrl: './modal-curso-finalizado.component.html',
  styleUrls: ['./modal-curso-finalizado.component.css']
})
export class ModalCursoFinalizadoComponent {
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ModalCursoFinalizadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onClose(): void {
    const idCurso = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/finalizarCurso/', idCurso]);
    this.dialogRef.close();
    
  }

}
