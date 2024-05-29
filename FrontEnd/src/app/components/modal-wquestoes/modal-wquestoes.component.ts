import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { faEdit, faTrash, faCamera, faFloppyDisk, faXmark, faKey, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


interface Questao {
  questao: string;
  respostas: Alternativa[];
}

interface Alternativa {
  textoAlternativa: string;
  correta: boolean;
}
@Component({
  selector: 'app-modal-wquestoes',
  templateUrl: './modal-wquestoes.component.html',
  styleUrls: ['./modal-wquestoes.component.css']
})
export class ModalWQuestoesComponent {


  faArrowLeft = faArrowLeft;
  faArrowRight= faArrowRight;

  questionario: Questao[] = [
    {
      questao: 'Qual é a capital da França?',
      respostas: [
        { textoAlternativa: 'Berlim', correta: false },
        { textoAlternativa: 'Paris', correta: true },
        { textoAlternativa: 'Madri', correta: false },
        { textoAlternativa: 'Lisboa', correta: false }
      ]
    },
    {
      questao: 'Qual é o maior planeta do Sistema Solar?',
      respostas: [
        { textoAlternativa: 'Terra', correta: false },
        { textoAlternativa: 'Marte', correta: false },
        { textoAlternativa: 'Júpiter', correta: true },
        { textoAlternativa: 'Vênus', correta: false }
      ]
    },
    {
      questao: 'Quem escreveu "Dom Quixote"?',
      respostas: [
        { textoAlternativa: 'Miguel de Cervantes', correta: true },
        { textoAlternativa: 'William Shakespeare', correta: false },
        { textoAlternativa: 'Dante Alighieri', correta: false },
        { textoAlternativa: 'João Cabral de Melo Neto', correta: false }
      ]
    },
    {
      questao: 'Qual é a fórmula química da água?',
      respostas: [
        { textoAlternativa: 'CO2', correta: false },
        { textoAlternativa: 'H2SO4', correta: false },
        { textoAlternativa: 'H2O', correta: true },
        { textoAlternativa: 'NaCl', correta: false }
      ]
    },
    {
      questao: 'Qual é a maior montanha do mundo?',
      respostas: [
        { textoAlternativa: 'Monte Everest', correta: true },
        { textoAlternativa: 'K2', correta: false },
        { textoAlternativa: 'Kangchenjunga', correta: false },
        { textoAlternativa: 'Lhotse', correta: false }
      ]
    }
  ];


  constructor(public dialogRef: MatDialogRef<ModalWQuestoesComponent>) {}

  finalizarQuestionario() {
    // this.questionario.forEach((q) => {
    //   q.respostas = q.respostas.some(
    //     (resposta) => resposta.textoAlternativa === q.respostaSelecionada && resposta.correta
    //   );
    // });
    // this.dialogRef.close(this.questionario);
  }
  currentQuestionIndex = 0;

  nextQuestion() {
    if (this.currentQuestionIndex < this.questionario.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questionario.length - 1;
  }
}
