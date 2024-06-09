import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarUsuarioComponent } from './modal-editar-usuario.component';

describe('ModalEditarUsuarioComponent', () => {
  let component: ModalEditarUsuarioComponent;
  let fixture: ComponentFixture<ModalEditarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditarUsuarioComponent]
    });
    fixture = TestBed.createComponent(ModalEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
