import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaibaMaisFormularioComponent } from './modal-saiba-mais-formulario.component';

describe('ModalSaibaMaisFormularioComponent', () => {
  let component: ModalSaibaMaisFormularioComponent;
  let fixture: ComponentFixture<ModalSaibaMaisFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSaibaMaisFormularioComponent]
    });
    fixture = TestBed.createComponent(ModalSaibaMaisFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
