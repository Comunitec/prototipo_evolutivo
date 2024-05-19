import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelarAlteracaoComponent } from './modal-cancelar-alteracao.component';

describe('ModalCancelarAlteracaoComponent', () => {
  let component: ModalCancelarAlteracaoComponent;
  let fixture: ComponentFixture<ModalCancelarAlteracaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCancelarAlteracaoComponent]
    });
    fixture = TestBed.createComponent(ModalCancelarAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
