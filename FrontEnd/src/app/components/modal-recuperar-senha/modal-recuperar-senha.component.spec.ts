import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecuperarSenhaComponent } from './modal-recuperar-senha.component';

describe('ModalRecuperarSenhaComponent', () => {
  let component: ModalRecuperarSenhaComponent;
  let fixture: ComponentFixture<ModalRecuperarSenhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalRecuperarSenhaComponent]
    });
    fixture = TestBed.createComponent(ModalRecuperarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
