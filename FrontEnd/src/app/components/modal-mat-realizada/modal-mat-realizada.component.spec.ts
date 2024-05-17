import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMatRealizadaComponent } from './modal-mat-realizada.component';

describe('ModalMatRealizadaComponent', () => {
  let component: ModalMatRealizadaComponent;
  let fixture: ComponentFixture<ModalMatRealizadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMatRealizadaComponent]
    });
    fixture = TestBed.createComponent(ModalMatRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
