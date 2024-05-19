import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfimarAlteracaoComponent } from './modal-confimar-alteracao.component';

describe('ModalConfimarAlteracaoComponent', () => {
  let component: ModalConfimarAlteracaoComponent;
  let fixture: ComponentFixture<ModalConfimarAlteracaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfimarAlteracaoComponent]
    });
    fixture = TestBed.createComponent(ModalConfimarAlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
