import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAulaSalvaComponent } from './modal-aula-salva.component';

describe('ModalAulaSalvaComponent', () => {
  let component: ModalAulaSalvaComponent;
  let fixture: ComponentFixture<ModalAulaSalvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAulaSalvaComponent]
    });
    fixture = TestBed.createComponent(ModalAulaSalvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
