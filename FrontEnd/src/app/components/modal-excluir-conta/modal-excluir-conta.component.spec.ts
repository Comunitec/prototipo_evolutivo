import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirContaComponent } from './modal-excluir-conta.component';

describe('ModalExcluirContaComponent', () => {
  let component: ModalExcluirContaComponent;
  let fixture: ComponentFixture<ModalExcluirContaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExcluirContaComponent]
    });
    fixture = TestBed.createComponent(ModalExcluirContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
