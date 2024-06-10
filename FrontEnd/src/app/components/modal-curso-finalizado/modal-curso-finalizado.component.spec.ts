import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCursoFinalizadoComponent } from './modal-curso-finalizado.component';

describe('ModalCursoFinalizadoComponent', () => {
  let component: ModalCursoFinalizadoComponent;
  let fixture: ComponentFixture<ModalCursoFinalizadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCursoFinalizadoComponent]
    });
    fixture = TestBed.createComponent(ModalCursoFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
