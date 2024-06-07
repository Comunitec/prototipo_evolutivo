import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCursoenviadoParaAprovacaoComponent } from './modal-cursoenviado-para-aprovacao.component';

describe('ModalCursoenviadoParaAprovacaoComponent', () => {
  let component: ModalCursoenviadoParaAprovacaoComponent;
  let fixture: ComponentFixture<ModalCursoenviadoParaAprovacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCursoenviadoParaAprovacaoComponent]
    });
    fixture = TestBed.createComponent(ModalCursoenviadoParaAprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
