import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErroAoCriarUsuarioComponent } from './modal-erro-ao-criar-usuario.component';

describe('ModalErroAoCriarUsuarioComponent', () => {
  let component: ModalErroAoCriarUsuarioComponent;
  let fixture: ComponentFixture<ModalErroAoCriarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErroAoCriarUsuarioComponent]
    });
    fixture = TestBed.createComponent(ModalErroAoCriarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
