import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ModalAulaJaEstaFinalizadaComponent } from '../modal-aula-ja-esta-finalizada/modal-aula-ja-esta-finalizada.component';

@Component({
  selector: 'app-modal-wquestoes',
  templateUrl: './modal-wquestoes.component.html',
  styleUrls: ['./modal-wquestoes.component.css']
})
export class ModalWQuestoesComponent {
  questionarioFinalizado: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { LinkFormulario: string, idAula: number, idCurso: number, idAlunoCurso: number | null, questionarioFinalizado: boolean },
    public dialogRef: MatDialogRef<ModalWQuestoesComponent>,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.questionarioFinalizado = data.questionarioFinalizado;
  }

  finalizarQuestionario() {
    if (this.data.idAlunoCurso === null) {
      console.error('idAlunoCurso is null');
      return;
    }

    const alunocursoaulaData = {
      idAlunocurso: this.data.idAlunoCurso,
      idAula: this.data.idAula,
      status: 'concluido'
    };

    this.http.post('http://localhost:8800/finalizarQuestionario', alunocursoaulaData).subscribe(
      (response) => {
        console.log('Questionário finalizado com sucesso:', response);
        this.questionarioFinalizado = true;
        this.dialogRef.close('concluido');
      },
      (error) => {
        console.error('Erro ao finalizar questionário:', error);
        this.openModalAulaJaFinalizada();
      }
    );
  }

  openModalAulaJaFinalizada(): void {
    const dialogRef = this.dialog.open(ModalAulaJaEstaFinalizadaComponent, {
      width: '350px',
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
