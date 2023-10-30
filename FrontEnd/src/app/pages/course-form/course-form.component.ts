import { Component } from '@angular/core';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent {
  tagList = ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'];
  selectedTag: string | undefined;
  selectedOptions: string[] = [];

  // lógica para salvar os vídeos na coluna da direita:
  classOpen = false;
  titulo = '';
  descricao = '';
  classList: object[] = [];

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
}
