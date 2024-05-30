import { Component } from '@angular/core';
import { Aula } from 'src/app/interfaces/curso';



@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent {
  // Variáveis para gerenciamento das aulas
  tituloAula = '';
  descricaoAula = '';
  linkAula = '';
  classList: Aula[] = [];
  editingIndex: number | null = null;
  curso = {
    aulas: []
  };

  aulas: any[] = [
    { titulo: '', descricao: '', link: '' },
    { titulo: '', descricao: '', link: '' },
    { titulo: '', descricao: '', link: '' },
    { titulo: '', descricao: '', link: '' }
  ];


  // Métodos para gerenciamento das aulas
  resetClassForm() {
    this.tituloAula = '';
    this.descricaoAula = '';
    this.linkAula = '';
  }

  saveClass() {
    // if (this.editingIndex !== null) {
    //   this.curso.aulas[this.editingIndex] = {
    //     tituloAula: this.tituloAula,
    //     descricaoAula: this.descricaoAula,
    //     linkAula: this.linkAula,
    //     questionario: this.questionario.map((q) => ({
    //       questao: q.questao,
    //       respostas: q.respostas.map((a) => ({ ...a })),
    //     })),
    //   };
    //   this.editingIndex = null;
    // } else {
    //   this.curso.aulas.push({
    //     tituloAula: this.tituloAula,
    //     descricaoAula: this.descricaoAula,
    //     linkAula: this.linkAula,
    //     questionario: this.questionario.map((q) => ({
    //       questao: q.questao,
    //       respostas: q.respostas.map((a) => ({ ...a })),
    //     })),
    //   });
    // }

    // console.log(this.curso.aulas);
    // this.resetClassForm();
  }

  mostraDados(aula: Aula, index: number) {
    console.log(
      'Título: ' + aula.tituloAula,
      'Descrição: ' + aula.descricaoAula
    );
    this.tituloAula = aula.tituloAula;
    this.descricaoAula = aula.descricaoAula;
    this.linkAula = aula.linkAula;
    this.editingIndex = index;
  }

  finalizarGerenciamento() {
    console.log('Gerenciamento do curso finalizado:', this.curso);
  }
}
