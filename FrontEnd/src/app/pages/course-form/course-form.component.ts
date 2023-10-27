import { Component } from '@angular/core';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent {
  tagListOpen = false;
  tagList = ['Angular', 'JavaScript', 'TypeScript', 'HTML', 'CSS'];
  selectedTag: string | undefined;
  selectedOptions: string[] = [];

  openTagSelector() {
    this.tagListOpen = true;
  }
  removeTags() {
    this.selectedOptions = [];
  }

  optionSelected() {
    if (this.selectedTag && this.selectedOptions.length < 3) {
      this.selectedOptions.push(this.selectedTag);
      this.selectedTag = undefined;
    }
  }
}
