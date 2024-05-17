import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWQuestoesComponent } from './modal-wquestoes.component';

describe('ModalWQuestoesComponent', () => {
  let component: ModalWQuestoesComponent;
  let fixture: ComponentFixture<ModalWQuestoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWQuestoesComponent]
    });
    fixture = TestBed.createComponent(ModalWQuestoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
