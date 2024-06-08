import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErroAoEditarCursoComponent } from './modal-erro-ao-editar-curso.component';

describe('ModalErroAoEditarCursoComponent', () => {
  let component: ModalErroAoEditarCursoComponent;
  let fixture: ComponentFixture<ModalErroAoEditarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErroAoEditarCursoComponent]
    });
    fixture = TestBed.createComponent(ModalErroAoEditarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
