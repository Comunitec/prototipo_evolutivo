import { Component } from '@angular/core';

interface Aula {
  titulo: string;
  descricao: string;
}
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent {
  tagList = ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'];
  selectedTag: string | undefined;
  selectedOptions: string[] = [];
  placeholder = 'Selecione até 3 tags';

  // lógica para salvar os vídeos na coluna da direita:
  classOpen = false;
  titulo = '';
  descricao = '';
  classList: Aula[] = [];

  removeTags() {
    this.selectedOptions = [];
  }

  optionSelected() {
    if (this.selectedTag && this.selectedOptions.length < 3) {
      this.selectedOptions.push(this.selectedTag);
      this.selectedTag = undefined;
    }
  }
  saveClass() {
    this.classOpen = true;
    const newClass = {
      titulo: this.titulo,
      descricao: this.descricao,
    };
    this.classList.push(newClass);
    console.log(this.classList);

    // Limpa os campos de entrada após adicionar à lista
    this.titulo = '';
    this.descricao = '';
  }
  mostraDados(aula: Aula) {
    console.log('título:' + aula.titulo, 'descrição:' + aula.descricao);
  }
}
