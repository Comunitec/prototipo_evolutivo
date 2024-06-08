import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacaoParaInativarComponent } from './modal-confirmacao-para-inativar.component';

describe('ModalConfirmacaoParaInativarComponent', () => {
  let component: ModalConfirmacaoParaInativarComponent;
  let fixture: ComponentFixture<ModalConfirmacaoParaInativarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmacaoParaInativarComponent]
    });
    fixture = TestBed.createComponent(ModalConfirmacaoParaInativarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
