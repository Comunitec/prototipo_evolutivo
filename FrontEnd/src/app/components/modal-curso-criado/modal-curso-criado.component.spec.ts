import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCursoCriadoComponent } from './modal-curso-criado.component';

describe('ModalCursoCriadoComponent', () => {
  let component: ModalCursoCriadoComponent;
  let fixture: ComponentFixture<ModalCursoCriadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCursoCriadoComponent]
    });
    fixture = TestBed.createComponent(ModalCursoCriadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
