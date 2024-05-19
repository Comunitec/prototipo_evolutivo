import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmarAlteracaoComponent } from './modal-confirmar-alteracao.component';

describe('ModalConfirmarAlteracaoComponent', () => {
  let component: ModalConfirmarAlteracaoComponent;
  let fixture: ComponentFixture<ModalConfirmarAlteracaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmarAlteracaoComponent]
    });
    fixture = TestBed.createComponent(ModalConfirmarAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
