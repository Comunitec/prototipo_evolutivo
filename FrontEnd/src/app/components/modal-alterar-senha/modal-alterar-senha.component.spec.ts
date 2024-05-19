import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlterarSenhaComponent } from './modal-alterar-senha.component';

describe('ModalAlterarSenhaComponent', () => {
  let component: ModalAlterarSenhaComponent;
  let fixture: ComponentFixture<ModalAlterarSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAlterarSenhaComponent]
    });
    fixture = TestBed.createComponent(ModalAlterarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
