import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarCursoComponent } from './modal-deletar-curso.component';

describe('ModalDeletarCursoComponent', () => {
  let component: ModalDeletarCursoComponent;
  let fixture: ComponentFixture<ModalDeletarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeletarCursoComponent]
    });
    fixture = TestBed.createComponent(ModalDeletarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
