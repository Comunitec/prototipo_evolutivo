import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-wquestoes',
  templateUrl: './modal-wquestoes.component.html',
  styleUrls: ['./modal-wquestoes.component.css']
})
export class ModalWQuestoesComponent {
  questionarioFinalizado: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { linkFormulario: string, idAula: number, idCurso: number, idAlunoCurso: number | null, questionarioFinalizado: boolean },
    public dialogRef: MatDialogRef<ModalWQuestoesComponent>,
    private http: HttpClient
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
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }
}
