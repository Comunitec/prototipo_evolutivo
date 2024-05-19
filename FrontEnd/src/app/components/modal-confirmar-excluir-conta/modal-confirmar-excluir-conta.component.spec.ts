import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmarExcluirContaComponent } from './modal-confirmar-excluir-conta.component';

describe('ModalConfirmarExcluirContaComponent', () => {
  let component: ModalConfirmarExcluirContaComponent;
  let fixture: ComponentFixture<ModalConfirmarExcluirContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmarExcluirContaComponent]
    });
    fixture = TestBed.createComponent(ModalConfirmarExcluirContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
