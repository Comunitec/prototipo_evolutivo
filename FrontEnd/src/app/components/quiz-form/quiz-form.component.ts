import { Component } from '@angular/core';
import { Alternativa, Questao } from 'src/app/interfaces/curso';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent {
  questionarios: Questao[][] = [
    this.createEmptyQuestions(4) // Crie quatro questões para cada questionário
  ];
  mostrarQuestionario: boolean = false;
  questoesColetadas: Questao[] = [];

  createEmptyQuestions(numQuestions: number): Questao[] {
    const questions: Questao[] = [];
    for (let i = 0; i < numQuestions; i++) {
      questions.push({ questao: '', descricao:'', respostas: this.createEmptyAlternatives(4) });
    }
    return questions;
  }

  createEmptyAlternatives(numAlternatives: number): Alternativa[] {
    const alternatives: Alternativa[] = [];
    for (let i = 0; i < numAlternatives; i++) {
      alternatives.push({ textoAlternativa: '', correta: false });
    }
    return alternatives;
  }

  setCorrectAnswer(questaoIndex: number, alternativaIndex: number) {
    // this.questionarios[questaoIndex].respostas.forEach((resposta, index) => {
    //   resposta.correta = index === alternativaIndex;
    // });
  }

  // isOtherCorrectSelected(qi: number, ai: number): boolean {
  //   return this.questionarios[qi].respostas.some(
  //     (resposta, index) => index !== ai && resposta.correta
  //   );
  // }

  addQuestoes() {
    this.mostrarQuestionario = true;
  }
  fecharQuestoes() {
    this.mostrarQuestionario = false;
  }

  salvarQuestoes() {
    this.questoesColetadas = [];
    this.questionarios.forEach(questionario => {
      questionario.forEach(questao => {
        this.questoesColetadas.push(questao);
      });
    });
    console.log(this.questoesColetadas);
  }
}
