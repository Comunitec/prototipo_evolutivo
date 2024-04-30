import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusCursosProfessorComponent } from './meus-cursos-professor.component';

describe('MeusCursosProfessorComponent', () => {
  let component: MeusCursosProfessorComponent;
  let fixture: ComponentFixture<MeusCursosProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeusCursosProfessorComponent]
    });
    fixture = TestBed.createComponent(MeusCursosProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
