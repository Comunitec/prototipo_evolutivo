import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSalvarCursoComponent } from './modal-salvar-curso.component';

describe('ModalSalvarCursoComponent', () => {
  let component: ModalSalvarCursoComponent;
  let fixture: ComponentFixture<ModalSalvarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSalvarCursoComponent]
    });
    fixture = TestBed.createComponent(ModalSalvarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
