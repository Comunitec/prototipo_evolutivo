import { Component } from '@angular/core';
import {faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-meus-cursos-professor',
  templateUrl: './meus-cursos-professor.component.html',
  styleUrls: ['./meus-cursos-professor.component.css']
})
export class MeusCursosProfessorComponent {
  faChalkboardTeacher = faChalkboardTeacher;

}
