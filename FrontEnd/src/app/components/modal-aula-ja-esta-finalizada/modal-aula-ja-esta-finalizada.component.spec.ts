import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAulaJaEstaFinalizadaComponent } from './modal-aula-ja-esta-finalizada.component';

describe('ModalAulaJaEstaFinalizadaComponent', () => {
  let component: ModalAulaJaEstaFinalizadaComponent;
  let fixture: ComponentFixture<ModalAulaJaEstaFinalizadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAulaJaEstaFinalizadaComponent]
    });
    fixture = TestBed.createComponent(ModalAulaJaEstaFinalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
