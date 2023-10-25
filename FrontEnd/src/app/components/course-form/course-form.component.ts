import { Component } from '@angular/core';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent {
  tagListOpen = false;
  postContent = '';
  tagList = ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'];
  selectedTag: string | undefined;

  openTagSelector() {
    this.tagListOpen = true;
  }

  savePost() {
    // Aqui você pode implementar a lógica para salvar o conteúdo do post, por exemplo, em um serviço ou no banco de dados.
    console.log('Conteúdo salvo:', this.postContent);

    // Feche o editor após salvar.
    this.tagListOpen = false;
    this.postContent = '';
  }
}
