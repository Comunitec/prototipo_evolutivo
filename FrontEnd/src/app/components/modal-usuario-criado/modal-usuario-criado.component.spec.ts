import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioCriadoComponent } from './modal-usuario-criado.component';

describe('ModalUsuarioCriadoComponent', () => {
  let component: ModalUsuarioCriadoComponent;
  let fixture: ComponentFixture<ModalUsuarioCriadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUsuarioCriadoComponent]
    });
    fixture = TestBed.createComponent(ModalUsuarioCriadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
